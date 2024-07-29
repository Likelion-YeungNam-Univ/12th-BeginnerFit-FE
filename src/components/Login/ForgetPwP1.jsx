import React, { useState, useEffect, useContext } from "react";
import { responsiveSize } from "../../utils/Mediaquery";
import styled, {css} from 'styled-components';

export default function ForgetPwP1({swiperRef}) {
    const [email, setEmail] = useState('test@gmail.');
    const [emailValid, setEmailValid] = useState(false);
    const [verifyNum, setVerifyNum] = useState('123123');
    const [verifyNumValid, setVerifyNumValid] = useState(false);
    const [allow, setAllow] = useState(false);

    // 버튼 활성화 (이메일 인증 과정도 거쳐야함)
    useEffect(()=>{
        if(emailValid && verifyNumValid){
            setAllow(true);
            return;
        }
        setAllow(false);
    },[ emailValid, verifyNumValid ]);

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
    const handleVerifyNum = (e) => {
        setVerifyNum(e.target.value);
        if (e.target.value.length == 6){
            setVerifyNumValid(true);
        }else{
            setVerifyNumValid(false);
        }
    }

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
                            value={verifyNum}
                            onChange={handleVerifyNum}
                            validInput
                            ></MyInput>
                        <ValidButton>확인</ValidButton>
                    </InputForm>
                </Container>
                <NextButton
                    type="button"
                    disabled={!allow}
                    onClick={() => {
                        swiperRef.current.slideNext(); // 다음 페이지로 이동 (page2로)
                    }} 
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