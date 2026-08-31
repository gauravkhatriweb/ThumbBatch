// popup.js
const UI = {
  loading: document.getElementById('loading-state'),
  error: document.getElementById('error-state'),
  single: document.getElementById('single-ui'),
  bulk: document.getElementById('bulk-ui'),
  bulkFooter: document.getElementById('bulk-footer'),
  
  singleImg: document.getElementById('single-image'),
  resBadge: document.getElementById('resolution-badge'),
  btnDownload: document.getElementById('btn-download'),
  btnCopy: document.getElementById('btn-copy'),
  
  bulkGrid: document.getElementById('bulk-grid'),
  btnDownloadAll: document.getElementById('btn-download-all'),
  btnDownloadAllText: document.getElementById('btn-download-all-text'),
  bulkProgressFill: document.getElementById('bulk-progress-fill'),
  bulkTitle: document.getElementById('bulk-title')
};

let currentState = {
  mode: 'loading',
  videoId: null,
  videoTitle: null,
  bestUrl: null,
  bulkIds: [],
  selectedIds: new Set(),
  bulkTitle: ''
};

// Qualities in descending order of preference
const QUALITIES = ['maxresdefault', 'sddefault', 'hqdefault'];

document.addEventListener('DOMContentLoaded', init);

async function init() {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tabs || tabs.length === 0) throw new Error("No active tab.");
    
    const currentTab = tabs[0];
    const url = currentTab.url || "";
    
    // Check if single video mode
    const match = url.match(/(?:v=|shorts\/|live\/|youtu\.be\/)([\w-]{11})/i);
    
    if (match) {
      // Single video
      currentState.mode = 'single';
      currentState.videoId = match[1];
      let cleanTitle = currentTab.title ? currentTab.title.replace(/ - YouTube$/, '').trim() : "YouTube_Thumbnail";
      currentState.videoTitle = cleanTitle;
      await renderSingleVideo();
    } else if (url.includes('youtube.com')) {
      // Bulk mode (Channel, Search, Home)
      currentState.mode = 'bulk';
      await renderBulkVideos(currentTab.id);
    } else {
      showError("Not a YouTube page.", "Navigate to a video or channel to extract thumbnails.");
    }
  } catch (err) {
    console.error(err);
    showError("An error occurred.", err.message);
  }
  
  setupListeners();
}

function setupListeners() {
  UI.btnDownload.addEventListener('click', downloadSingle);
  UI.btnCopy.addEventListener('click', copySingle);
  UI.btnDownloadAll.addEventListener('click', downloadBulk);
}

function setView(viewName) {
  UI.loading.classList.add('hidden');
  UI.error.classList.add('hidden');
  UI.single.classList.add('hidden');
  UI.bulk.classList.add('hidden');
  UI.bulkFooter.classList.add('hidden');
  document.querySelector('.logo').classList.remove('hidden');
  UI.bulkTitle.classList.add('hidden');
  
  if (viewName === 'single') UI.single.classList.remove('hidden');
  else if (viewName === 'bulk') {
    UI.bulk.classList.remove('hidden');
    UI.bulkFooter.classList.remove('hidden');
    document.querySelector('.logo').classList.add('hidden');
    UI.bulkTitle.classList.remove('hidden');
  }
  else if (viewName === 'loading') UI.loading.classList.remove('hidden');
  else if (viewName === 'error') UI.error.classList.remove('hidden');
}

function showError(title, subtext) {
  setView('error');
  document.getElementById('error-text').textContent = title;
  document.querySelector('#error-state .subtext').textContent = subtext;
}

// --- SINGLE VIDEO LOGIC ---

async function renderSingleVideo() {
  UI.btnDownload.disabled = true;
  UI.btnCopy.disabled = true;
  UI.resBadge.textContent = "Resolving...";
  setView('single');
  
  const { url, quality } = await getHighestQualityThumbnail(currentState.videoId);
  currentState.bestUrl = url;
  
  UI.singleImg.src = url;
  
  // Nice label mapping
  const labels = {
    'maxresdefault': '1080p Max',
    'sddefault': '640p SD',
    'hqdefault': '480p HQ'
  };
  
  UI.resBadge.textContent = labels[quality] || quality;
  UI.btnDownload.disabled = false;
  UI.btnCopy.disabled = false;
  
  // Auto-focus download
  UI.btnDownload.focus();
}

async function verifyImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      // YouTube's grey placeholder is 120x90
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

async function getHighestQualityThumbnail(videoId) {
  const baseUrl = `https://i.ytimg.com/vi/${videoId}`;

  for (const quality of QUALITIES) {
    const url = `${baseUrl}/${quality}.jpg`;
    const isValid = await verifyImage(url);
    if (isValid) return { url, quality };
  }
  // Absolute fallback
  return { url: `${baseUrl}/hqdefault.jpg`, quality: 'hqdefault' };
}

async function downloadSingle() {
  if (!currentState.bestUrl) return;
  const safeFilename = currentState.videoTitle.replace(/[^a-z0-9]/gi, '_') + '.jpg';
  
  chrome.downloads.download({
    url: currentState.bestUrl,
    filename: safeFilename
  });
  
  const originalText = UI.btnDownload.textContent;
  UI.btnDownload.textContent = "Downloaded!";
  UI.btnDownload.classList.add('success');
  setTimeout(() => {
    UI.btnDownload.textContent = originalText;
    UI.btnDownload.classList.remove('success');
  }, 2000);
}

async function copySingle() {
  if (!currentState.bestUrl) return;
  try {
    const res = await fetch(currentState.bestUrl);
    const blob = await res.blob();
    
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob
      })
    ]);
    
    // UI Feedback
    UI.btnCopy.style.backgroundColor = "var(--success-color)";
    UI.btnCopy.style.color = "white";
    setTimeout(() => {
      UI.btnCopy.style.backgroundColor = "";
      UI.btnCopy.style.color = "";
    }, 2000);
    
  } catch (err) {
    console.error("Copy failed", err);
    alert("Copy failed. Ensure Chrome is focused and clipboard permissions are granted.");
  }
}

// --- BULK VIDEO LOGIC ---

async function renderBulkVideos(tabId) {
  setView('loading');
  
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['extractor.js']
    });
    
    const data = results[0].result;
    if (!data || !data.ids || data.ids.length === 0) {
      showError("No thumbnails found.", "Try scrolling down to load more content.");
      return;
    }
    
    currentState.bulkIds = data.ids.slice(0, 50); // Cap at 50 to prevent OOM/Rate limits
    currentState.selectedIds = new Set(currentState.bulkIds);
    currentState.bulkTitle = data.pageTitle || "YouTube";
    
    UI.bulkTitle.textContent = `Found ${currentState.bulkIds.length}`;
    UI.btnDownloadAllText.textContent = `Download ZIP (${currentState.selectedIds.size})`;
    
    UI.bulkGrid.innerHTML = '';
    
    currentState.bulkIds.forEach(id => {
      const div = document.createElement('div');
      div.className = 'grid-item';
      div.dataset.id = id;
      
      const img = document.createElement('img');
      img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; // Lazy fast load for grid
      img.loading = "lazy";
      
      const overlay = document.createElement('div');
      overlay.className = 'check-overlay';
      overlay.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      
      div.appendChild(img);
      div.appendChild(overlay);
      
      div.addEventListener('click', () => toggleSelection(id, div));
      
      UI.bulkGrid.appendChild(div);
    });
    
    setView('bulk');
  } catch (err) {
    console.error(err);
    showError("Could not scan page.", err.message);
  }
}

function toggleSelection(id, element) {
  if (currentState.selectedIds.has(id)) {
    currentState.selectedIds.delete(id);
    element.classList.add('deselected');
  } else {
    currentState.selectedIds.add(id);
    element.classList.remove('deselected');
  }
  
  const count = currentState.selectedIds.size;
  UI.btnDownloadAllText.textContent = `Download ZIP (${count})`;
  UI.btnDownloadAll.disabled = count === 0;
}

async function downloadBulk() {
  const ids = Array.from(currentState.selectedIds);
  if (ids.length === 0) return;
  
  UI.btnDownloadAll.disabled = true;
  
  const zip = new fflate.Zip();
  let completed = 0;
  
  // Await zip compilation via streams
  const chunks = [];
  zip.ondata = (err, data, final) => {
    if (err) throw err;
    chunks.push(data);
    if (final) {
      const blob = new Blob(chunks, { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      
      const safeTitle = currentState.bulkTitle.replace(/[^a-z0-9]/gi, '_');
      chrome.downloads.download({
        url: url,
        filename: `${safeTitle}_Thumbnails.zip`
      });
      
      UI.bulkProgressFill.style.width = `100%`;
      UI.btnDownloadAllText.textContent = "Downloaded!";
      UI.btnDownloadAll.classList.add('success');
      
      setTimeout(() => {
        window.close(); // Close popup automatically on success
      }, 1500);
    }
  };

  // Process in small chunks to not hammer the browser/network
  for (let i = 0; i < ids.length; i += 5) {
    const chunk = ids.slice(i, i + 5);
    
    await Promise.all(chunk.map(async (id) => {
      try {
        const { url } = await getHighestQualityThumbnail(id);
        const res = await fetch(url);
        const buffer = new Uint8Array(await res.arrayBuffer());
        
        // Ensure valid filename
        const filename = `thumb_${id}.jpg`;
        const deflator = new fflate.ZipDeflate(filename);
        zip.add(deflator);
        deflator.push(buffer, true);
        
      } catch (err) {
        console.error(`Failed to fetch ${id}`, err);
      }
      
      completed++;
      const percent = Math.floor((completed / ids.length) * 100);
      UI.bulkProgressFill.style.width = `${percent}%`;
      UI.btnDownloadAllText.textContent = `Zipping... ${completed}/${ids.length}`;
    }));
  }
  
  // Finish ZIP
  zip.end();
}
