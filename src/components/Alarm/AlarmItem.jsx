import React, { useEffect, useState } from "react";
import { Image } from "../../styles/GlobalStyle";
import chat from "../../images/댓글.png";
import remainChallenge from "../../images/남은챌린지.png";
import completedChallenge from "../../images/챌린지.png";
import add from "../../images/친구요청.png";
import completedFriend from "../../images/챌린지완료한친구.png";
import styled from "styled-components";

export const AlarmItem = ({ type, data }) => {
  // 이미지 주소 저장할 state
  const [url, setUrl] = useState(null);

  // 화면에 띄울 텍스트 저장할 state
  const [text, setText] = useState("");

  // type에 따라 이미지와 텍스트 바꿈
  useEffect(() => {
    let imageUrl = setImgUrl(type);
    let data2 = set(type, data);
    setUrl(imageUrl);
    setText(data2);
  }, [type]);

  return (
    <Container>
      <RowContainer>
        <Image src={url} alt={type} width={80} height={80} />
        <P>{text}</P>
      </RowContainer>
      <Clock>1시간전</Clock>
    </Container>
  );
};

// type에 따라 이미지 바꾸는 함수
function setImgUrl(type) {
  let imageUrl;
  switch (type) {
    case "add":
      imageUrl = add;
      break;
    case "completedFriend":
      imageUrl = completedFriend;
      break;
    case "completedChallenge":
      imageUrl = completedChallenge;
      break;
    case "remainChallenge":
      imageUrl = remainChallenge;
      break;
    case "chat":
      imageUrl = chat;
      break;
    default:
      imageUrl = null;
      break;
  }
  return imageUrl;
}

// type과 data에 따라 화면에 띄울 알림 텍스트를 설정하는 함수
function set(type, data) {
  let text;
  switch (type) {
    case "add":
      text = (
        <>
          {data}님이 <br />
          친구추가를 요청했어요
        </>
      );
      break;
    case "completedFriend":
      text = (
        <>
          사용자님의 친구 {data}명이 <br />
          이미 오늘의 챌린지를 성공했어요!
        </>
      );
      break;
    case "completedChallenge":
      text = (
        <>
          <strong style={{ display: "block" }}>축하드려요</strong>
          오늘의 챌린지를 다 성공했어요!
        </>
      );
      break;
    case "remainChallenge":
      text = (
        <>
          <strong style={{ display: "block" }}>조금만 더 힘내세요!</strong>
          오늘의 챌린지가 {data}개 남았어요!
        </>
      );
      break;
    case "chat":
      text = (
        <>
          {data}님이 <br />
          회원님의 게시물에 댓글을 달았어요
        </>
      );
      break;
    default:
      text = "";
      break;
  }
  return text;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const RowContainer = styled.div`
  gap: 20px;
  display: flex;
`;

const P = styled.p`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Clock = styled.p`
  color: ${({ theme }) => theme.colors.gray02};
  display: flex;
  justify-content: center;
  align-items: center;
`;
