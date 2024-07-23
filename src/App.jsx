import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home/home";
import Login from "./pages/login";
import ForgetID from "./pages/ForgetID";
import ForgetPW from "./pages/ForgetPW";
import SignUp from "./pages/SignUp";
import Community from "./pages/Community";
import DetailBoard from "./pages/DetailBoard";
import Main from "./pages/main";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/ForgetID" element={<ForgetID/>}></Route>
        <Route path="/ForgetPW" element={<ForgetPW/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/community" element={<Community />}></Route>
        <Route path="/community/posts" element={<DetailBoard />}></Route>
        <Route path="/posts" element={<Community />}></Route>
        <Route path="/posts/:idx" element={<DetailBoard />}></Route>
        <Route path="/main" element={<Main />}></Route>
      </Routes>
    </>
  );
}

export default App;
