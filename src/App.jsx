import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home/home";
import Login from "./pages/login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </>
  );
}

export default App;
