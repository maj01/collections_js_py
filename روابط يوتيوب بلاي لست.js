// extractYouTubePlaylistLinks
function extractYouTubePlaylistLinks() {
  const videoLinks = [];
  const elements = document.querySelectorAll('h3 #video-title');

  elements.forEach((element, index) => {
    const href = element.getAttribute('href');
    const title = element.getAttribute('title');

    // Extract video ID from href
    const videoIdMatch = href.match(/v=([a-zA-Z0-9_-]+)/);
    if (videoIdMatch && videoIdMatch[1]) {
      const videoId = videoIdMatch[1];

      // Format the title for the filename (e.g., remove special characters that might cause issues)
      const formattedTitle = title.replace(/[\\/:*?"<>|]/g, '').trim();

      // Generate sequence number (e.g., 01, 02, ..., 10, 11, ...)
      const sequence = (index + 1).toString().padStart(2, '0');

      // Construct the desired link
      const newLink = `https://youtu.be/${videoId}#name=${sequence}-${formattedTitle}.mp4`;
      videoLinks.push(newLink);
    }
  });

  return videoLinks;
}

// Example usage (run this in your browser's console on the YouTube playlist page)
const links = extractYouTubePlaylistLinks();
links.forEach(link => console.log(link));
