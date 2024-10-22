import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PlayList from "./PlayList";
import { responsiveSize } from "../../utils/Mediaquery";
import { GoDotFill } from "react-icons/go";
import useFetchData from "../../hooks/useFetchData";


export default function PlayListList() {
  // 상태로 현재 슬라이드 인덱스를 관리
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  // 플레이리스트 데이터 가져오기
  const { data, isLoading, error } = useFetchData("/playlists/me");

  // 자동 슬라이드 효과
  useEffect(() => {
    if (!isAutoSliding) return;
    if(data){
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % data.length);
    }, 1500); // 0.5초마다 슬라이드 이동

    return () => clearInterval(interval);
  }

  }, [isAutoSliding, data]);

  // 버튼 클릭 핸들러
  const handleButtonClick = (index) => {
    setIsAutoSliding(false); // 자동 슬라이딩 중지
    setCurrentSlide(index);
  };

  return (
    <Container>
      <SlideContainer $currentSlide={currentSlide} $dataLength={data?.length}>
        {
        (data === undefined || data === null) ?
        "데이터 없음"
         : data?.map((item) => (
          <PlayList
            $dataLength={data?.length}
            key={item.id}
            id={item.id}
            title={item.title}
            time={item.totalTime}
            videoYoutubeId={
              item.videos.length === 0
                ? "pGpnulkC5z8"
                : item.videos[0].videoYoutubeId
            }
          />
        ))}
      </SlideContainer>
      <Wrap>
        <ButtonWrap>
          {data?.map((_, idx) => (
            <Button key={idx} onClick={() => handleButtonClick(idx)}>
              <GoDotFill color={currentSlide === idx ? "black" : "lightgrey"} />
            </Button>
          ))}
        </ButtonWrap>
      </Wrap>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

const SlideContainer = styled.div`
  display: flex;
  width: ${({ $dataLength }) => `${$dataLength * 100}%` ?? `500%`};
  height: ${responsiveSize("300")};
  transform: translateX(
    -${(props) => props.$currentSlide * (100 / (props.$dataLength ?? 20))}%
  );
  transition: transform 0.3s ease-in-out;
  margin-bottom: 10px;
`;

const ButtonWrap = styled.div`
  display: flex;
`;

const Button = styled.div`
  cursor: pointer;
  background-color: inherit;
`;

const Wrap = styled.div`
  display: flex;
  width: inherit;
  justify-content: center;
`;
