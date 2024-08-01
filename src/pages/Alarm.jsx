import {
  MainContainer,
  MainContent,
  MainWrapper,
  MainH2,
} from "../styles/GlobalStyle";
import BackHeader from "../layouts/BackHeader";
import { AlarmList } from "../components/Alarm/AlarmList";

export default function Alaram() {
  return (
    <MainWrapper>
      <MainContainer>
        <MainContent>
          <BackHeader option={false} padding={"0"} />
          <MainH2>
            5개의
            <br />
            안읽은 알림이 있어요
          </MainH2>
          <AlarmList />
        </MainContent>
      </MainContainer>
    </MainWrapper>
  );
}
