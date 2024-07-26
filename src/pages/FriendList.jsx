import {
  MainWrapper,
  MainContainer,
  MainContent,
  MainH2,
  MainH3,
} from "../styles/GlobalStyle";
import BackHeader from "../layouts/BackHeader";
import { Input } from "../components/FriendList/Input";
import { User } from "../components/FriendList/User";
import { UserList } from "../components/FriendList/UserList";
export default function FriendList() {
  return (
    <MainWrapper>
      <MainContainer>
        <MainContent>
          <BackHeader padding={0} plus={true} />
          <MainH2 style={{ marginBottom: "40px" }}>
            {567}명의
            <br />
            친구가 있어요
          </MainH2>
          <Input />
          <UserList />
        </MainContent>
      </MainContainer>
    </MainWrapper>
  );
}
