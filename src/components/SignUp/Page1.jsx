import React, { useState, useEffect, useContext } from "react";
import { responsiveSize } from "../../utils/Mediaquery";
import styled, { css } from 'styled-components';
import { FormContext } from './FormContext';
import { sendAuthCode, verifyAuthCode } from '../../apis/emailVerify';

export default function Page1({swiperRef}) {
    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [pwCheck, setPwCheck] = useState('');
    const [pwCheckValid, setPwCheckValid] = useState(false);
    const [allow, setAllow] = useState(false);

    // page1,2,3 입력 데이터 받아오기 위한 전역 상태 함수
    const {formData, setFormData} = useContext(FormContext);

    const [authCode, setAuthCode] = useState('');
    const [authCodeValid, setAuthCodeValid] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    // 버튼 활성화
    useEffect(()=>{
        if(emailValid && pwValid && pwCheckValid && authCodeValid){
            setAllow(true);
            return;
        }
        setAllow(false);
    },[ emailValid, pwValid, pwCheckValid, authCodeValid ]);
    
    const handleEmail = (e) => {
        // 전역 상태 함수에 데이터 값 받기
        setFormData((prev)=>({...prev, email: e.target.value}));

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
        // 전역 상태 함수에 데이터 값 받기
        setFormData((prev)=>({...prev, password: e.target.value}));

        const regex = 
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,14}$/;
        if (regex.test(e.target.value)){
            // 정규표현식 통과 시
            setPwValid(true);
        } else{
            setPwValid(false);
        }
        // 비밀번호 칸 변경 시 버튼 활성화 에러 수정
        if (formData.password === e.target.value){
            setPwCheckValid(true);
        } else{
            setPwCheckValid(false);
        }
    }
    const handlePwCheck = (e) => {
        setPwCheck(e.target.value);
        if (formData.password === e.target.value){
            setPwCheckValid(true);
        } else{
            setPwCheckValid(false);
        }
    }

    //폼 값 확인용
    const handleFormCheck = () => {
        console.log("formData: ",formData);
    };

    const handleAuthCodeRequest = async (e) => {
        e.preventDefault();
        console.log('인증번호버튼이 클릭됨.');
        await sendAuthCode(formData.email);
        setEmailSent(true);
        alert('인증 번호가 이메일로 전송되었습니다.');
        
    };

    const handleAuthCodeCheck = async (e) => {
        e.preventDefault();
        try {
            await verifyAuthCode(formData.email, authCode);
            setAuthCodeValid(true);
            alert('인증 번호가 확인되었습니다.');
        } catch (error) {
            console.error('Error:', error);
            setAuthCodeValid(false);
            alert('인증 번호가 유효하지 않습니다. 다시 시도해주세요.');
        }
    };

    return(
        <Wrapper>
            <SignUpBox>
                <H1>
                    로그인 정보를 
                    <br/>
                    입력하세요.
                </H1>
                <SignUpForm>
                    <ItemName>이메일</ItemName>
                    <MyInput 
                        type='email'
                        placeholder="아이디를 입력하세요"
                        value={formData.email}
                        onChange={handleEmail}
                        validInput
                    ></MyInput>
                    <ValidButton
                        onClick={handleAuthCodeRequest}
                        disabled={!emailValid || emailSent}
                    >
                        인증번호 받기
                    </ValidButton>
                    <ErrorMsg>
                        {!emailValid && formData.email.length > 0 && (
                            <div>형식이 올바르지 않습니다. 다시 입력해주세요.</div>
                            )}
                    </ErrorMsg>

                    <ItemName>인증번호</ItemName>
                    <MyInput 
                        type='text'
                        maxLength={8}
                        placeholder="8자리 인증번호를 입력해주세요"
                        value={authCode}
                        onChange={(e) => setAuthCode(e.target.value)}
                        validInput
                        ></MyInput>
                    <ValidButton
                        onClick={handleAuthCodeCheck}
                        disabled={!authCode}
                    >
                        확인
                    </ValidButton>

                    <ItemName>비밀번호</ItemName>
                    <MyInput 
                        type='password'
                        placeholder="영어, 숫자, 특수문자를 포함한 8~14자리"
                        value={formData.password}
                        onChange={handlePw}
                        ></MyInput>
                    <ErrorMsg>
                        {!pwValid && formData.password.length > 0 && (
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
                        {formData.password !== pwCheck && pwCheck.length > 0 && (
                            <div>비밀번호가 일치하지 않습니다.</div>
                        )}
                    </ErrorMsg>
                </SignUpForm>
                <NextButton
                    type="button"
                    disabled={!allow}
                    onClick={() => {
                        handleFormCheck();
                        swiperRef.current.slideNext(); // 다음 페이지로 이동 (page2로)
                    }} 
                >
                    다음으로
                </NextButton>
            </SignUpBox>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    /* align-items: center; */
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.white};
    border: solid 1px ${({ theme }) => theme.colors.gray04};
`

const SignUpBox = styled.div`
    display: grid;
    justify-content: center;
    align-items: flex-start;
    width: 600px;
    margin: 0px auto;
`

const H1 = styled.h1`
  margin-top: 80px;
  @media (max-width: 480px) {
    font-size: ${responsiveSize("24")};
  }
`;

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
    &:disabled{
        cursor: not-allowed;
        background-color: #9a9a9a;
    }
`

const ErrorMsg = styled.div`
    color: red;
    font-size: small;
`

const NextButton = styled.button`
    width: 100%;
    height: ${responsiveSize(60)};
    background-color: #653eff;
    color: white;
    font-size: ${responsiveSize("20")};
    padding: 15px;
    margin-top: 50px;
    border-radius: 10px;
    border: none;
    box-sizing: border-box;
    cursor: pointer;
    &:disabled{
        cursor: not-allowed;
        background-color: #9a9a9a;
    }
`