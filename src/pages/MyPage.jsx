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
import MyChallengeList from "../components/MyPage/MyChallengeList";
import Setting from "../components/MyPage/Setting";
import Videos from "../components/MyPage/Videos";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { useChallenge } from "../store/useChallenge";

export default function MyPage() {
  // 완료한 챌린지 갯수 zustand 스토어에서 가져오기
  const { count } = useChallenge();

  // 현재 달 구하는 코드
  const todayMonth = new Date().getMonth() + 1;

  const nav = useNavigate();

  // 내 정보 수정하기 누른 경우 실행할 함수
  const onEditUserInfo = () => {
    nav("/mypage/editinfo");
  };

  // 챌린지 전체보기 버튼 누른 경우 실행할 함수
  const onViewAllChallenge = () => {
    nav("/myChallengeList");
  };

  // 홈트 내역 전체보기 누른 경우 실행할 함수
  const onViewHomeTrainList = () => {
    nav("/myHomeTrainList");
  };
  const headerClick = () => {
    nav("/friendList");
  };

  return (
    <MainWrapper>
      <MainContainer>
        <MainContent>
          <Header type={"people"} size={30} onClick={headerClick} />
          <MainH2>
            사용자님의
            <br />
            마이페이지
          </MainH2>
          <TagList />
          <Weight />
          <P onClick={onEditUserInfo}>내 정보 수정하기</P>
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
              {count}개의 챌린지를 성공했어요!
            </MainH3>
            <Total onClick={onViewAllChallenge}>전체보기</Total>
          </TextWrap>
          <MyChallengeList />
          <TextWrap>
            <MainH3>
              사용자님의
              <br />
              {todayMonth}월 홈트 내역
            </MainH3>
            <Total onClick={onViewHomeTrainList}>전체보기</Total>
          </TextWrap>
          <Videos />
          <EmptyDiv />
          <Setting />
        </MainContent>
        <BottomNav />
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
