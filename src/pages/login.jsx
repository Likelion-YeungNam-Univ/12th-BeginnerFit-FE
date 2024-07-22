import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();
    const navigateToForgetID = () => {
        navigate("/ForgetID");
    }
    const navigateToForgetPW = () => {
        navigate("/ForgetPW");
    }
    const navigateToSignUp = () => {
        navigate("/signup");
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log('email: ', email)
        console.log('password: ', password)
    }

    return(
        <Wrapper>
            <LoginBox>
                <Logo></Logo>
                <LoginForm onSubmit={handleSubmit}>
                    <div>아이디</div>
                    <MyInput 
                        type='text'
                        placeholder="아이디를 입력하세요"
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                    ></MyInput>
                    <div>비밀번호</div>
                    <MyInput 
                        type='password'
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
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
`

const LoginBox = styled.div`
    display: grid;
    justify-content: center;
    
    width: 600px;
    margin: 0px auto 150px auto;
`

const Logo = styled.img.attrs({
    src: "/src/BeginnerFitLogo.png",
    alt: "BeginnerFit"
})`
    margin: 0px auto 50px auto;
    width: 40%;
`

const LoginForm = styled.form`
    width: 100%;
    border-radius: 15px;
`

const MyInput = styled.input`
    width: 100%;
    background-color: #f5f5f5;
    padding: 15px;
    margin: 5px 0px 15px 0px;
    border-radius: 10px;
    border: none;
    box-sizing: border-box;
    margin-bottom: 15px;
`

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
`
const LoginEtc = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    color: #5c5c5c;

`

const EtcButton = styled.button`
    background-color: transparent;
    color: #5c5c5c;
    border: none;
    outline: none;
    margin: 0px 10px;
`

export default Login;