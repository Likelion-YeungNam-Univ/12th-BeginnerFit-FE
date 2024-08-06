import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAlarmStore } from "../store/useAlarmStore";
import { handleAlarmClick, handleFriendRequest } from "../apis/alram/alramApi";
import { TimeCalculator } from "../utils/TimeCalculator";
import chat from "../images/댓글.png";
import remainChallenge from "../images/남은챌린지.png";
import completedChallenge from "../images/챌린지.png";
import add from "../images/친구요청.png";

export const useAlram = ({ type, check, id, data, time }) => {
  const nav = useNavigate();

  // 알람 읽었을 때 안 읽은 알람 업데이트 하는 함수 zustand에서 가져오기
  const { setCount, count } = useAlarmStore();

  // 이미지 주소 저장할 state
  const [url, setUrl] = useState(null);

  // 화면에 띄울 텍스트 저장할 state
  const [text, setText] = useState("");

  // 알림이 온 시간을 계산할 state
  const [clock, setClock] = useState(0);

  // 게시물 번호 저장할 state
  const [postId, setPostId] = useState(null);

  // 알람을 확인했는지 확인하는 state
  const [alarmCheck, setAlarmCheck] = useState(check);

  // 친구 요청 수락 거절 버튼 눌렀을 때 실행할 함수
  const handleOnFriend = (text, userId) => {
    setCount(count - 1);
    handleAlarmClick(id);
    setAlarmCheck(true);
    // api 호출
    handleFriendRequest(text, userId);
  };

  const handleOnChat = (postId) => {
    // 안 읽은 알람수 -1 하기
    setCount(count - 1);
    setAlarmCheck(true);
    // 알람을 읽음 상태로 만들기
    handleAlarmClick(id);
    nav(`/posts/${postId}`);
  };

  const handleChallenge = () => {
    // 안 읽은 알람수 -1 하기
    setCount(count - 1);
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
      // 안 읽은 알람수 -1 하기
      setCount(count - 1);
      setAlarmCheck(true);
      handleAlarmClick(id);
      nav("/friendList");
    }
  };

  // type에 따라 이미지와 텍스트 바꿈
  useEffect(() => {
    // 댓글 관련 데이터인 경우 문자열 띄어쓰기로 데이터가 와서 split으로 데이터 분리
    let splitData = data.split(" ");
    let imageUrl = setImgUrl(type);
    let data2 = set(type, splitData[0]);
    let processedClock = TimeCalculator(time);
    setClock(processedClock);
    setUrl(imageUrl);
    setText(data2);
    // 댓글 알람인 경우 postid 저장하기
    if (type === "COMMENT_ALARM") {
      setPostId(splitData[1]);
    }
  }, [type, time]);

  return { url, text, clock, alarmCheck, handleOnFriend, handleImageClick };
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
