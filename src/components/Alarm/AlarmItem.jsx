import React, { useEffect, useState } from "react";
import { Image } from "../../styles/GlobalStyle";
import chat from "../../images/댓글.png";
import remainChallenge from "../../images/남은챌린지.png";
import completedChallenge from "../../images/챌린지.png";
import add from "../../images/친구요청.png";
import styled from "styled-components";
import {
  handleFriendRequest,
  handleAlarmClick,
} from "../../apis/alram/alramApi";
import { useNavigate } from "react-router-dom";
import { useAlarmStore } from "../../store/useAlarmStore";

export const AlarmItem = ({ type, data, time, userId, id, check }) => {
  const nav = useNavigate();

  // 알람 읽었을 때 안 읽은 알람 업데이트 하는 함수 zustand에서 가져오기
  const { setCount, count } = useAlarmStore();

  // 이미지 주소 저장할 state
  const [url, setUrl] = useState(null);

  // 화면에 띄울 텍스트 저장할 state
  const [text, setText] = useState("");

  // 알림이 온 시간을 계산할 state
  const [clock, setClock] = useState(0);

  // 친구 요청 알림일 때 수락했으면 true 거절 했으면 false로 설정하여 텍스트 보여주기
  const [sure, setSure] = useState(null);

  // 게시물 번호 저장할 state
  const [postId, setPostId] = useState(null);

  // 알람을 확인했는지 확인하는 state
  const [alarmCheck, setAlarmCheck] = useState(check);

  // 친구 요청 수락 거절 버튼 눌렀을 때 실행할 함수
  const handleOnFriend = (text, userId) => {
    setAlarmCheck(true);
    // api 호출
    handleFriendRequest(text, userId);
    // ui 변경 트리거
    if (text === "sure") {
      setSure(true);
    } else {
      setSure(false);
    }
  };

  const handleOnChat = (postId) => {
    setAlarmCheck(true);
    // 알람을 읽음 상태로 만들기
    handleAlarmClick(id);
    nav(`/posts/${postId}`);
  };

  const handleChallenge = () => {
    setAlarmCheck(true);
    // 알람을 읽음 상태로 만들기
    handleAlarmClick(id);
    nav("/main");
  };

  // type에 따라 다른 함수 할당
  const handleImageClick = () => {
    // 알람을 읽음 상태로 만들기
    if (type === "COMMENT_ALARM") {
      handleOnChat(postId);
    } else if (type === "CHALLENGE_REMINDER") {
      handleChallenge();
    } else if (type === "FRIEND_REQUEST") {
      // 친구 요청인 경우 이미지 클릭해도 바뀌지 않게 수정
      () => {};
    } else {
      setAlarmCheck(true);
      handleAlarmClick(id);
      nav("/friendList");
    }
    // 안 읽은 알람수 -1 하기
    setCount(count - 1);
  };

  // type에 따라 이미지와 텍스트 바꿈
  useEffect(() => {
    // 댓글 관련 데이터인 경우 문자열 띄어쓰기로 데이터가 와서 split으로 데이터 분리
    let splitData = data.split(" ");
    let imageUrl = setImgUrl(type);
    let data2 = set(type, splitData[0]);
    let processedClock = detailDate(new Date(time));
    setClock(processedClock);
    setUrl(imageUrl);
    setText(data2);
    // 댓글 알람인 경우 postid 저장하기
    if (type === "COMMENT_ALARM") {
      setPostId(splitData[1]);
    }
  }, [type, time]);

  return (
    <Wrap $check={alarmCheck}>
      <Container>
        <RowContainer>
          <Image
            src={url}
            alt={type}
            width={80}
            height={80}
            onClick={handleImageClick}
          />
          <P>{text}</P>
        </RowContainer>
        <Clock>{clock}</Clock>
      </Container>
      {/* 친구 요청 알람인 경우 거절 수락 버튼 띄우고 수락,거절 버튼이 눌렀으면 버튼 사라지게 구현*/}
      {type === "FRIEND_REQUEST" && (
        <Container>
          {!alarmCheck && (
            <>
              <Button
                $type="reject"
                onClick={() => handleOnFriend("reject", userId)}
              >
                거절
              </Button>
              <Button
                $type="sure"
                onClick={() => handleOnFriend("sure", userId)}
              >
                수락
              </Button>
            </>
          )}
        </Container>
      )}
    </Wrap>
  );
};

// type에 따라 이미지 바꾸는 함수
function setImgUrl(type) {
  let imageUrl;
  switch (type) {
    case "FRIEND_REQUEST":
      imageUrl = add;
      break;
    case "FRIEND_ACCEPTANCE":
      imageUrl = completedChallenge;
      break;
    case "COMMENT_ALARM":
      imageUrl = chat;
      break;
    case "CHALLENGE_REMINDER":
      imageUrl = remainChallenge;
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
    case "FRIEND_REQUEST":
      text = (
        <>
          {data}님이 <br />
          친구추가를 요청했어요
        </>
      );
      break;
    case "FRIEND_ACCEPTANCE":
      text = (
        <>
          {data}님과 <br />
          친구가 되었어요!
        </>
      );
      break;
    case "CHALLENGE_REMINDER":
      text = (
        <>
          <strong style={{ display: "block" }}>조금만 더 힘내세요!</strong>
          오늘의 챌린지가 1개 남았어요!
        </>
      );
      break;
    case "COMMENT_ALARM":
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

// 얼마 전에 도착한 알림인지 출력할 함수
function detailDate(time) {
  const milliSeconds = new Date() - time;
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
}

const Wrap = styled.div`
  border-radius: 10px;
  padding: 10px;
  background-color: ${({ $check }) => ($check ? "lightgray" : null)};
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 20px; */
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

const Button = styled.button`
  cursor: pointer;
  width: 48%;
  border: none;
  padding: 10px;
  border-radius: 12px;
  color: white;
  transition: all 0.3s ease;
  background-color: ${({ $type }) => ($type === "sure" ? "black" : "#D9D9D9")};
  &:hover {
    background-color: gray;
  }
`;
