import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home/home";
import Community from "./pages/Community";
import DetailBoard from "./pages/DetailBoard";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/community" element={<Community />}></Route>
        <Route path="/community/posts" element={<DetailBoard />}></Route>
      </Routes>
    </>
  );
}

export default App;
