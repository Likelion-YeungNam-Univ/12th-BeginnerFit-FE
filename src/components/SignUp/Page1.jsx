import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled, { css } from 'styled-components';

export default function Page1() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [pwCheck, setPwCheck] = useState('');
    const [pwCheckValid, setPwCheckValid] = useState(false);
    const [allow, setAllow] = useState(false);

    // 버튼 활성화 (이메일 인증 과정도 거쳐야함)
    useEffect(()=>{
        if(emailValid && pwValid && pwCheckValid){
            setAllow(true);
            return;
        }
        setAllow(false);
    },[ emailValid, pwValid, pwCheckValid ]);

    //폼 제출
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };
    
    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex = 
        /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (regex.test(e.target.value)){
            // 정규표현식 통과 시
            setEmailValid(true);
        } else{
            setEmailValid(false);
        }
    }
    const handlePw = (e) => {
        setPassword(e.target.value);
        const regex = 
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,14}$/;
        if (regex.test(e.target.value)){
            // 정규표현식 통과 시
            setPwValid(true);
        } else{
            setPwValid(false);
        }
    }
    const handlePwCheck = (e) => {
        setPwCheck(e.target.value);
        if (password == e.target.value){
            setPwCheckValid(true);
        } else{
            setPwCheckValid(false);
        }
    }

    return(
        <Wrapper>
            <SignUpBox>
                <h2>
                    회원 정보를 
                    <br/>
                    입력하세요.
                </h2>
                <SignUpForm onSubmit={handleSubmit}>
                    <ItemName>이메일</ItemName>
                    <MyInput 
                        type='email'
                        placeholder="아이디를 입력하세요"
                        value={email}
                        onChange={handleEmail}
                        validInput
                    ></MyInput>
                    <ValidButton>인증번호 받기</ValidButton>
                    <ErrorMsg>
                        {!emailValid && email.length > 0 && (
                            <div>형식이 올바르지 않습니다. 다시 입력해주세요.</div>
                            )}
                    </ErrorMsg>

                    <ItemName>인증번호</ItemName>
                    <MyInput 
                        type='text'
                        maxLength={6}
                        placeholder="6자리 인증번호를 입력해주세요"
                        // value={}
                        // onChange={}
                        validInput
                        ></MyInput>
                    <ValidButton>확인</ValidButton>

                    <ItemName>비밀번호</ItemName>
                    <MyInput 
                        type='password'
                        placeholder="영어, 숫자, 특수문자를 포함한 8~14자리"
                        value={password}
                        onChange={handlePw}
                        ></MyInput>
                    <ErrorMsg>
                        {!pwValid && password.length > 0 && (
                            <div>영문, 숫자, 특수문자 포함 8자~14자 입력해주세요.</div>
                        )}
                    </ErrorMsg>
                    <ItemName>비밀번호 확인</ItemName>
                    <MyInput 
                        type='password'
                        placeholder="비밀번호 재입력"
                        value={pwCheck}
                        onChange={handlePwCheck}
                        ></MyInput>
                    <ErrorMsg>
                        {password !== pwCheck && pwCheck.length > 0 && (
                            <div>비밀번호가 일치하지 않습니다.</div>
                        )}
                    </ErrorMsg>
                    <SignUpButton type="submit" disabled={!allow} >다음으로</SignUpButton>
                </SignUpForm>
            </SignUpBox>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.white};
    border: solid 1px ${({ theme }) => theme.colors.gray04};
`

const SignUpBox = styled.div`
    display: grid;
    justify-content: center;
    width: 600px;
    margin: 0px auto 150px auto;
`


const SignUpForm = styled.form`
    width: 500px;
    border-radius: 15px;
`

const ItemName = styled.div`
    margin-top: 15px;
`

const MyInput = styled.input`
    width: 100%;
    background-color: #f5f5f5;
    padding: 15px;
    margin: 5px 0px;
    border-radius: 10px;
    border: none;
    box-sizing: border-box;

    ${(props) =>
    props.validInput &&
    css`
      width: 74%;
      `}
`

const ValidButton = styled.button`
    width: 24%;
    background-color: #000000;
    color: white;
    padding: 15px;
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    box-sizing: border-box;
`

const ErrorMsg = styled.div`
    color: red;
    font-size: small;
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
    cursor: pointer;
    &:disabled{
        cursor: not-allowed;
        background-color: #9a9a9a;
    }
`