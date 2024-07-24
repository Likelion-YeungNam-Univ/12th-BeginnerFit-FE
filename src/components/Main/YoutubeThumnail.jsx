import React, { useEffect, useState } from "react";
import styled from "styled-components";
import playButton from "../../images/play button.png";
import { responsiveSize } from "../../utils/Mediaquery";
import { usePostData } from "../../hooks/usePostData";
import useFetchData from "../../hooks/useFetchData";

const YouTubeThumbnail = ({ videoId }) => {
  // 썸네일 저장 state
  const [thumbnailurl, setThumbnailurl] = useState(null);

  // 영상 정보 받아오는 코드
  const { data, isLoading } = useFetchData("/playlists/videos/next");

  const { postData } = usePostData(`/playlists/videos/${videoId}`);

  // videoId 뽑아내기 위한 코드
  useEffect(() => {
    const videoId = data?.url.match(/v=([^&]+)/)[1];
    console.log(data);
    setThumbnailurl(`https://img.youtube.com/vi/${videoId}/0.jpg`);
  }, [data]);

  // 실행 버튼 클릭하면 유튜브 영상으로 넘어가게 하는 함수
  const handleClick = () => {
    window.open(data?.url, "_blank");
  };

  if (isLoading) return "Loading...";

  return (
    <Container>
      <Thumbnail $thumbnailurl={thumbnailurl}>
        <Overlay>
          <RowContainer>
            <div>
              <H2>
                보고 있던 트레이닝 영상 <br /> 마저 시청하기
              </H2>
              <P>{data?.title}</P>
            </div>
            <Button onClick={handleClick}>
              <Image src={playButton}></Image>
            </Button>
          </RowContainer>
        </Overlay>
      </Thumbnail>
    </Container>
  );
};

export default YouTubeThumbnail;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 150px;
  border-radius: 30px;
  overflow: hidden;
`;

const Thumbnail = styled.div`
  position: relative;
  background-image: url(${({ $thumbnailurl }) => $thumbnailurl});
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  padding: 20px;
`;

const H2 = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  margin: 0px 0px 25px 0px;
`;

const P = styled.p`
  color: ${({ theme }) => theme.colors.white};
  max-width: ${responsiveSize("300")};
  text-overflow: ellipsis;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  font-size: ${responsiveSize("12")};
`;

const RowContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Image = styled.img`
  cursor: pointer;
  width: ${responsiveSize("100")};
`;

const Button = styled.button`
  background-color: inherit;
  border: none;
  border-radius: 50%;
`;
