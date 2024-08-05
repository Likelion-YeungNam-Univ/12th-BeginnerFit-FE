import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../apis/axios";
import { useUserInfo } from "../store/useUserInfo";
import AlarmDialog from "../styles/AlarmDialog";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //유저정보를 로컬에 담아 사용하기 위해 Zustand에 유저정보를 저장
  const setUser = useUserInfo((state) => state.setUser);
  // 로그인 화면으로 오면 토큰들 삭제 -> 로그아웃
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("login");

  const navigate = useNavigate();
  const navigateToForgetID = () => {
    navigate("/ForgetID");
  };
  const navigateToForgetPW = () => {
    navigate("/ForgetPW");
  };
  const navigateToSignUp = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    try {
      const res = await api.post("/auth/sign-in", data);

      // 토큰 저장
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("login", true);
      //로그인 성공 시 넘겨받은 데이터의 회원번호와 이메일 저장
      setUser({
        email: data.email,
        userId: res.data.userId,
      });
      //로그인 성공 시 홈화면으로 이동
      navigate("/main");
    } catch (error) {
      console.error("로그인 실패:", error);
      if (error.response) {
        AlarmDialog({
          title: "로그인 실패",
          content: error.response.data.message || "서버 에러",
          type: "error",
        });
      } else {
        AlarmDialog({
          title: "로그인 실패",
          content: error.message,
          type: "error"
        });
      }
    }
  };

  return (
    <Wrapper>
      <LoginBox>
        <Logo></Logo>
        <LoginForm onSubmit={handleSubmit}>
          <div>아이디</div>
          <MyInput
            type="email"
            placeholder="아이디를 입력하세요"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></MyInput>
          <div>비밀번호</div>
          <MyInput
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></MyInput>
          <LoginButton type="submit">로그인</LoginButton>
        </LoginForm>
        <LoginEtc>
          <EtcButton onClick={navigateToForgetID}>아이디 찾기</EtcButton>
          <span>|</span>
          <EtcButton onClick={navigateToForgetPW}>비밀번호 찾기</EtcButton>
          <span>|</span>
          <EtcButton onClick={navigateToSignUp}>회원가입</EtcButton>
        </LoginEtc>
      </LoginBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  border: solid 1px ${({ theme }) => theme.colors.gray04};
`;

const LoginBox = styled.div`
  display: grid;
  justify-content: center;

  width: 600px;
  margin: 0px auto 150px auto;
`;

const Logo = styled.img.attrs({
  src: "/src/images/logo.png",
  alt: "BeginnerFit",
})`
  margin: 0px auto 80px auto;
  width: 45%;
`;

const LoginForm = styled.form`
  width: 500px;
  border-radius: 15px;
`;

const MyInput = styled.input`
  width: 100%;
  background-color: #f5f5f5;
  padding: 15px;
  margin: 5px 0px 15px 0px;
  border-radius: 10px;
  border: none;
  box-sizing: border-box;
  margin-bottom: 15px;
`;

const LoginButton = styled.button`
  width: 100%;
  background-color: #653eff;
  color: white;
  font-size: large;
  padding: 15px;
  margin: 30px 0px;
  border-radius: 10px;
  border: none;
  box-sizing: border-box;
`;
const LoginEtc = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  color: #9a9a9a;
`;

const EtcButton = styled.button`
  background-color: transparent;
  color: #9a9a9a;
  border: none;
  outline: none;
  margin: 0px 10px;
  cursor: pointer;
`;

export default Login;
