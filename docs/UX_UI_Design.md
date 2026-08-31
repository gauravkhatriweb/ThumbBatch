# THUMBBATCH — ELITE UX/UI DESIGNER

## 1. Information architecture

The UI hierarchy is flat. There are no settings pages, no navigation tabs, and no sub-menus. The context (the active URL) determines the interface shown.

**Context A: Single Video (`/watch`)**
- Extension invoked -> Highly focused, modal-like popup.
- Popup Header: Logo (minimal).
- Image Preview: 16:9 container, border-radius.
- Image Metadata: Resolution pill (e.g., "1920x1080 • maxresdefault").
- Actions: "Download Image" (Primary), "Copy Image" (Secondary icon).

**Context B: Bulk Page (Channel, Search, Home)**
- Popup Header: Title ("Found 24 Thumbnails").
- Grid Area: 2-column or 3-column masonry/grid of detected thumbnails.
- Footer Actions: "Download All as ZIP" (Primary), "Copy All" (Secondary).

**Context C: Empty State**
- Icon + "Open a YouTube video or channel to grab thumbnails."

## 2. Single-video experience

When on a `/watch?v=` page, clicking the extension opens a highly focused, modal-like popup.

*   **Header:** Barely there. Just a muted, minimalist "ThumbBatch" logomark in the top-left (14px font size, semi-bold, neutral gray).
*   **Thumbnail:** The hero. A 16:9 aspect ratio image taking up the full width (minus padding). Soft 8px border radius. Subtly drops a shadow.
*   **Resolution indicator:** A floating pill badge overlaid on the bottom-right of the image (e.g., `1080p HQ` or `4K Max`). Semi-transparent black background, white text, blur backdrop.
*   **Primary CTA:** A full-width, solid button below the image. Text: "Download". 
*   **Secondary actions:** A smaller icon button next to the primary CTA: "Copy to Clipboard" (clipboard icon).
*   **Status/Loading state:** If the `maxresdefault` fallback is being calculated, the image area shows a skeleton loader (shimmering gradient). The CTA is disabled and says "Resolving...".
*   **Errors:** If no video ID is found, replace the image with a subtle illustration (or just text) saying "No video found on this page."

## 3. Bulk experience

When on `/results`, `/user/`, `/c/`, or `/`:

*   **Detection:** Background script injects a lightweight content script that runs `document.querySelectorAll('ytd-rich-grid-row a#thumbnail, ytd-video-renderer a#thumbnail')` immediately. Extracts IDs, deduplicates.
*   **Header:** "Found 34 Thumbnails" (Dynamic count).
*   **Grid layout:** 2 columns. 8px gap. Images are 16:9 with 4px border radius. 
*   **Selection behavior:** By default, all are selected. Hovering over a thumbnail shows a tiny checkmark circle to deselect if desired. (Keep it simple: click to toggle selection state). Unselected thumbnails fade to 40% opacity.
*   **Download-all behavior:** Floating, sticky footer at the bottom. A single large button: "Download 34 as ZIP". 
*   **Progress:** Upon clicking, the button text changes to "Zipping... 12/34", with the button background doubling as a progress bar filling from left to right.
*   **Success state:** Button turns green: "Downloaded!" followed by a 1.5s delay before closing the popup automatically.
*   **Duplicate handling:** Silently ignored. The array of IDs is reduced to a `Set` before rendering.

## 4. Empty states

*   **Not on YouTube:**
    *   **Visual:** A simple SVG line-art icon of a broken link or a crossed-out YouTube icon.
    *   **Text:** "Not a YouTube page."
    *   **Subtext:** "Navigate to a video or channel to extract thumbnails."
*   **On YouTube but no videos (e.g., About page):**
    *   **Text:** "No thumbnails found."
    *   **Subtext:** "Try opening a video or scrolling down to load content."

## 5. Error states

*   **Network Error / Rate Limit:** "YouTube is rate-limiting requests. Try again in a minute." (Avoid saying "HTTP 429").
*   **Private Video / No Thumbnail:** "Thumbnail is private or unavailable."
*   **Clipboard Denied (if Copy fails):** "Please allow clipboard permissions in Chrome."

## 6. Micro-interactions

*   **Hover:** 
    *   Buttons: Background color slightly darkens. Cursor becomes pointer. Transform `scale(1.02)` for 100ms.
    *   Thumbnails in grid: Subtle overlay (darkens 10%) with a checkmark icon indicating selectability.
*   **Press:** Buttons shrink `scale(0.97)` on `:active`.
*   **Loading:** Skeleton loader uses a subtle shimmer (Linear-style). No spinning wheels.
*   **Download:** When clicking download, the button text pushes down and "Downloaded!" pushes up (a smooth Y-axis translation mask). 
*   **Transitions:** The popup should ideally not jump in height. Fade content in over 150ms.

## 7. Keyboard accessibility

*   Opening the popup immediately focuses the Primary CTA button.
*   Pressing `Enter` triggers the primary action (Download).
*   Pressing `Cmd+C` / `Ctrl+C` while the popup is open triggers the "Copy to Clipboard" action.
*   `Tab` cycles through: [Primary Button] -> [Copy Button] -> [Thumbnail grid items (Bulk mode)].
*   `Space` toggles selection on a focused thumbnail in the grid.

## 8. Dark mode

*   Do not just invert. 
*   Background: `#121212` (Not pure black).
*   Surface (cards/inputs): `#1E1E1E`.
*   Borders: `#2C2C2C` (Subtle 1px solid to define edges without shadows).
*   Text (Primary): `#F2F2F2`.
*   Text (Secondary): `#A0A0A0`.
*   Brand Accent: A slightly desaturated blue (`#3B82F6`) to prevent eye strain on dark backgrounds, avoiding neon.
*   Shadows are disabled or swapped for subtle border-top highlights to create depth.

## 9. Design tokens

*   **Colors (Light Theme):**
    *   Background: `#FFFFFF`
    *   Text Primary: `#111827` (Tailwind Gray-900)
    *   Text Secondary: `#6B7280` (Tailwind Gray-500)
    *   Accent/Primary CTA: `#000000` (Linear style - stark black button).
    *   CTA Text: `#FFFFFF`
    *   Border: `#E5E7EB` (Tailwind Gray-200)
*   **Typography:** Inter, sans-serif. 
    *   Header/Count: 14px, Font Weight 600.
    *   Subtext: 12px, Font Weight 400.
    *   Button: 13px, Font Weight 500.
*   **Spacing:** Base unit 4px. Standard padding 16px. Grid gap 8px.
*   **Radius:** 
    *   Popup window (Chrome handles this, but internal wrappers): `12px`
    *   Buttons: `6px`
    *   Thumbnails: `6px`
*   **Shadows:** `box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08)` for light mode images.
*   **Animation durations:** `150ms ease-out` for opacities and colors. `200ms cubic-bezier(0.16, 1, 0.3, 1)` for transforms.

## 10. Component inventory

1.  **SkeletonLoader:** A div with a shimmering CSS gradient animation.
2.  **ThumbnailPreview (Single):** 16:9 container, `img` tag, floating resolution badge.
3.  **ThumbnailItem (Grid):** 16:9 container, `img` tag, hover overlay, selection state checkmark.
4.  **PrimaryButton:** Full-width block button. Accepts loading/progress state.
5.  **IconButton:** Square button with SVG icon (Copy, Settings).
6.  **PillBadge:** Tiny inline-block for displaying resolution or count.

## 11. Exact popup layout

**Dimensions:** Width: `320px`. Height: Dynamic, max `480px` (scrollable grid).

**Single Mode Layout:**
*   Padding: `16px` everywhere.
*   `y=16px`: Header text "ThumbBatch" (left-aligned).
*   `y=40px`: Image Preview (Width: `288px`, Height: `162px`).
*   `y=218px`: Flex row.
    *   Primary Button "Download" (Flex-grow 1).
    *   Icon Button "Copy" (Width 36px, Margin-left 8px).
*   Total approximate height: `270px`.

**Bulk Mode Layout:**
*   Padding: `16px`.
*   `y=16px`: Header text "Found X Thumbnails".
*   `y=40px`: CSS Grid container (`grid-template-columns: 1fr 1fr`, gap `8px`).
*   `y=...`: Scrollable content.
*   `Bottom (Sticky)`: A white/dark frosted glass footer (`backdrop-filter: blur(8px)`).
*   Footer contains: Primary Button "Download ZIP".

## 12. UX anti-patterns (What NOT to do)

*   **NO Spinners:** Do not use rotating circle loading icons. Use skeleton loaders or progress bars. Spinners cause anxiety and feel slow.
*   **NO Modals over the Popup:** Do not open an alert or sub-menu inside the popup.
*   **NO Toast spam:** Do not show a toast for every single download in bulk mode.
*   **NO "Are you sure?":** Never ask for confirmation before downloading. 
*   **NO YouTube Red:** Do not use YouTube's exact brand colors. It feels like a phishing attempt or cheap clone. Use neutral, premium system colors.
*   **NO Resizing the window during action:** The popup should not violently change dimensions between the loading state and the resolved state. Fix the image container aspect ratio to 16:9 with CSS before the image loads.

---

### THE "WOW" MOMENT

**The Interaction:** The "Zero-UI" Copy.

**The Context:** A designer is in Figma and needs the thumbnail of the video they are currently watching.

**The Detail:**
1. They press a global shortcut (`Cmd+Shift+C` while Chrome is active).
2. The popup **never opens**. 
3. Instead, a tiny, gorgeous, pill-shaped toast notification glides in from the top right of the active YouTube webpage (injected via `content_scripts`). 
4. The toast has a frosted glass background, a tiny checkmark, and text: "Thumbnail copied." 
5. It pauses for 1.2 seconds, then smoothly glides back out and destroys itself.
6. The designer presses `Cmd+V` in Figma. The 4K image appears instantly.

**Why it wows:** It respects the user's ultimate intent. The user didn't want a file on their desktop, and they didn't want to click through a UI. They just wanted the visual data in their clipboard. By bypassing the extension UI entirely and communicating via a native-feeling toast, it transcends being an "extension" and feels like a fundamental browser upgrade.
