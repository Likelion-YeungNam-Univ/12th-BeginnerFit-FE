import React from "react";
import { responsiveSize } from "../../utils/Mediaquery";
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";

export default function ForgetPwP2() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [pwValid, setPwValid] = useState(false);
    const [pwCheck, setPwCheck] = useState('');
    const [pwCheckValid, setPwCheckValid] = useState(false);
    const [allow, setAllow] = useState(false);

    // 버튼 활성화
    useEffect(()=>{
        if(pwValid && pwCheckValid){
            setAllow(true);
            return;
        }
        setAllow(false);
    },[ pwValid, pwCheckValid ]);

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
        // 비밀번호 칸 변경 시 버튼 활성화 에러 수정
        if (password === e.target.value){
            setPwCheckValid(true);
        } else{
            setPwCheckValid(false);
        }
    }
    const handlePwCheck = (e) => {
        setPwCheck(e.target.value);
        if (password === e.target.value){
            setPwCheckValid(true);
        } else{
            setPwCheckValid(false);
        }
    }

    return(
        <Wrapper>
            <Box>
                <Container>
                    <H1>
                        재설정할 비밀번호를 
                        <br/>
                        입력해주세요
                    </H1>
                    <InputForm>
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
                    </InputForm>
                </Container>
                <ConfirmButton
                    type="button"
                    disabled={!allow}
                    onClick={() => {(navigate('/'))
                    }} 
                >
                    확인하기
                </ConfirmButton>
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
`
const ErrorMsg = styled.div`
    color: red;
    font-size: small;
    margin-left: 10px;
`

const ConfirmButton = styled.button`
    width: 100%;
    height: ${responsiveSize(60)};
    background-color: #171717;
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