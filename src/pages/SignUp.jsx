import React from "react";
import { useState } from "react";
import styled from 'styled-components';

function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
        console.log(name);
    }

    return(
        <Wrapper>
            <SignUpBox>
                <Logo></Logo>
                <SignUpForm onSubmit={handleSubmit}>
                    <div>아이디</div>
                    <MyInput 
                        type='email'
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
                    <div>닉네임</div>
                    <MyInput 
                        type='text'
                        placeholder="이름을 입력하세요"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                    ></MyInput>
                    <SignUpButton type="submit">회원가입</SignUpButton>
                </SignUpForm>
            </SignUpBox>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100vh;
`

const SignUpBox = styled.div`
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

const SignUpForm = styled.form`
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

const SignUpButton = styled.button`
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

export default SignUp;