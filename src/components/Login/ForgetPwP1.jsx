import React, { useState, useEffect, useContext } from "react";
import { responsiveSize } from "../../utils/Mediaquery";
import styled, {css} from 'styled-components';
import { sendAuthCode, verifyAuthCode } from '../../apis/emailVerify';

export default function ForgetPwP1({email, setEmail, swiperRef}) {
    const [emailValid, setEmailValid] = useState(false);
    const [allow, setAllow] = useState(false);


    const [authCode, setAuthCode] = useState('');
    const [authCodeValid, setAuthCodeValid] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    
    const handleAuthCodeRequest = async (e) => {
        e.preventDefault();
        console.log('인증번호버튼이 클릭됨.');
        await sendAuthCode(email);
        setEmailSent(true);
        alert('인증 번호가 이메일로 전송되었습니다.');
    };
    const handleAuthCodeCheck = async (e) => {
        e.preventDefault();
        try {
            await verifyAuthCode(email, authCode);
            setAuthCodeValid(true);
            alert('인증 번호가 확인되었습니다.');
        } catch (error) {
            console.error('Error:', error);
            setAuthCodeValid(false);
            alert('인증 번호가 유효하지 않습니다. 다시 시도해주세요.');
        }
    };

    // 버튼 활성화
    useEffect(()=>{
        if(emailValid && authCodeValid){
            setAllow(true);
            return;
        }
        setAllow(false);
    },[ emailValid, authCodeValid ]);

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

    const handleNext = () => {
        localStorage.setItem('findEmail', email); // 이메일을 로컬 스토리지에 저장
        swiperRef.current.slideNext(); // 다음 페이지로 이동 (page2로)
    };

    return(
        <Wrapper>
            <Box>
                <Container>
                    <H1>
                        계정에 등록된 정보를 
                        <br/>
                        입력해주세요
                    </H1>
                    <InputForm>
                        <ItemName>이메일</ItemName>
                        <MyInput 
                            type='email'
                            placeholder="아이디를 입력하세요"
                            value={email}
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
                            {!emailValid && email.length > 0 && (
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
                            disabled={!authCode || authCodeValid}
                        >
                            확인
                        </ValidButton>
                    </InputForm>
                </Container>
                <NextButton
                    type="button"
                    disabled={!allow}
                    onClick={handleNext} 
                >
                    다음으로
                </NextButton>
            </Box>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.white};
    border: solid 1px ${({ theme }) => theme.colors.gray04};
`

const Box = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 500px;
    height: 100%;
    margin: 0px auto;
`
const Container = styled.div`

`

const H1 = styled.h1`
  margin-top: 80px;
  @media (max-width: 480px) {
    font-size: ${responsiveSize("24")};
  }
`;

const InputForm = styled.form`
    width: 500px;
`

const ItemName = styled.div`
    margin-top: 45px;
    padding-left: 10px;
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
    margin-left: 10px;
`

const NextButton = styled.button`
    width: 100%;
    height: ${responsiveSize(60)};
    background-color: #653eff;
    color: white;
    font-size: ${responsiveSize("20")};
    
    padding: 15px;
    margin-bottom: 50px;
    border-radius: 10px;
    border: none;
    box-sizing: border-box;
    cursor: pointer;
    &:disabled{
        cursor: not-allowed;
        background-color: #9a9a9a;
    }
`