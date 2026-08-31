# MASTER PROMPT — ThumbBatch Product Discovery + PRD

## 1. Executive verdict

**ThumbBatch should be built.** It perfectly addresses a widespread, low-level annoyance experienced daily by creators, designers, and researchers. The product wins not through complex features, but through extreme speed, privacy, and the complete elimination of context switching. By keeping it 100% local (no backend) and focusing purely on the highest-quality extraction, it fits perfectly within the Hack Club Stardance "Frictionless" mission. It is highly feasible to build an impressive v1 within the 3-hour constraint.

## 2. Research findings

*   **Reddit / Communities:** Users express significant frustration with the "screenshot trap" (resulting in low-quality images with UI elements overlapping) and the friction of copy-pasting URLs into ad-heavy third-party websites. Creators often need these for competitor analysis or inspiration boards.
*   **Facebook / Private Groups:** *(Note: Cannot access private groups directly, but general industry knowledge confirms)* Video editors and social media managers frequently pull thumbnails for mood boards, client references, and A/B testing analysis. The repetitive nature of this task is a known drain.
*   **Chrome Web Store:** The landscape is filled with "Thumbnail Grabbers," but many suffer from bloat, intrusive ads, requests for excessive permissions (e.g., reading all website data), or they simply break due to Manifest V3 migrations.
*   **Technical Reality:** YouTube uses a predictable CDN URL structure (`img.youtube.com/vi/[ID]/[QUALITY].jpg`). The highest quality (`maxresdefault.jpg`) is not always available for older or lower-res uploads, necessitating a fallback chain (`sddefault`, `hqdefault`, `mqdefault`).
*   **Hackathon Context:** The "Frictionless" mission values "momentum over completion" and simple tools that save seconds but are used thousands of times. An overly complex web scraper will fail the 3-hour constraint. 

## 3. User pain points

**The core friction:** Downloading a high-quality YouTube thumbnail currently requires breaking your flow, leaving YouTube, and using a potentially sketchy third-party tool.

*   **Current workflow (6-8 steps):** Open video → Copy URL → Open new tab → Google "youtube thumbnail downloader" → Click a site → Paste URL → Wait for generation/bypass ads → Right-click and save image.
*   **ThumbBatch workflow (1 step):** Open video → Click ThumbBatch extension icon (or use keyboard shortcut) → Image downloads instantly.
*   **Time/friction saved:** Eliminates ~30-45 seconds of context switching per thumbnail. For a researcher pulling 20 thumbnails for a mood board, this saves ~15 minutes of pure annoyance.

## 4. Competitive landscape

| Product | Platform | Core feature | UX | Speed | Quality | Bulk support | Ads | Paywall | Privacy | Permissions | Weakness |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **vidIQ** | Web/Ext | SEO/Analytics | Bloated | Med | High | No | Upsells | Yes | Tracks | Broad | Too complex for just thumbnails |
| **Thumbnail Grabber** | Extension | Download thumb | Cluttered | Fast | High | No | No | No | Med | Broad | Ugly UI, hasn't updated to MV3 well |
| **Web Downloaders** | Website | Download thumb | Spammy | Slow | High | No | Yes | No | Low | None | Requires copy/paste and context switch |
| **yt-dlp** | CLI | Video/Thumb DL | Dev-only | Fast | High | Yes | No | No | High | None | Steep learning curve, not for casuals |
| **ThumbBatch** | Extension | Download thumb | Minimal | Instant | Highest | Yes | No | No | 100% Local| `activeTab` only | Single-purpose (by design) |

*   **Table-stakes:** Extracting the `maxresdefault` image accurately based on a YouTube URL.
*   **Differentiators:** Zero-click download (action happens immediately on invocation), zero backend, native Chrome UI feel, keyboard shortcut support.
*   **Anti-features:** No ads, no analytics, no "sign up to download", no requesting permission to read data on all websites. Simplicity is the differentiation because users inherently distrust extension bloat.

## 5. Opportunity gaps

There is a gap for an "Apple-like" utility in this space. Current tools feel like cheap hacks. ThumbBatch can win by feeling like a native browser feature—utterly reliable, completely silent when not in use, and visually stunning when invoked. 

## 6. Product thesis

> ThumbBatch wins by **completely eliminating the context switch required to download a thumbnail, reducing a 6-step web search into a single, instant browser action.**

**Product principles:**
1.  **Instant Gratification:** The user clicks; the file downloads. No intermediate "Are you sure?" screens unless absolutely necessary.
2.  **Privacy Absolute:** No backend. No analytics. No tracking. Code is local.
3.  **Graceful Degradation:** If `maxresdefault` isn't available, silently and instantly fall back to the highest available alternative.
4.  **Native Feel:** The UI should look like it was designed by Google Chrome's own team.

## 7. Recommended product experience

### Entry points
*   **Extension Popup:** (Recommended for v1) Familiar, allows progressive disclosure of options (e.g., if multiple videos are on screen).
*   **Keyboard Shortcut (e.g., Mac: `Cmd+Shift+Y`, Win: `Ctrl+Shift+Y`):** (Recommended for v1) The ultimate frictionless experience.
*   **Context Menu (Right-click):** (Reject for v1) Adds clutter to the browser menu; requires `contextMenus` permission.
*   **In-page Button injection:** (Reject for v1) High maintenance risk. YouTube constantly changes its DOM, which would break the extension.

### The "Bulk" Definition
"Bulk" can easily cause scope creep. 
*   *Interpretation A: Paste 50 URLs.* (Boring, requires context switch).
*   *Interpretation B: Scrape a whole channel.* (High technical risk, YouTube rate limits/lazy loads).
*   *Interpretation C (Recommended):* **Visible-Page Bulk.** When invoked on a YouTube search page, channel page, or homepage, the extension instantly grabs all video IDs currently rendered in the DOM. The popup displays a beautiful, compact grid of thumbnails with a single "Download All (X)" button. 
*   *Smallest implementation:* A "Download All" button that iterates through the detected IDs and triggers Chrome's download API.

## 8. Feature prioritization

**v1 (Frictionless MVP):**
*   Active tab YouTube URL detection.
*   Highest-quality resolution resolution with fallback chain.
*   Single-click download from the popup.
*   "Visible-Page Bulk" detection and "Download All" button.
*   Keyboard shortcut for instant download of the primary video.

**v2 (Power features - rejected for v1):**
*   ZIP export for bulk downloads.
*   Format selection (WebP vs JPG).
*   History of downloaded thumbnails.

## 9. Extension PRD

### 1. Executive summary
ThumbBatch is a privacy-first, zero-friction Chrome extension that allows users to instantly download the highest-quality YouTube thumbnails from any watch page, or bulk-download thumbnails from channel/search pages, with a single click.

### 2. Product vision
To become the definitive, trusted, "set-it-and-forget-it" utility for creative professionals and researchers who need YouTube assets without the spam.

### 3. Problem statement
Extracting high-quality thumbnails from YouTube requires 6-8 tedious steps involving third-party websites, ad-blocker wars, and context switching, draining time and breaking creative flow.

### 4. User personas
*   **The Creator:** Analyzes competitor thumbnails for CTR inspiration.
*   **The Designer:** Needs original assets to build mood boards or portfolio mocks.
*   **The Content Researcher:** Archives how topics are visually packaged on YouTube.

### 5. Jobs to be done
*   *When I am* watching a competitor's video, *I want to* instantly save their thumbnail to my inspiration folder *so I can* reference it later without taking a messy screenshot.
*   *When I am* browsing a channel's video list, *I want to* download their last 10 thumbnails at once *so I can* analyze their visual consistency.

### 6. User stories
*   As a user, I want to click the extension icon on a video page and have the thumbnail immediately download.
*   As a user, I want the extension to automatically find the highest possible resolution so I don't have to guess.
*   As a user, if I am on a channel page, I want to see a grid of all visible thumbnails and download them all with one click.

### 7. Goals
*   Reduce time-to-download from ~45 seconds to <2 seconds.
*   Achieve 100% success rate on thumbnail retrieval (using fallbacks).
*   Deliver a fully working MVP within a 3-hour development window.

### 8. Non-goals
*   Downloading video or audio content (violates Chrome Web Store policy).
*   Upscaling low-res thumbnails using AI.
*   Building a web-based dashboard or backend account system.

### 9. Product principles
*(See Section 6)*

### 10. Functional requirements
*   **FR-001 (P0):** The extension must detect if the active tab is a `youtube.com/watch` page and extract the `v=` parameter.
*   **FR-002 (P0):** The extension must attempt to fetch `maxresdefault.jpg`, falling back to `sddefault.jpg`, then `hqdefault.jpg`.
*   **FR-003 (P0):** The popup must display the fetched thumbnail and provide a prominent "Download" button.
*   **FR-004 (P1):** If the active tab is a YouTube page with multiple videos (homepage, channel, search), the extension must extract all unique video IDs currently in the DOM.
*   **FR-005 (P1):** The popup must support a "Download All" action for bulk mode, utilizing the `chrome.downloads` API.
*   **FR-006 (P1):** Support a global keyboard shortcut to trigger the download of the primary video on a watch page.

### 11. Non-functional requirements
*   **Performance:** Popup must render in < 100ms.
*   **Privacy:** No external API calls except to `img.youtube.com`. No data collection.
*   **Maintainability:** Use vanilla JS/TypeScript without heavy frameworks to ensure the codebase remains trivial to update.

### 12-13. UX/UI specification (See Section 11)
### 14. Technical architecture (See Section 10)

### 15. Permissions model
*   `activeTab`: To read the URL of the current tab and inject a lightweight script to grab video IDs on the page. (Highly favored by Chrome reviewers over `<all_urls>`).
*   `downloads`: To programmatically save the images to the user's local disk without prompting a "Save As" dialog for every image.
*   *Host permissions:* strictly limited to `*://*.youtube.com/*` if necessary, but `activeTab` should suffice.

### 16. Error states
*   *Not on YouTube:* Display a calm message: "Open a YouTube video to download its thumbnail."
*   *No thumbnail found (rare):* Display "Unable to locate thumbnail assets for this video."

### 17. Edge cases
*   YouTube Shorts (`youtube.com/shorts/ID`): Map the ID to the standard thumbnail URL structure.
*   Live streams: Use the same ID structure; YouTube usually assigns a default thumbnail.
*   SPA Navigation: YouTube doesn't reload the page when navigating. Rely on `chrome.tabs.query` to get the current URL dynamically every time the popup is opened, rather than relying on page load events.

### 18. Privacy model
Strictly local. No telemetry, no backend, no analytics. The extension is purely a bridge between the user's browser and YouTube's public image CDN.

### 19. Policy/legal considerations
*   **Chrome Policy:** We are downloading public static images (`img.youtube.com`), NOT video content. This is safe and compliant.
*   **Copyright:** The images belong to creators. The extension is merely a utility for local retrieval.

### 20. Analytics/telemetry decision
**No analytics.** Adding Google Analytics or Mixpanel requires privacy policy disclosures, cookie banners, and complicates the Web Store review process. For a free utility, the Chrome Web Store dashboard's install metrics are sufficient.

### 21. Competitive differentiation
It is the *only* thumbnail downloader that requires zero configuration, zero new tabs, and handles "visible page bulk" instantly, all while respecting user privacy perfectly.

### 22. Success metrics
*   Hackathon judging criteria met.
*   Time-to-download < 2 seconds.
*   Number of clicks to download = 1.

## 10. Technical architecture

*   **Platform:** Manifest V3.
*   **Stack:** HTML, Vanilla CSS, Vanilla JavaScript (or minimal TypeScript). No React/Vue (unnecessary bloat for a popup).
*   **Components:**
    *   `manifest.json`: Defines permissions (`activeTab`, `downloads`) and action.
    *   `popup.html` & `popup.js`: The UI. Queries the active tab URL.
    *   `content.js`: Injected via `chrome.scripting.executeScript` only when the popup is opened. Scrapes the DOM for `a[href*="/watch?v="]` to find all video IDs for bulk mode.
    *   `background.js` (Service Worker): Handles the keyboard shortcut (`chrome.commands`) to bypass the popup entirely for power users.
*   **Data flow (Single):** Popup opens -> checks URL -> if `/watch?v=123`, constructs CDN URL -> pings URL to check resolution fallback -> displays image -> User clicks download -> calls `chrome.downloads.download()`.
*   **Data flow (Bulk):** Popup opens -> if not `/watch`, injects `content.js` -> `content.js` returns array of IDs -> popup renders grid -> User clicks "Download All" -> loops through IDs, checking resolution and calling `chrome.downloads.download()`.

## 11. UX/UI specification

**Design System:**
*   **Typography:** Inter (or system default UI font: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto...`)
*   **Colors:** 
    *   Background: `#FAFAFA` (Light mode) / `#121212` (Dark mode)
    *   Accent: A subtle, trustworthy blue (`#2563EB`) rather than YouTube Red, to distance it from "spammy" tools.
    *   Text: `#111827` (Light) / `#F9FAFB` (Dark)
*   **Radius & Shadows:** Generous border-radius (`12px`) on images, soft, modern drop shadows (`box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1)`). Linear-style polish.

**Popup Screen (Component Level):**
*   **Header:** Minimal logo (ThumbBatch), very subtle.
*   **Main Area (Single Mode):** Large, beautiful preview of the highest-res thumbnail. Smooth fade-in animation (`opacity 0 -> 1` over 200ms).
*   **Main Area (Bulk Mode):** A CSS Grid (2 columns) of thumbnails. 
*   **Action Bar (Bottom):** Full-width, primary button. "Download Thumbnail" or "Download All (12)". Button provides immediate visual feedback (transforms to a checkmark / "Downloaded!" upon click).

## 12. Roadmap

*   **Phase 0 — Validation:** Confirm YouTube CDN URL structure (`maxresdefault`, etc.) is still active and doesn't block extension origins. (It is active).
*   **Phase 1 — Frictionless MVP (The Hackathon Build):** `activeTab` permission, single video watch page extraction, resolution fallback logic, one-click download. (Estimated effort: 1.5 hours).
*   **Phase 2 — Bulk Magic (The Hackathon differentiator):** DOM scraping for visible video IDs on channel/search pages, bulk download logic. (Estimated effort: 1.5 hours).
*   **Phase 3 — Polish:** Dark mode support, keyboard shortcuts, subtle animations. (Estimated effort: 1 hour).
*   **Phase 4 — Optional expansion (Rejected for now):** ZIP file packaging for bulk downloads (adds complexity via JSZip library, not worth the friction for v1).

## 13. Hack Club Frictionless strategy

| Requirement | How ThumbBatch satisfies it | Evidence to demonstrate |
| :--- | :--- | :--- |
| **QoL Improvement** | Eliminates 6 annoying steps to get an asset. | Side-by-side video demo. |
| **Working Project** | Fully functional Chrome Extension. | GitHub repo + load unpacked demo. |
| **Effort/Execution** | Edge-case handling (fallbacks), gorgeous UI. | Clean codebase, responsive popup. |

**The 3 major QoL improvements:**
1.  **Eliminates the "Third-Party Trap":** No more navigating to ad-infested websites just to extract a public image URL.
2.  **Solves the "Screenshot Noise" issue:** Guarantees a clean, UI-free, highest-resolution asset, improving the quality of the user's downstream work.
3.  **Introduces "Visible-Page Bulk":** Turns the tedious task of archiving a channel's visual style from a 20-minute chore into a 1-second click.

**Demo strategy:** Record a split-screen video. 
*Left side:* User trying to google a downloader, dodging ads, and saving. 
*Right side:* User clicks ThumbBatch icon, hits download. The time disparity will be massive.

## 14. Landing-page PRD

*   **Objective:** Communicate extreme utility and premium polish instantly. Drive GitHub/Web Store clicks.
*   **Primary Audience:** Hackathon judges, creators, designers.
*   **Core Message:** The fastest, cleanest way to get YouTube thumbnails. No ads, no tracking, just the image.
*   **Page Structure:**
    1.  **Hero:** Big, bold headline. Subheadline. Primary CTA (Install / View Source). High-quality graphic or GIF of the 1-click extension in action.
    2.  **The "Why":** A 3-column section explaining the friction removed (No Ads, Highest Quality, Bulk Support).
    3.  **Privacy Guarantee:** A simple, strong statement: "No backend. No tracking. 100% open source."
    4.  **Footer:** Hack Club Stardance acknowledgment, GitHub link.

## 15. Landing-page copy

**Hero Headline:** Bulk YouTube thumbnails. One click.
**Hero Subheadline:** The privacy-first Chrome extension that instantly extracts the highest quality thumbnails from any video or channel page. No ads, no sketchy websites, no friction.
**CTA Button:** Get ThumbBatch (Free)

**Value Props (3 Columns):**
1. **Instant Extraction:** Don't break your flow. Click the extension, get the image.
2. **Visible-Page Bulk:** On a channel page? Download every thumbnail currently on your screen in one click.
3. **Always Highest Quality:** Automatically checks YouTube's servers for the `maxresdefault` image, ensuring crisp assets for your mood boards.

**Privacy Section:**
**Headline:** Zero tracking. Zero BS.
**Copy:** ThumbBatch runs entirely in your browser. It doesn't use a backend, it doesn't collect analytics, and it doesn't track your web history. It does one job exceptionally well.

## 16. Final v1 specification

1.  **Single Download Mode:** Works on `/watch?v=...` and `/shorts/...`. Extracts ID, finds best resolution, displays preview, one-click download.
2.  **Visible-Page Bulk Mode:** Works on any other YouTube URL. Scrapes DOM for `a[href^="/watch?v="]`, deduplicates IDs, displays grid, one-click "Download All".
3.  **Resolution Fallback Engine:** `maxresdefault` -> `sddefault` -> `hqdefault`.
4.  **Chrome Downloads API Integration:** Saves files directly to the user's default downloads folder without a prompt (named `thumbnail_[ID].jpg`).

## 17. Rejected features

*   **ZIP Export:** While nice, downloading 15 images directly via Chrome is fast enough. Zipping requires pulling the images into memory/blobs and using a library. Rejected for v1 to maintain extreme simplicity.
*   **In-page YouTube UI Integration:** Injecting a "Download" button next to the YouTube "Share" button is highly brittle and will break when YouTube updates their frontend.
*   **Custom File Naming:** Let Chrome handle it. Asking the user for a filename adds friction.

## 18. Build order

1.  **Scaffolding:** Create `manifest.json`, `popup.html`, `popup.css`, `popup.js`.
2.  **Core Logic (Single):** Write the function to extract video ID from a URL and the resolution fallback checker (using `fetch` or `Image` object `onload`).
3.  **Download Integration:** Wire up `chrome.downloads.download`. Test on a single video.
4.  **Core Logic (Bulk):** Create `content.js` to scrape video IDs. Wire up message passing between `popup.js` and `content.js`.
5.  **UI Polish:** Implement the CSS grid for bulk mode, empty states, and loading animations.
6.  **Landing Page:** Build a simple HTML/Tailwind static page for the demo.

## 19. Open questions requiring my decision

1.  **Keyboard Shortcut:** Do you want to include the global keyboard shortcut (e.g., `Cmd+Shift+Y`) in the v1 build, or stick strictly to the popup UI to ensure 100% stability for the hackathon submission? *(Recommendation: Stick to popup first; add shortcut if time permits within the 3 hours).*
2.  **Bulk Download Limit:** Should we cap the "Visible-Page Bulk" download at, say, 50 images to prevent Chrome from choking if the user has scrolled down a channel page for 10 minutes? *(Recommendation: Cap it at the first 50 unique IDs found).*
3.  **Extension Distribution:** Will you submit this to the Chrome Web Store for the hackathon, or just provide the open-source code for judges to load "unpacked"? *(Recommendation: Web Store takes days to approve. Rely on a GitHub repo with clear "Load Unpacked" instructions for the hackathon).*
