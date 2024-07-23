import styled from "styled-components";
import { responsiveSize } from "../../utils/Mediaquery";
import playButton from "../../images/play button.png";

export default function PlayList({ id, title, time }) {
  // 썸네일 주소
  const thumbnailurl = `https://img.youtube.com/vi/${id}/0.jpg`;
  // 영상 주소
  const videoUrl = `https://www.youtube.com/watch?v=${id}`;
  const handleClick = () => {
    window.open(videoUrl, "_blank");
  };
  return (
    <Container $thumbnailurl={thumbnailurl}>
      <Overlay>
        <div>
          <H2>{title}</H2>
          <H2>~{time}</H2>
        </div>
        <ImgWrap>
          <Image src={playButton} onClick={handleClick}></Image>
        </ImgWrap>
      </Overlay>
    </Container>
  );
}

const Container = styled.div`
  background-image: url(${({ $thumbnailurl }) => $thumbnailurl});
  background-size: cover;
  background-position: center;
  width: 20%;
  border-radius: 31px;
  height: ${responsiveSize("300")};
  position: relative;
  float: left;
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
  border-radius: 31px;
  display: flex;
  justify-content: space-between;
`;

const H2 = styled.h2`
  margin: 0px;
  color: ${({ theme }) => theme.colors.white};
`;

const Image = styled.img`
  cursor: pointer;
  width: ${responsiveSize("100")};
  height: ${responsiveSize("100")};
`;

const Button = styled.button`
  background-color: inherit;
  border: none;
  border-radius: 50%;
`;

const ImgWrap = styled.div`
  display: flex;
  align-items: end;
`;
