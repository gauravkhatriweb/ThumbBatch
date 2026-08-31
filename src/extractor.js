// Injected into the active tab to extract YouTube video IDs
(function() {
  function extractVisibleThumbnails() {
    const ids = new Set();
    const links = document.querySelectorAll('a');
    
    links.forEach(link => {
      // Must be visible in the DOM
      if (link.offsetParent !== null && link.href) {
        // Match both normal watch URLs and shorts
        const match = link.href.match(/(?:v=|shorts\/)([\w-]{11})/i);
        // Exclude links that are just user avatars on live streams
        const isAvatar = link.closest('yt-img-shadow') || link.querySelector('yt-img-shadow');
        if (match && !isAvatar) {
          ids.add(match[1]);
        }
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
