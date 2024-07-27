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
import HomeTranList from "./pages/HomeTrainList";
import FriendList from "./pages/FriendList";
import AddFriend from "./pages/AddFriend";
import { ProtectedRouter } from "./components/ProtectedRouter";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/ForgetID" element={<ForgetID />}></Route>
        <Route path="/ForgetPW" element={<ForgetPW />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route
          path="/posts"
          element={
            <ProtectedRouter>
              <Community />
            </ProtectedRouter>
          }
        ></Route>
        <Route
          path="/posts/:idx"
          element={
            <ProtectedRouter>
              <DetailBoard />
            </ProtectedRouter>
          }
        ></Route>
        <Route
          path="/main"
          element={
            <ProtectedRouter>
              <Main />
            </ProtectedRouter>
          }
        ></Route>
        <Route
          path="/mypage/editinfo"
          element={
            <ProtectedRouter>
              <EditUserInfo />
            </ProtectedRouter>
          }
        ></Route>
        <Route
          path="/playlist"
          element={
            <ProtectedRouter>
              <PlayList />
            </ProtectedRouter>
          }
        ></Route>
        <Route
          path="/mypage"
          element={
            <ProtectedRouter>
              <MyPage />
            </ProtectedRouter>
          }
        ></Route>
        <Route
          path="/myHomeTrainList"
          element={
            <ProtectedRouter>
              <HomeTranList />
            </ProtectedRouter>
          }
        />
        <Route
          path="/friendList"
          element={
            <ProtectedRouter>
              <FriendList />
            </ProtectedRouter>
          }
        ></Route>
        <Route
          path="/addFriend"
          element={
            <ProtectedRouter>
              <AddFriend />
            </ProtectedRouter>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
