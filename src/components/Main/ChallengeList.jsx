import { useState } from "react";
import Challenge from "./Challenge";
import styled from "styled-components";

const challengeList = [
  { content: "30분 이상 운동하기" },
  { content: "물 2L 이상 마시기" },
  { content: "헬스장 가기" },
];

export default function ChallengeList() {
  // 챌린지 완료했는지 체크함수
  const [complete, setComplete] = useState({
    1: true,
    2: false,
    3: false,
  });

  //
  const handleCheck = (idx) => {
    setComplete({ ...complete, [idx]: !complete[idx] });
  };
  return (
    <Container>
      <SpeechBubble>사용자님 현재 1위에요!</SpeechBubble>
      {challengeList.map((item, idx) => (
        <Challenge
          key={idx}
          index={idx + 1}
          content={item.content}
          complete={complete[idx + 1]}
          handleCheck={handleCheck}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const SpeechBubble = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 0.4em;
  z-index: 1;
  top: -60px;
  right: 0px;
  padding: 10px;

  &::after {
    content: "";
    position: absolute;
    top: 40px;
    bottom: 0;
    left: 90%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: ${({ theme }) => theme.colors.black};
    border-bottom: 0;
    margin-left: -20px;
    margin-bottom: -20px;
  }
`;
