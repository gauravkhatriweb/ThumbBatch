# THUMBBATCH — TECHNICAL ARCHITECTURE & IMPLEMENTATION SPECIFICATION

## FIRST: CHALLENGING THE ARCHITECTURE (THE SKEPTIC'S REVIEW)

Before building, we must validate the core technical assumptions. Here are the true realities of the Chrome API and YouTube's frontend:

1.  **The `maxresdefault` Trap:** YouTube's image CDN (`img.youtube.com`) does not always return a 404 when a `maxresdefault` image is missing. Sometimes it returns a 200 OK with a 120x90 grey "camera" placeholder image. Blindly trusting HTTP status codes will result in users downloading useless grey squares. *Validation: We must inspect the `naturalWidth` or `Blob` size of the resolved image.*
2.  **The SPA Navigation Myth:** YouTube is a Single Page Application (SPA) using a custom framework. The page does *not* reload when navigating from home to a video. If we use standard persistent content scripts listening to `window.onload`, they will break. *Validation: We must rely on `activeTab` to query the DOM exactly at the moment the user clicks the extension, ignoring page load lifecycles entirely.*
3.  **The CORS Blockade:** Fetching images via `fetch()` to generate a ZIP file requires reading the Blob. If we don't have host permissions for the image CDN, Chrome will block the read due to CORS. *Validation: We MUST request host permissions for `*://i.ytimg.com/*` and `*://img.youtube.com/*` in the manifest.*
4.  **The Bulk Download Spam Warning:** Calling `chrome.downloads.download` 50 times in a loop will trigger Chrome's severe anti-abuse prompt ("This site is attempting to download multiple files"). *Validation: Zipping is NOT optional for bulk downloads; it is a hard technical requirement to prevent extension suspension and terrible UX.*
5.  **Service Worker Lifecycles:** MV3 Background Service Workers are ephemeral. They die if idle, and zipping 50 images might be killed if it takes too long or uses too much memory. *Validation: For a 3-hour hackathon, do the fetching and zipping inside the `popup.js` (which has a DOM and stays alive while open) or an Offscreen Document. We will use the popup for MVP.*
6.  **DOM Scraping Brittleness:** YouTube's class names (`.ytd-rich-grid-media`) change frequently. *Validation: We must scrape based on stable attributes, specifically `a[href*="/watch?v="]` and `a[href*="/shorts/"]`, filtering out hidden sidebars.*

---

## 1. System architecture

*   **`manifest.json` (Manifest V3):** The configuration root. Strongly locks down permissions.
*   **`background.js` (Service Worker):** Listens for the `Cmd+Shift+C` global keyboard shortcut. If triggered, it executes the extraction script and copies to clipboard without opening the popup.
*   **`popup.html` & `popup.js`:** The primary engine. It queries the active tab. If on a watch page, it renders the single UI. If on a channel/search page, it injects the extraction script, collects the IDs, renders the grid, and handles the ZIP generation in-memory.
*   **`extractor.js` (Injected Content Script):** A pure, stateless function. Injected via `chrome.scripting.executeScript`. It reads the DOM, builds a `Set` of video IDs, and returns them to the popup. It leaves no footprint.
*   **`fflate.min.js`:** A wildly fast, zero-dependency ZIP library for bundling bulk downloads locally.

## 2. Manifest V3 configuration

```json
{
  "manifest_version": 3,
  "name": "ThumbBatch",
  "version": "1.0.0",
  "action": {
    "default_popup": "popup.html"
  },
  "permissions": [
    "activeTab",
    "scripting",
    "downloads"
  ],
  "host_permissions": [
    "*://i.ytimg.com/*",
    "*://img.youtube.com/*"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "commands": {
    "copy_thumbnail": {
      "suggested_key": { "default": "Ctrl+Shift+C", "mac": "Command+Shift+C" },
      "description": "Copy highest quality thumbnail to clipboard"
    }
  }
}
```

**Permission Justification:**
*   `activeTab`: Grants temporary access to the current tab URL and DOM *only* when the user interacts. Zero privacy warnings.
*   `scripting`: Required to inject `extractor.js` into the `activeTab`.
*   `downloads`: To trigger the ZIP save silently.
*   `host_permissions`: Required for CORS bypass when using `fetch()` on YouTube's image CDNs to read Blobs for clipboard/zipping.

## 3. Repository structure

```text
/ThumbBatch
├── manifest.json
├── background.js
├── popup.html
├── popup.js
├── popup.css
├── extractor.js
├── fflate.min.js
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## 4. Video ID extraction strategy

We need a bulletproof Regex that can be applied to URLs (for single mode) and `href` attributes (for bulk mode).

**The Master Regex:**
`/(?:v=|shorts\/|live\/|youtu\.be\/)([\w-]{11})/i`
*YouTube IDs are strictly 11 characters (A-Z, a-z, 0-9, -, _).*

**Single Mode Strategy:**
Run Regex against `window.location.href`.

**Bulk Mode Strategy (`extractor.js`):**
```javascript
function extractVisibleThumbnails() {
  const ids = new Set();
  // Target thumbnails inside the main content area, avoiding the sidebar/miniplayer
  const links = document.querySelectorAll('#content a#thumbnail, ytd-rich-grid-row a#thumbnail');
  
  links.forEach(link => {
    // Only grab visible elements (width > 0)
    if (link.offsetParent !== null) {
      const match = link.href.match(/(?:v=|shorts\/)([\w-]{11})/i);
      if (match) ids.add(match[1]);
    }
  });
  
  // Return semantic data for filenames
  const pageTitle = document.title.replace(/ - YouTube$/, '');
  return { ids: Array.from(ids), pageTitle };
}
```

## 5. Thumbnail resolution engine

Do not use simple HTTP checks. Use `Image` loading to detect the grey 120x90 placeholder.

```javascript
async function getHighestQualityThumbnail(videoId) {
  const qualities = ['maxresdefault', 'sddefault', 'hqdefault'];
  const baseUrl = `https://i.ytimg.com/vi/${videoId}`;

  for (const quality of qualities) {
    const url = `${baseUrl}/${quality}.jpg`;
    const isValid = await verifyImage(url);
    if (isValid) return url;
  }
  return `${baseUrl}/hqdefault.jpg`; // Absolute fallback
}

function verifyImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      // YouTube's grey placeholder is exactly 120x90
      if (img.naturalWidth === 120 && img.naturalHeight === 90) {
        resolve(false);
      } else {
        resolve(true);
      }
    };
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
```

## 6. Bulk extraction & ZIP handling

For 50 IDs, sequentially resolving `maxresdefault` would take 10 seconds.
**Solution:** Render the grid instantly using `hqdefault.jpg` (which is virtually guaranteed to exist and load instantly). Only run the `getHighestQualityThumbnail` resolver concurrently when the user clicks "Download ZIP".

```javascript
// Pseudo-code for Zip engine
async function zipThumbnails(ids, pageTitle) {
  const zip = new fflate.Zip();
  
  // Process in chunks of 5 to avoid network congestion
  for (let i = 0; i < ids.length; i += 5) {
    const chunk = ids.slice(i, i + 5);
    await Promise.all(chunk.map(async (id) => {
      const bestUrl = await getHighestQualityThumbnail(id);
      const res = await fetch(bestUrl);
      const buffer = new Uint8Array(await res.arrayBuffer());
      // Clean filename
      zip.add(new fflate.ZipDeflate(`thumb_${id}.jpg`)).push(buffer, true);
    }));
  }
  
  // Export and download
  const blob = new Blob([zip.export()], { type: 'application/zip' });
  const url = URL.createObjectURL(blob);
  chrome.downloads.download({ url, filename: `${pageTitle.replace(/[^a-z0-9]/gi, '_')}_Thumbnails.zip` });
}
```

## 7. Error architecture

Standardized UI feedback states mapped to functions:
*   `state_NO_VIDEO`: SVG icon, "No YouTube video detected."
*   `state_RESOLVING`: Skeleton loader active.
*   `state_ZIPPING(progress)`: Progress bar updates (e.g., "12 / 40").
*   `state_NETWORK_ERR`: "Failed to reach YouTube servers. Check connection."

## 8. Security & Privacy Threat Model

*   **XSS Risk:** Moderate. If we inject `pageTitle` or video titles into the DOM without sanitization, malicious video titles could execute code.
*   **Mitigation:** Use `textContent` for DOM updates, NEVER `innerHTML`.
*   **Data Leakage:** Zero. No external network requests except to `i.ytimg.com`.
*   **Permissions:** `activeTab` ensures the extension is completely dormant and cannot read user data on unrelated sites.

## 9. Chrome Web Store Readiness

The extension will easily pass the automated review because:
1. No remote code execution.
2. Narrow, justified permissions (`activeTab`).
3. Does not download YouTube *video* (which violates TOS), only public CDN *images*.

## 10. Hackathon implementation plan

### P0 (The absolute core - 1.5 hours)
1. Setup `manifest.json`.
2. Build single-video popup UI (HTML/CSS).
3. Implement `getHighestQualityThumbnail` with the 120x90 grey image check.
4. Implement single download via `chrome.downloads`.

### P1 (The differentiator - 1 hour)
5. Include `fflate.js`.
6. Implement `extractor.js` to grab visible IDs.
7. Build the Bulk grid UI in popup.
8. Wire up the ZIP generation and download logic.

### P2 (The "Wow" factors - 30 mins)
9. Implement the global keyboard shortcut (`background.js`) to copy to clipboard (requires `Offscreen Document` or injecting a script to use `navigator.clipboard.write`).
10. Auto-crop black bars via `<canvas>` (Skip for hackathon if running out of time, stick to ZIP + Clipboard).

## FINAL OUTPUT RECOMMENDATIONS

*   **Exact MVP scope:** Single watch page popup download + Channel page Bulk Grid ZIP download.
*   **Technical risks:** CORS blocking `fetch()` on `img.youtube.com`.
*   **Mitigations:** Ensure `host_permissions` are correctly defined in `manifest.json`.
*   **Do NOT build this yet:** Auto-cropping letterboxes, user settings, history logs, changing image formats (WebP vs JPG). Stick strictly to extracting what the CDN gives you.
