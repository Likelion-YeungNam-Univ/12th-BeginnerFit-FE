import styled from "styled-components";
import User from "./User";
import { bounce } from "./ChallengeList";
import { SpeechBubble } from "./ChallengeList";

const userList = [
  { nickname: "연기" },
  { nickname: "도연" },
  { nickname: "지현" },
  { nickname: "박하" },
  { nickname: "서연" },
  { nickname: "규희" },
];

export default function UserList() {
  return (
    <Container>
      <SpeechBubble>사용자님은 현재 7위에요!</SpeechBubble>
      {userList.map((item, idx) => (
        <User {...item} rank={idx + 1} key={item.nickname} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;
