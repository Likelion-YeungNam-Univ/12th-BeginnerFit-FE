import styled from "styled-components";
import User from "./User";
import { SpeechBubble } from "./ChallengeList";
import useFetchData from "../../hooks/useFetchData";
import { useUserInfo } from "../../store/useUserInfo";
import { useEffect, useState } from "react";

export default function UserList() {
  // 사용자 정보 저장할 배열 state
  const [userList, setUserList] = useState([]);

  // 나의 순위를 저장할 state
  const [rank, setRank] = useState(0);

  // 현재 로그인한 정보 가져오기
  const { user } = useUserInfo();

  // 사용자 랭킹 데이터 서버에서 받아오기
  const { data } = useFetchData("/challengeparticipant/ranking");

  useEffect(() => {
    if (data) {
      setUserList(data);
      // 받아온 데이터 중 나의 순위 찾아서 저장하기
      let myRank = data.find((item) => item.userId === user.userId).rank;
      setRank(myRank);
    }
  }, [data]);

  return (
    <Container>
      <SpeechBubble>사용자님은 현재 {rank}위에요!</SpeechBubble>
      {userList?.map((item) => (
        <User rank={item.rank} key={item.userId} nickname={item.name} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;
