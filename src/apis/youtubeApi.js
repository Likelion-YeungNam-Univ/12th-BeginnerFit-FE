export async function fetchVideoTitle(videoId) {
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${
    import.meta.env.VITE_YOUTUBE_API
  }&part=snippet`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const videoTitle = data.items[0].snippet.title;
      return videoTitle;
    } else {
      return "제목 없음";
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
