import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home/home";
import Community from "./pages/Community";
import DetailBoard from "./pages/DetailBoard";
import Main from "./pages/main";
import EditUserInfo from "./pages/EditUserInfo";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/posts" element={<Community />}></Route>
        <Route path="/posts/:idx" element={<DetailBoard />}></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/mypage/editinfo" element={<EditUserInfo></EditUserInfo>}></Route>
      </Routes>
    </>
  );
}

export default App;
