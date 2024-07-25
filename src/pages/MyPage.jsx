import {
  MainWrapper,
  MainContainer,
  MainContent,
  MainH2,
  MainH3,
} from "../styles/GlobalStyle";
import { Header } from "../layouts/header";
import TagList from "../components/Main/TagList";
import Weight from "../components/MyPage/Weight";
import Calendar from "../components/MyPage/Calendar";
import styled from "styled-components";
import Circle from "../components/MyPage/Circle";
import { MyChallengeList } from "../components/MyPage/MyChallengeList";
import Setting from "../components/MyPage/Setting";
import Videos from "../components/MyPage/Videos";

export default function MyPage() {
  // 현재 달 구하는 코드
  const todayMonth = new Date().getMonth() + 1;

  return (
    <MainWrapper>
      <MainContainer>
        <MainContent>
          <Header type={"people"} size={30} />
          <MainH2>
            사용자님의
            <br />
            마이페이지
          </MainH2>
          <TagList />
          <Weight />
          <P>내 정보 수정하기</P>
          <MainH3>
            사용자님의
            <br />
            {todayMonth}월 출석 캘린더
          </MainH3>
          <Calendar />
          <Circle />
          <TextWrap>
            <MainH3>
              {todayMonth}월 한달동안
              <br />
              23개의 챌린지를 성공했어요!
            </MainH3>
            <Total>전체보기</Total>
          </TextWrap>
          <MyChallengeList />
          <TextWrap>
            <MainH3>
              사용자님의
              <br />
              {todayMonth}월 홈트 내역
            </MainH3>
            <Total>전체보기</Total>
          </TextWrap>
          <Videos />
          <EmptyDiv />
          <Setting />
        </MainContent>
      </MainContainer>
    </MainWrapper>
  );
}

const Total = styled.p`
  cursor: pointer;
  display: flex;
  align-items: end;
  color: ${({ theme }) => theme.colors.gray02};
  &:hover {
    text-decoration: underline;
  }
`;

const TextWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const P = styled.p`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray02};
  margin: 10px 0px 0px 0px;
  text-align: end;
  &:hover {
    text-decoration: underline;
  }
`;

const EmptyDiv = styled.div`
  width: 107.5%;
  position: relative;
  left: -21px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.gray01};
  margin-bottom: 20px;
`;
