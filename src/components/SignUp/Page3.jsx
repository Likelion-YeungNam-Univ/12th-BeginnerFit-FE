
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SetCategory from "../MyPage/SetCategory";
import { responsiveSize } from "../../utils/Mediaquery";
import { useState, useEffect } from "react";

export default function Page3 () {

    //음수값 자릿수 제한
    const onInput = (e) => {
        if (e.target.value.length > 3) {
        e.target.value = 0;
        alert("3자리까지만 입력가능합니다.");
        } else if (e.target.value < 0) {
        e.target.value = 0;
        alert("음수값은 입력할 수 없습니다.");
        }
    };

    //입력값 관리
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    //폼 관리상태
    const [form, setForm] = useState({
        exerciseTime: 0,
        categories: {},
    });

    //setCategiry 컴포넌트에서 선택된 카테고리가져오기
    const handleCategorySubmit = (selectedCategories) => {
        setForm((prev) => ({ ...prev, categories: selectedCategories }));
    };

    // 버튼 활성화 & 유효성 검사
    const [allow, setAllow] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    // 폼 유효성 검사
    useEffect(() => {
        const {
        exerciseTime,
        categories,
        } = form;
        //카테고리 유효성(각 카테고리별 1개이상은 선택)
        const isCategoriesValid = Object.values(categories).some(
        (arr) => arr.length > 0
        );
        //전체 유효성
        const isValid =
        exerciseTime>0 &&
        isCategoriesValid;
        setIsFormValid(isValid);
        
    }, [form, isFormValid]);
    // 버튼 활성화
    useEffect(()=>{
        if(isFormValid){
            setAllow(true);
            return;
        }
        setAllow(false);
    },[ isFormValid ]);


    
    // 회원가입 성공 시 메인 화면으로 이동
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        if (setAllow){
            alert('회원가입 성공!');
            navigate("/main");
        }
    }
    return(
        <Wrapper>
            <Box>
                <H1>
                    하루 운동 시간과
                    <br/>
                    운동 목표를 설정해주세요.
                </H1>
                <Form onSubmit={handleSubmit}>
                    <TextInputContainer>
                        <P>운동시간</P>
                        <SubContainer>
                            <Input
                                type="number"
                                onInput={onInput}
                                name="exerciseTime"
                                value={form.exerciseTime}
                                onChange={handleInputChange}
                            ></Input>
                            <P>시간</P>
                        </SubContainer>
                    </TextInputContainer>
                    <SetCategory onSubmit={handleCategorySubmit}></SetCategory>
                </Form>
                <SignUpButton 
                    type="submit" 
                    disabled={!allow}
                >
                    시작하기
                </SignUpButton>
            </Box>
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
const Box = styled.form`
    display: grid;
    justify-content: center;
    align-items: flex-start;
    width: 600px;
    margin: 0px auto;
`
const Form = styled.form`
    width: 500px;
    border-radius: 15px;
`
const H1 = styled.h1`
  @media (max-width: 480px) {
    font-size: ${responsiveSize("24")};
  }
`
const P = styled.p`
  margin-top: 15px;
  padding-left: 10px;
  /* font-size: ${responsiveSize("20")}; */
  margin-bottom: ${responsiveSize(9)};
`
const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-right: ${responsiveSize(30)};
  @media (max-width: 480px) {
    margin-right: ${responsiveSize(16)};
  }
`
const Input = styled.input`
  width: ${responsiveSize(120)};
  padding: 13px;
  font-size: ${responsiveSize("16")};
  border: none;
  font-weight: 400;
  border-radius: ${responsiveSize("12")};
  background-color: ${({ theme }) => theme.colors.gray01};
  @media (max-width: 480px) {
    width: ${responsiveSize(90)};
    height: ${responsiveSize(30)};
    font-size: ${responsiveSize(15)};
  }
`
const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const SignUpButton = styled.button`
    align-items: flex-end;
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