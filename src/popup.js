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
  bulkTitle: document.getElementById('bulk-title'),
  bulkHeaderControls: document.getElementById('bulk-header-controls'),
  btnSelectAll: document.getElementById('btn-select-all'),
  btnDeselectAll: document.getElementById('btn-deselect-all'),
  bulkEmpty: document.getElementById('bulk-empty'),
};

let currentState = {
  mode: 'loading',
  videoId: null,
  videoTitle: null,
  videoUrl: null,
  bestUrl: null,
  bulkIds: [],
  selectedIds: new Set(),
  bulkTitle: ''
};

const QUALITIES = ['maxresdefault', 'sddefault', 'hqdefault'];

document.addEventListener('DOMContentLoaded', init);

async function init() {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tabs || tabs.length === 0) throw new Error("No active tab.");
    
    const currentTab = tabs[0];
    const url = currentTab.url || "";
    
    const match = url.match(/(?:v=|shorts\/|live\/|youtu\.be\/|embed\/)([\w-]{11})/i);
    
    if (match) {
      currentState.mode = 'single';
      currentState.videoId = match[1];
      currentState.videoUrl = `https://www.youtube.com/watch?v=${match[1]}`;
      let cleanTitle = currentTab.title ? currentTab.title.replace(/ - YouTube$/, '').trim() : "YouTube_Thumbnail";
      currentState.videoTitle = cleanTitle;
      await renderSingleVideo();
    } else if (url.includes('youtube.com')) {
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
  UI.btnSelectAll.addEventListener('click', () => setAllSelection(true));
  UI.btnDeselectAll.addEventListener('click', () => setAllSelection(false));
  
  document.addEventListener('keydown', (e) => {
    if (currentState.mode === 'single') {
      if (e.key === 'Enter') downloadSingle();
      if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
        e.preventDefault();
        copySingle();
      }
    }
  });
}

function setView(viewName) {
  UI.loading.classList.add('hidden');
  UI.error.classList.add('hidden');
  UI.single.classList.add('hidden');
  UI.bulk.classList.add('hidden');
  UI.bulkFooter.classList.add('hidden');
  document.querySelector('.logo').classList.remove('hidden');
  UI.bulkHeaderControls.classList.add('hidden');
  
  if (viewName === 'single') UI.single.classList.remove('hidden');
  else if (viewName === 'bulk') {
    UI.bulk.classList.remove('hidden');
    UI.bulkFooter.classList.remove('hidden');
    document.querySelector('.logo').classList.add('hidden');
    UI.bulkHeaderControls.classList.remove('hidden');
  }
  else if (viewName === 'loading') UI.loading.classList.remove('hidden');
  else if (viewName === 'error') UI.error.classList.remove('hidden');
}

function showError(title, subtext) {
  setView('error');
  document.getElementById('error-text').textContent = title;
  document.getElementById('error-subtext').textContent = subtext;
}

// --- SINGLE VIDEO LOGIC ---

async function renderSingleVideo() {
  UI.btnDownload.disabled = true;
  UI.btnCopy.disabled = true;
  UI.resBadge.textContent = "Resolving...";
  setView('single');
  
  const { url, quality } = await getHighestQualityThumbnail(currentState.videoId);
  
  if (!url) {
    showError("Thumbnail unavailable.", "This video might be deleted or private.");
    return;
  }
  
  currentState.bestUrl = url;
  
  // Transition effect
  UI.singleImg.style.opacity = '0';
  UI.singleImg.src = url;
  UI.singleImg.onload = () => { UI.singleImg.style.opacity = '1'; };
  
  const labels = {
    'maxresdefault': '1080p Max',
    'sddefault': '640p SD',
    'hqdefault': '480p HQ'
  };
  
  UI.resBadge.textContent = labels[quality] || quality;
  UI.btnDownload.disabled = false;
  UI.btnCopy.disabled = false;
  UI.btnDownload.focus();
}

async function verifyImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    const timeout = setTimeout(() => resolve(false), 3000);
    img.onload = () => {
      clearTimeout(timeout);
      // Ensure it's larger than the 120x90 grey placeholder
      resolve(img.naturalWidth > 120);
    };
    img.onerror = () => { clearTimeout(timeout); resolve(false); };
    img.src = url;
  });
}

async function getHighestQualityThumbnail(videoId) {
  const baseUrl = `https://i.ytimg.com/vi/${videoId}`;
  for (const quality of QUALITIES) {
    const url = `${baseUrl}/${quality}.jpg`;
    if (await verifyImage(url)) return { url, quality };
  }
  // Absolute fallback check
  const fallback = `${baseUrl}/hqdefault.jpg`;
  if (await verifyImage(fallback)) return { url: fallback, quality: 'hqdefault' };
  return { url: null, quality: null };
}

async function downloadSingle() {
  if (!currentState.bestUrl) return;
  const safeFilename = currentState.videoTitle.substring(0, 60).replace(/[^a-z0-9]/gi, '_') + '_' + currentState.videoId + '.jpg';
  
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
    window.close();
  }, 1500);
}

// Convert JPEG to PNG blob for clipboard
async function getPngBlobFromUrl(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas toBlob failed"));
      }, 'image/png');
    };
    img.onerror = reject;
    img.src = url;
  });
}

async function copySingle() {
  if (!currentState.bestUrl) return;
  try {
    const pngBlob = await getPngBlobFromUrl(currentState.bestUrl);
    
    // Semantic Copy: Include plain text and HTML link
    const textBlob = new Blob([currentState.videoUrl], { type: 'text/plain' });
    const htmlStr = `<a href="${currentState.videoUrl}">${currentState.videoTitle}</a>`;
    const htmlBlob = new Blob([htmlStr], { type: 'text/html' });
    
    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': pngBlob,
        'text/plain': textBlob,
        'text/html': htmlBlob
      })
    ]);
    
    UI.btnCopy.style.backgroundColor = "var(--success-color)";
    UI.btnCopy.style.color = "white";
    setTimeout(() => {
      window.close();
    }, 1500);
    
  } catch (err) {
    console.error("Copy failed", err);
    UI.btnCopy.innerHTML = `<span style="font-size:10px">Error</span>`;
    UI.btnCopy.style.backgroundColor = "var(--error-color)";
    UI.btnCopy.style.color = "white";
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
      setView('bulk');
      UI.bulkEmpty.classList.remove('hidden');
      UI.bulkGrid.classList.add('hidden');
      UI.bulkHeaderControls.classList.add('hidden');
      UI.bulkFooter.classList.add('hidden');
      return;
    }
    
    currentState.bulkIds = data.ids.slice(0, 50);
    currentState.selectedIds = new Set(currentState.bulkIds);
    currentState.bulkTitle = data.pageTitle || "YouTube";
    
    UI.bulkEmpty.classList.add('hidden');
    UI.bulkGrid.classList.remove('hidden');
    
    updateBulkUI();
    UI.bulkGrid.innerHTML = '';
    
    currentState.bulkIds.forEach(id => {
      const div = document.createElement('div');
      div.className = 'grid-item';
      div.dataset.id = id;
      
      const img = document.createElement('img');
      img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      img.loading = "lazy";
      img.draggable = true;
      
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

function updateBulkUI() {
  const count = currentState.selectedIds.size;
  UI.bulkTitle.textContent = `Found ${currentState.bulkIds.length}`;
  UI.btnDownloadAllText.textContent = `Download ZIP (${count})`;
  UI.btnDownloadAll.disabled = count === 0;
}

function toggleSelection(id, element) {
  if (currentState.selectedIds.has(id)) {
    currentState.selectedIds.delete(id);
    element.classList.add('deselected');
  } else {
    currentState.selectedIds.add(id);
    element.classList.remove('deselected');
  }
  updateBulkUI();
}

function setAllSelection(select) {
  if (select) {
    currentState.selectedIds = new Set(currentState.bulkIds);
    document.querySelectorAll('.grid-item').forEach(el => el.classList.remove('deselected'));
  } else {
    currentState.selectedIds.clear();
    document.querySelectorAll('.grid-item').forEach(el => el.classList.add('deselected'));
  }
  updateBulkUI();
}

async function downloadBulk() {
  const ids = Array.from(currentState.selectedIds);
  if (ids.length === 0) return;
  
  UI.btnDownloadAll.disabled = true;
  UI.btnSelectAll.disabled = true;
  UI.btnDeselectAll.disabled = true;
  
  const zip = new fflate.Zip();
  let completed = 0;
  
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
        window.close();
      }, 1500);
    }
  };

  const safeFolderName = currentState.bulkTitle.substring(0, 40).replace(/[^a-z0-9]/gi, '_');

  for (let i = 0; i < ids.length; i += 5) {
    const chunk = ids.slice(i, i + 5);
    
    await Promise.all(chunk.map(async (id) => {
      try {
        const { url } = await getHighestQualityThumbnail(id);
        if (url) {
          const res = await fetch(url);
          const buffer = new Uint8Array(await res.arrayBuffer());
          
          const filename = `${safeFolderName}/thumb_${id}.jpg`;
          const deflator = new fflate.ZipDeflate(filename);
          zip.add(deflator);
          deflator.push(buffer, true);
        }
      } catch (err) {
        console.error(`Failed to fetch ${id}`, err);
      }
      
      completed++;
      const percent = Math.floor((completed / ids.length) * 100);
      UI.bulkProgressFill.style.width = `${percent}%`;
      UI.btnDownloadAllText.textContent = `Zipping... ${completed}/${ids.length}`;
    }));
  }
  
  zip.end();
}
