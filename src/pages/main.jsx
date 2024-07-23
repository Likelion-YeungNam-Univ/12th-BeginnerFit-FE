import React from "react";
import { Header } from "../layouts/header";
import styled from "styled-components";
import TagList from "../components/Main/TagList";
import YouTubeThumbnail from "../components/Main/YoutubeThumnail";
import PlayListList from "../components/Main/PlayListList";
import ChallengeList from "../components/Main/ChallengeList";
import UserList from "../components/Main/UserList";

export default function Main() {
  const today = new Date();

  return (
    <Wrapper>
      <Container>
        <MainContent>
          {/* 헤더 내비 게이션 */}
          <Header type={"alarm"} size={"30"} />
          <MainH2>
            사용자님!
            <br />
            오늘도 홈트해볼까요?
          </MainH2>
          <YouTubeThumbnail
            videoId={"cs4BJQmsF4M"}
            title="`노력을 대신할 수 있는건 없다` 하체 박살 루틴"
          />
          <MainH3>
            사용자님을 위한 <br />
            오늘의 홈트 플레이리스트
          </MainH3>
          <TagList />
          <PlayListList />
          <MainH3>
            {`${today.getMonth() + 1}월 ${today.getDate()}일`}
            <br />
            오늘의 챌린지
          </MainH3>
          <ChallengeList />
          <MainH3>
            친구와 함께하는
            <br />
            오늘의 챌린지 순위
          </MainH3>
          <UserList />
        </MainContent>
      </Container>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  height: 100%;
`;

export const MainContent = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: solid 1px ${({ theme }) => theme.colors.gray04};
  padding: 20px;
`;

const MainH2 = styled.h1`
  margin-top: 40px;
  margin-bottom: 20px;
`;

const MainH3 = styled.h2`
  margin-top: 40px;
  margin-bottom: 10px;
`;
