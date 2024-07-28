import BackHeader from "../layouts/BackHeader";
import {
  MainContainer,
  MainWrapper,
  MainContent,
  MainH2,
} from "../styles/GlobalStyle";
import { ChallengeList } from "../components/MyChallengeList/ChallengeList";
import BottomNav from "../components/BottomNav";

export default function MyChallengeList() {
  return (
    <MainWrapper>
      <MainContainer>
        <MainContent>
          <BackHeader padding={0} />
          <MainH2>
            7월 한달동안
            <br /> 23개의 챌린지를 성공했어요!
          </MainH2>
          <ChallengeList />
        </MainContent>
        <BottomNav />
      </MainContainer>
    </MainWrapper>
  );
}
