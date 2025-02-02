function addDownloadButton() {
  console.log('Video Downloader Extension: Starting to look for video element');
  
  // Use MutationObserver to watch for changes in the DOM
  const observer = new MutationObserver((mutations, obs) => {
    const video = document.querySelector('video');
    if (video && !document.querySelector('.download-button')) {
      console.log('Video Downloader Extension: Video element found');
      
      // Create download button
      const downloadButton = document.createElement('button');
      downloadButton.className = 'download-button';
      downloadButton.textContent = 'Download Video';
      
      // Add click handler
      downloadButton.addEventListener('click', () => {
        const videoUrl = video.src || video.querySelector('source')?.src;
        console.log('Video Downloader Extension: Video URL found:', videoUrl);
        
        if (videoUrl) {
          // Create temporary link to trigger download
          const a = document.createElement('a');
          a.href = videoUrl;
          a.download = 'video.mp4';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          console.error('Video Downloader Extension: Video source not found');
        }
      });
      
      // Add button to page
      document.body.appendChild(downloadButton);
      console.log('Video Downloader Extension: Download button added');
    }
  });

  // Start observing the document with the configured parameters
  observer.observe(document.body, { 
    childList: true,
    subtree: true
  });
}

// Wait for page to load then initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addDownloadButton);
} else {
  addDownloadButton();
}