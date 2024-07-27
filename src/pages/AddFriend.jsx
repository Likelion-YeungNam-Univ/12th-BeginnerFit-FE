// 친구 추가 화면
import {
  MainWrapper,
  MainContainer,
  MainContent,
  MainH2,
  MainH3,
} from "../styles/GlobalStyle";
import BackHeader from "../layouts/BackHeader";
import { Input } from "../components/FriendList/Input";
import { AddUserList } from "../components/FriendList/AddUserList";
export default function AddFriend() {
  return (
    <MainWrapper>
      <MainContainer>
        <MainContent>
          <BackHeader padding={0} onClick={() => {}} />
          <MainH2 style={{ marginBottom: "40px" }}>
            친구 추가할 닉네임을
            <br />
            검색해주세요
          </MainH2>
          <Input />
          <AddUserList />
        </MainContent>
      </MainContainer>
    </MainWrapper>
  );
}
