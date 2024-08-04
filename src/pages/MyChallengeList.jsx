import BackHeader from "../layouts/BackHeader";
import {
  MainContainer,
  MainWrapper,
  MainContent,
  MainH2,
} from "../styles/GlobalStyle";
import { ChallengeList } from "../components/MyChallengeList/ChallengeList";
import BottomNav from "../components/BottomNav";
import { useChallenge } from "../store/useChallenge";

export default function MyChallengeList() {
  const month = new Date().getMonth() + 1;

  const { count } = useChallenge();
  return (
    <MainWrapper>
      <MainContainer>
        <MainContent>
          <BackHeader padding={0} />
          <MainH2>
            {month}월 한달동안
            <br /> {count}개의 챌린지를 성공했어요!
          </MainH2>
          <ChallengeList />
        </MainContent>
        <BottomNav />
      </MainContainer>
    </MainWrapper>
  );
}
