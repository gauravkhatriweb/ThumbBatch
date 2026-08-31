// Injected into the active tab to extract YouTube video IDs
(function() {
  function extractVisibleThumbnails() {
    const ids = new Set();
    // Target thumbnails inside the main content area, avoiding the sidebar/miniplayer
    // ytd-rich-grid-media -> home page
    // ytd-grid-video-renderer -> channel videos
    // ytd-video-renderer -> search results
    const links = document.querySelectorAll('#content ytd-rich-grid-media a#thumbnail, #content ytd-grid-video-renderer a#thumbnail, #content ytd-video-renderer a#thumbnail');
    
    links.forEach(link => {
      // Only grab elements that are likely visible
      if (link.offsetParent !== null) {
        const match = link.href.match(/(?:v=|shorts\/)([\w-]{11})/i);
        if (match) ids.add(match[1]);
      }
    });
    
    // Clean page title for filename
    let pageTitle = document.title.replace(/ - YouTube$/, '').trim();
    if (!pageTitle) pageTitle = "YouTube";
    
    return { 
      ids: Array.from(ids), 
      pageTitle: pageTitle 
    };
  }

  return extractVisibleThumbnails();
})();
