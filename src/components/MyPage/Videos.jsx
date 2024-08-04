import { useEffect, useState } from "react";
import useFecthData from "../../hooks/useFetchData";
import VideoList from "../PlayList/VideoList";
import styled from "styled-components";
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

  return (
    <div>
      {videoIds && videoIds.length === 0 ? (
        <P>시청한 영상이 없습니다!</P>
      ) : (
        videoIds && data && <VideoList videoIds={videoIds} />
      )}
    </div>
  );
}

const P = styled.p`
  font-size: 16px;
  margin-top: 0px;
`;
