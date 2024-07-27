import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home/home";
import Login from "./pages/login";
import ForgetID from "./pages/ForgetID";
import ForgetPW from "./pages/ForgetPW";
import SignUp from "./pages/SignUp";
import Community from "./pages/Community";
import DetailBoard from "./pages/DetailBoard";
import Main from "./pages/Main";
import EditUserInfo from "./pages/EditUserInfo";
import PlayList from "./pages/PlayList";
import MyPage from "./pages/MyPage";
import WritePost from "./pages/WritePost";
import FriendList from "./pages/FriendList";
import AddFriend from "./pages/AddFriend";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/ForgetID" element={<ForgetID />}></Route>
        <Route path="/ForgetPW" element={<ForgetPW />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/posts" element={<Community />}></Route>
        <Route path="/posts/:idx" element={<DetailBoard />}></Route>
        <Route path="/posts/write" element={<WritePost />}></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route
          path="/mypage/editinfo"
          element={<EditUserInfo></EditUserInfo>}
        ></Route>
        <Route path="/playlist" element={<PlayList />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/friendList" element={<FriendList />}></Route>
        <Route path="/addFriend" element={<AddFriend />}></Route>
      </Routes>
    </>
  );
}

export default App;
