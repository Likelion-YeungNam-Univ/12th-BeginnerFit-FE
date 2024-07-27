import {
  MainWrapper,
  MainContainer,
  MainContent,
  MainH2,
  MainH3,
} from "../styles/GlobalStyle";
import BackHeader from "../layouts/BackHeader";
import { Input } from "../components/FriendList/Input";
import { UserList } from "../components/FriendList/UserList";
import { useNavigate } from "react-router-dom";
import { useFriendNumStore } from "../store/useFriendSearchStore";

export default function FriendList() {
  const nav = useNavigate();

  // 친구 숫자 받아오기
  const { num } = useFriendNumStore();

  // 친구 추가 버튼 눌렀을 때 친구 추가 화면으로 이동하는 함수
  const handlePlusButton = () => {
    nav("/addFriend");
  };

  return (
    <MainWrapper>
      <MainContainer>
        <MainContent>
          <BackHeader padding={0} plus={true} onClick={handlePlusButton} />
          <MainH2 style={{ marginBottom: "40px" }}>
            {num}명의
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
