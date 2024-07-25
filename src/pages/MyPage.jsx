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
          <MainH3>
            사용자님의
            <br />
            {todayMonth}월 출석 캘린더
          </MainH3>
        </MainContent>
      </MainContainer>
    </MainWrapper>
  );
}
