import { useState, useEffect } from "react";
import { fetchVideoDetails } from "../../apis/youtubeApi";
import styled from "styled-components";
import { usePostData } from "../../hooks/usePostData";

export default function Video({ id, videoId }) {
  // 썸네일 주소
  const thumbnailurl = `https://img.youtube.com/vi/${id}/0.jpg`;
  // 영상 주소
  const videoUrl = `https://www.youtube.com/watch?v=${id}`;

  const { postData } = usePostData(`/playlists/videos/${videoId}`);

  // 유튜브 영상 정보 저장할 state
  const [videoDetails, setVideoDetails] = useState(null);

  useEffect(() => {
    async function getDetails() {
      const details = await fetchVideoDetails(id);
      setVideoDetails(details);
    }
    getDetails();
  }, []);

  // 영상 클릭시 영상 보러가기
  const handleThumClick = () => {
    postData();
    window.open(videoUrl, "_blank");
  };

  return (
    <Container>
      <Wrap>
        <ImageContainer>
          <Image src={thumbnailurl} alt="" />
        </ImageContainer>
        <ClockWrap onClick={handleThumClick}>
          <ClockP>
            {videoDetails && formatDuration(videoDetails.duration)}
          </ClockP>
        </ClockWrap>
      </Wrap>
      <Item>
        <Title onClick={handleThumClick}>{videoDetails?.title}</Title>
        <ChannelTitle>{videoDetails?.channelTitle}</ChannelTitle>
      </Item>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Wrap = styled.div`
  position: relative;
  width: 200px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: calc(201.922 / 358.984 * 100%);
  overflow: hidden;
`;

const Image = styled.img`
  border-radius: 20px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ClockP = styled.span`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: ${({ theme }) => theme.colors.gray01};
`;

const ClockWrap = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Title = styled.p`
  cursor: pointer;
  font-size: 18px;
  width: 300px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0px;
`;

const ChannelTitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray02};
`;

// "PT6M12S"형식을 06:12으로 분리해주는 함수
function formatDuration(duration) {
  const matches = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = (matches[1] || "0H").slice(0, -1);
  const minutes = (matches[2] || "0M").slice(0, -1);
  const seconds = (matches[3] || "0S").slice(0, -1);

  const formattedDuration = [
    hours !== "0" ? hours.padStart(2, "0") : null,
    minutes.padStart(2, "0"),
    seconds.padStart(2, "0"),
  ]
    .filter(Boolean)
    .join(":");

  return formattedDuration;
}
