import React, { useState } from "react";
import styled from "styled-components";
import PlayList from "./PlayList";
import { responsiveSize } from "../../utils/Mediaquery";
import { GoDotFill } from "react-icons/go";

const playList = [
  {
    id: "ohsMB2Whyf4",
    title: "운동할때 듣는 신나는 음악",
    time: "80:59",
  },
  {
    id: "KlGaa6K0BsI",
    title: "잔잔하게 듣고 싶을 때",
    time: "10:59",
  },
  {
    id: "yRkO1qS3ym8",
    title: "울적한대 운동은 해야된다",
    time: "30:59",
  },
  {
    id: "5svlvTirzpg",
    title: "운동 효율 X 100",
    time: "10:59",
  },
  {
    id: "MBXTxHQvju8",
    title: "완전 시나는 노래 모음",
    time: "70:59",
  },
];

export default function PlayListList() {
  // 상태로 현재 슬라이드 인덱스를 관리
  const [currentSlide, setCurrentSlide] = useState(0);

  // 버튼 클릭 핸들러
  const handleButtonClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <Container>
      <SlideContainer $currentSlide={currentSlide}>
        {playList.map((item) => (
          <PlayList
            key={item.id}
            id={item.id}
            title={item.title}
            time={item.time}
          />
        ))}
      </SlideContainer>
      <Wrap>
        <ButtonWrap>
          {Array(5)
            .fill(0)
            .map((item, idx) => (
              <Button key={idx} onClick={() => handleButtonClick(idx)}>
                <GoDotFill
                  color={currentSlide === idx ? "black" : "lightgrey"}
                />
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
  width: 500%;
  height: ${responsiveSize("300")};
  transform: translateX(-${(props) => props.$currentSlide * 20}%);
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
