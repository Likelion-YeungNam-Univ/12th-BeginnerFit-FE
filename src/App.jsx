import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home/home";
import { Main } from "./pages/main";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/main" element={<Main />}></Route>
      </Routes>
    </>
  );
}

export default App;
