import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home/home";
import Login from "./pages/login";
import ForgetID from "./pages/ForgetID";
import ForgetPW from "./pages/ForgetPW";
import SignUp from "./pages/SignUp";
import Community from "./pages/Community";
import DetailBoard from "./pages/DetailBoard";
import Main from "./pages/main";
import EditUserInfo from "./pages/EditUserInfo";
import PlayList from "./pages/PlayList";
import MyPage from "./pages/MyPage";
import WritePost from "./pages/WritePost";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
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
      </Routes>
    </>
  );
}

export default App;
