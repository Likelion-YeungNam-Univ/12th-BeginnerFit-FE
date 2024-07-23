// 영상 제목 가져오는 함수
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

export async function fetchVideoDetails(videoId) {
  const apiKey = import.meta.env.VITE_YOUTUBE_API;
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const video = data.items[0];
      const title = video.snippet.title;
      const channelTitle = video.snippet.channelTitle;
      const duration = video.contentDetails.duration;
      return { title, channelTitle, duration };
    } else {
      return {
        title: "제목 없음",
        channelTitle: "채널 없음",
        duration: "길이 없음",
      };
    }
  } catch (error) {
    console.error("Error fetching video details:", error);
    return null;
  }
}
