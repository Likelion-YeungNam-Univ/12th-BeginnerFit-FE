import React, { useState, useEffect, useContext } from "react";
import { responsiveSize } from "../../utils/Mediaquery";
import styled from 'styled-components';

export default function ForgetIdP1({name, setName, swiperRef}) {
    const [value, setValue] = useState('');
    const [allow, setAllow] = useState(false);

    // 버튼 활성화
    useEffect(()=>{
        if( value.length >= 3 ){
            setAllow(true);
            return;
        }
        setAllow(false);
    },[ value ]);

    const handleNext = () => {
        if (allow) {
            setName(value);
            swiperRef.current.slideNext(); // 다음 페이지로 이동 (page2로)
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
                        <ItemName>닉네임</ItemName>
                        <MyInput 
                            type='text'
                            maxLength={10}
                            placeholder="닉네임"
                            value={value}
                            onChange={(e)=>setValue(e.target.value)}
                        ></MyInput>
                        <HelpMsg>영어, 숫자, 특수기호를 포함한 3~10자리</HelpMsg>
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
`

const HelpMsg = styled.div`
    color: #9a9a9a;
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