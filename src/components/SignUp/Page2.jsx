import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { responsiveSize } from "../../utils/Mediaquery";
import { RowContainer } from "../../styles/GlobalStyle";
import { FormContext } from './FormContext';
import AlarmDialog from "../../styles/AlarmDialog";

export default function Page2 ({swiperRef}) {
    const [nameValid, setNameValid] = useState('')
    const [allow, setAllow] = useState(false);

    // page1,2,3 입력 데이터 받아오기 위한 전역 상태 함수
    const {formData, setFormData} = useContext(FormContext);
    
    const handleName = (e) => {
        // 전역 상태 함수에 데이터 값 받기
        setFormData((prev)=>({...prev, name: e.target.value}));

        const regex = 
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{3,10}$/;
        if (regex.test(e.target.value)){
            // 정규표현식 통과 시
            setNameValid(true);
        } else{
            setNameValid(false);
        }
    }

    //음수값 자릿수 제한
    const onInput = (e) => {
        if (e.target.value.length > 3) {
        e.target.value = 0;
        AlarmDialog({
            title: "3자리까지만 입력가능합니다.",
            type: "warning",
        });
        } else if (e.target.value < 0) {
        e.target.value = 0;
        AlarmDialog({
            title: "음수값은 입력할 수 없습니다.",
            type: "warning",
        });
        }
    };

    //입력값 관리
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // 전역 상태 함수에 데이터 값 받기
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };


    //입력창 모두 입력하면 버튼 활성화
    //폼 유효성검사
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const {
        height,
        weight,
        targetWeight,
        date,
        targetDate,
        } = formData;
        //전체 유효성
        const isValid =
        height > 0 &&
        weight > 0 &&
        targetWeight > 0 &&
        date &&
        targetDate;
        setIsFormValid(isValid);
    }, [formData]);

    // 버튼 활성화
    useEffect(()=>{
        if(nameValid && isFormValid){
            setAllow(true);
            return;
        }
        setAllow(false);
    },[ nameValid, isFormValid ]);


    return(
        <Wrapper>
            <Box>
                <H1>
                    사용자 정보를 
                    <br/>
                    입력하세요.
                </H1>
                <Form>
                    <ItemName>닉네임</ItemName>
                    <MyInput 
                        type='text'
                        maxLength={10}
                        placeholder="영어, 숫자, 특수기호를 포함한 3~10자리"
                        value={formData.name}
                        onChange={handleName}
                    ></MyInput>
                    {/* 에러 메시지 필요 */}
                    <ErrorMsg>
                        {!nameValid && formData.name.length > 0 && (
                            <div>영문, 숫자, 특수문자 포함 3자~10자 입력해주세요.</div>
                        )}
                    </ErrorMsg>
                    <TextInputContainer>
                        <P>키</P>
                        <SubContainer>
                        <Input
                            type="number"
                            onInput={onInput}
                            name="height"
                            value={formData.height}
                            onChange={handleInputChange}
                        ></Input>
                        <P>cm</P>
                        </SubContainer>
                    </TextInputContainer>
                    <RowContainer>
                        <TextInputContainer>
                            <P>몸무게</P>
                            <SubContainer>
                                <Input
                                type="number"
                                onInput={onInput}
                                name="weight"
                                value={formData.weight}
                                onChange={handleInputChange}
                                ></Input>
                                <P>kg</P>
                            </SubContainer>
                        </TextInputContainer>
                        <TextInputContainer>
                            <P>목표 몸무게</P>
                            <SubContainer>
                                <Input
                                type="number"
                                onInput={onInput}
                                name="targetWeight"
                                value={formData.targetWeight}
                                onChange={handleInputChange}
                                ></Input>
                                <P>kg</P>
                            </SubContainer>
                        </TextInputContainer>
                    </RowContainer>
                    <RowContainer>
                        <TextInputContainer>
                            <P>기간</P>
                            <SubContainer>
                                <Input
                                style={{ fontSize: "12px" }}
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                ></Input>
                            </SubContainer>
                        </TextInputContainer>
                        <TextInputContainer>
                            <P hiddenText>x</P>
                            <SubContainer>
                                <Input
                                style={{ fontSize: "12px" }}
                                type="date"
                                name="targetDate"
                                value={formData.targetDate}
                                onChange={handleInputChange}
                                ></Input>
                            </SubContainer>
                        </TextInputContainer>
                    </RowContainer>
                </Form>
                <NextButton 
                    type="button"
                    disabled={!allow}
                    onClick={() => {
                       
                        swiperRef.current.slideNext(); // 다음 페이지로 이동 (page3으로)
                    }}
                >
                    다음으로
                </NextButton>
            </Box>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
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
  margin-top: 80px;
  @media (max-width: 480px) {
    font-size: ${responsiveSize("24")};
  }
`;
const ItemName = styled.div`
    margin-top: 15px;
    `
const P = styled.p`
  margin-top: 15px;
  padding-left: 10px;
  margin-bottom: ${responsiveSize(9)};

  //글씨 채우기용(화면 상에서는 안보이도록 )
  color: ${({ hiddenText }) => (hiddenText ? "transparent" : "black")};
  @media (max-width: 480px) {
    font-size: ${responsiveSize("15")};
  }
`;

const MyInput = styled.input`
    width: 100%;
    font-weight: 400;
    border-radius: ${responsiveSize("12")};
    background-color: ${({ theme }) => theme.colors.gray01};
    padding: 15px;
    margin: 5px 0px;
    border: none;
    box-sizing: border-box;
`
const ErrorMsg = styled.div`
    color: red;
    font-size: small;
`

const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-right: ${responsiveSize(30)};
  @media (max-width: 480px) {
    margin-right: ${responsiveSize(16)};
  }
`;
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
`;
const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;


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