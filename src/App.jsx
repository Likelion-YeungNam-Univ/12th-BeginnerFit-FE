import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home/home";
import Community from "./pages/Community";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/community" element={<Community/>}></Route>

      </Routes>
    </>
  );
}

export default App;
