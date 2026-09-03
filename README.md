# 🖼️ ThumbBatch

> **Bulk YouTube thumbnails. One click.**

ThumbBatch is a powerful, lightweight Google Chrome Extension designed for content creators, designers, and archivists who need to quickly grab high-resolution YouTube thumbnails. Whether you need the thumbnail of the video you are currently watching, or want to batch download dozens of thumbnails from a channel page in a single ZIP archive, ThumbBatch has you covered.

## ✨ Key Features

- **⚡ Single Video Mode:** Instantly fetch the highest available quality (up to 1080p `maxresdefault`) thumbnail when on a YouTube video page (including Shorts and Live streams).
- **📦 Bulk Download Mode:** Scans any YouTube page (channel, search results, homepage) and allows you to select multiple visible thumbnails to download as a single ZIP file.
- **📋 Smart Copy to Clipboard:** Copy the image directly to your clipboard, along with a rich HTML link to the video, for easy pasting into Notion, Docs, or design tools.
- **🔒 Privacy-First & Fast:** Runs entirely in your browser. No external servers are used to process the images or create the ZIP files (uses `fflate` for blazing-fast local zipping).

## 🚀 Installation (Developer Mode)

Currently, ThumbBatch can be installed manually as an unpacked extension.

1. **Download or Clone** this repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/ThumbBatch.git
   ```
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** via the toggle in the top right corner.
4. Click on **Load unpacked** in the top left.
5. Select the `src` folder inside the downloaded ThumbBatch directory.
6. *Tip: Pin the ThumbBatch extension to your toolbar for easy access!*

## 📖 How to Use

### Downloading a Single Thumbnail
1. Navigate to any YouTube video (standard watch page, Short, or Live).
2. Click the ThumbBatch extension icon in your toolbar.
3. The popup will automatically resolve and display the highest quality thumbnail available.
4. Click **Download** to save the `.jpg` image, or **Copy** to copy the image and semantic link to your clipboard.

### Bulk Downloading Thumbnails
1. Navigate to a YouTube channel page, search results, or your home feed.
2. Click the ThumbBatch extension icon.
3. The extension will scan the page for all currently visible video thumbnails (scroll down the page first if you want to load more).
4. A grid of thumbnails will appear. You can click individual thumbnails to select/deselect them, or use the provided "Select All" / "Deselect All" controls.
5. Click **Download ZIP** to package and download your selected thumbnails instantly.

## 🛠️ Technologies Built With

- **Chrome Extension Manifest V3:** Adheres to the latest, most secure Chrome extension standards.
- **Vanilla JavaScript & CSS:** No heavy frontend frameworks, ensuring a small footprint and a highly responsive popup UI.
- **[fflate](https://github.com/101arrowz/fflate):** The fastest, smallest JavaScript compression library, used to create ZIP files directly on the client side with minimal memory overhead.

## 🔐 Permissions Explained

ThumbBatch requires specific permissions to function smoothly and securely:
- `activeTab`: To read the URL and title of the current YouTube tab to determine context (Single vs. Bulk mode).
- `scripting`: To inject the extraction script (`extractor.js`) into the page to find visible video IDs.
- `downloads`: To save the image or ZIP file directly to your local downloads folder.
- `clipboardWrite`: To enable the smart "Copy" feature for images and links.
- `Host Permissions`: Specific access to `*://i.ytimg.com/*` and `*://img.youtube.com/*` to fetch the thumbnail images.

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome! Feel free to check the issues page or submit a Pull Request if you'd like to improve the extension.

## 📝 License

This project is licensed under the MIT License.
