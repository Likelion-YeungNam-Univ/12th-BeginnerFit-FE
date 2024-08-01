import { useEffect, useState } from "react";
import Challenge from "./Challenge";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { responsiveSize } from "../../utils/Mediaquery";
import useFetchData from "../../hooks/useFetchData";
import api from "../../apis/axios";

export default function ChallengeList() {
  // 챌린지 정보 담을 state
  const [challengeList, setChallengeList] = useState([]);

  // 모든 챌린지 완료 했는지 체크할 state
  const [allComplete, setAllComplete] = useState(false);

  // 챌린지 3개 가져오기
  const { data } = useFetchData("/challengeparticipant/today-challenges");

  const { data: total } = useFetchData("/completed-friend-count");
  console.log(total);

  // 챌린지 완료 모양 눌럿을 때 실행할 함수
  const handleCheck = async (idx, id) => {
    // 모든 챌린지 완료했으면 챌린지 완료 표시 수정 불가능
    if (allComplete) {
      return;
    }
    // 체크 모양 눌렀을 때 해당 챌린지 취소, 완료 표시하기
    let arr = [...challengeList];

    // 해당 챌린지가 완료인 경우 false로 바꾸기
    if (arr[idx].completed) {
      // 사용자에게 미리 업데이트
      arr[idx].completed = false;
      // 서버로 데이터 전송
      try {
        await api.put(`/challengeparticipant/notcomplete/${id}`);
      } catch (e) {
        console.error("에러 발생 " + e);
      }
    } else {
      // 미완료 챌린지를 클릭한 경우 true로 변경
      arr[idx].completed = true;
      try {
        await api.put(`/challengeparticipant/complete/${id}`);
      } catch (e) {
        console.error("에러 발생: ", e);
      }
    }

    //상태 업데이트
    setChallengeList(arr);

    // 챌린지가 모두 완료되었으면 allComplete 상태 변경
    if (arr.every((item) => item.completed)) {
      setAllComplete(true);
    }
  };

  // 챌린지 가져오고 state에 저장
  useEffect(() => {
    if (data) {
      console.log(data);
      setChallengeList(data);
      setAllComplete(data.length === 3 && data.every((item) => item.completed));
    }
  }, [data]);

  return (
    <Container>
      <SpeechBubble>친구 27명이 성공했어요!</SpeechBubble>
      {challengeList?.map((item, idx) => (
        <Challenge
          allComplete={allComplete}
          key={item.challengeId}
          id={item.challengeId}
          index={idx}
          content={item.challengeContent}
          complete={item.completed}
          handleCheck={handleCheck}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

export const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

export const SpeechBubble = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 0.4em;
  z-index: 1;
  top: -60px;
  right: 0px;
  padding: 10px;
  font-size: ${responsiveSize("14")};
  animation: ${bounce} 2s infinite;
  &::after {
    content: "";
    position: absolute;
    top: 35px;
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
