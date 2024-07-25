import { useEffect, useState } from "react";
import { MainContainer, MainContent, MainWrapper } from "../styles/GlobalStyle";
import styled from "styled-components";
import BackHeader from "../layouts/BackHeader";
import useFetchData from "../hooks/useFetchData";
import VideoList from "../components/PlayList/VideoList";

export default function HomeTranList() {
  const month = new Date().getMonth() + 1;

  // videoId들 저장할 state
  const [videoIds, setVideoIds] = useState(null);

  const { data, isLoading, error } = useFetchData(`/playlists/videos/watched`);

  useEffect(() => {
    let arr = data?.map((item) => {
      return {
        videoYoutubeId: item.videoId,
        id: item.id,
      };
    });
    setVideoIds(arr);
  }, [data]);

  // 데이터 가져오는 중이면 Loading 표시
  if (isLoading) return "Loading...";

  return (
    <MainWrapper>
      <MainContainer>
        <MainContent>
          <BackHeader option={false} padding={"0"} />
          <H1>
            사용자님의
            <br />
            {month}월 홈트 내역
          </H1>
          {videoIds && data && <VideoList videoIds={videoIds} />}
        </MainContent>
      </MainContainer>
    </MainWrapper>
  );
}

const H1 = styled.h1`
  margin-top: 30px 0px;
`;
