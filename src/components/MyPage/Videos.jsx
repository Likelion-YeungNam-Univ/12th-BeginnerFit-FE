import { useEffect, useState } from "react";
import useFecthData from "../../hooks/useFetchData";
import VideoList from "../PlayList/VideoList";
export default function Videos() {
  // videoId들 저장할 state
  const [videoIds, setVideoIds] = useState(null);

  // 본 영상 3개 가져오는 함수
  const { data, isLoading, error } = useFecthData(
    "/playlists/videos/recent-watched"
  );

  // 데이터 가져오고 VideoList에 props로 전달하기 위해 데이터 조작
  useEffect(() => {
    let arr = data?.map((item) => {
      return {
        videoYoutubeId: item.videoId,
        id: item.id,
      };
    });
    setVideoIds(arr);
  }, [data]);
  return <div>{videoIds && data && <VideoList videoIds={videoIds} />}</div>;
}
