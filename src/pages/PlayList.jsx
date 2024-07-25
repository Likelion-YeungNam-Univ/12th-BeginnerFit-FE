import { useSearchParams } from "react-router-dom";
import { MainContainer, MainWrapper, MainContent } from "../styles/GlobalStyle";
import BackHeader from "../layouts/BackHeader";
import styled from "styled-components";
import { responsiveSize } from "../utils/Mediaquery";
import playButton2 from "../images/play button2.png";
import { Image } from "../styles/GlobalStyle";
import VideoList from "../components/PlayList/VideoList";
import useFetchData from "../hooks/useFetchData";

export default function PlayList() {
  let [query] = useSearchParams();
  // 플레이 리스트 제목
  const playListtitle = query.get("title");
  // 플레이 리스트 시간
  const time = query.get("time");
  // 플레이 리스트 아이디
  const id = query.get("id");

  const { data, isLoading } = useFetchData(`/playlists/${id}`);

  if (isLoading) return "Loading...";

  return (
    <MainWrapper>
      <MainContainer>
        <MainContent>
          <BackHeader option={false} padding={"0"} />
          <TopWrap>
            <H1>
              {playListtitle}
              <br />~{time}
            </H1>
            <TopWrapDiv>
              <Image src={playButton2} $width={80} $height={80}></Image>
            </TopWrapDiv>
          </TopWrap>
          {data && <VideoList videoIds={data.videos} />}
        </MainContent>
      </MainContainer>
    </MainWrapper>
  );
}

const H1 = styled.h1`
  max-width: ${responsiveSize("420")};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const TopWrap = styled.div`
  margin: 10px 0px 30px 10px;
  display: flex;
  justify-content: space-between;
`;

const TopWrapDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
