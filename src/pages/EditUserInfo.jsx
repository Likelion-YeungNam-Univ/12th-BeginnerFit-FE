import styled from "styled-components";
import Header2 from "../components/Community/Header2";
import { responsiveSize } from "../utils/Mediaquery";
import { RowContainer, Wrapper } from "../styles/GlobalStyle";
import SetCategory from "../components/MyPage/SetCategory";
import { useState } from "react";

export default function EditUserInfo() {
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
  //폼 관리상태
  const [form, setForm] = useState({
    height: 0,
    weight: 0,
    targetWeight: 0,
    date: "",
    targetDate: "",
    exerciseTime: 0,
    categories: {},
  });

  //입력값 관리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //폼 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  //setCategiry 컴포넌트에서 선택된 카테고리가져오기
  const handleCategorySubmit = (selectedCategories) => {
    setForm((prev) => ({ ...prev, categories: selectedCategories }));
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <Header2 isDrop={false} />
        <RootContainer style={{ padding: "20px" }}>
          <H1>
            사용자 정보를
            <br />
            입력하세요
          </H1>
          <TextInputContainer>
            <P>키</P>
            <SubContainer>
              <Input
                type="number"
                onInput={onInput}
                name="height"
                value={form.height}
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
                  value={form.weight}
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
                  value={form.targetWeight}
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
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleInputChange}
                ></Input>
              </SubContainer>
            </TextInputContainer>
            <TextInputContainer>
              <P hiddenText>x</P>
              <SubContainer>
                <Input
                  type="date"
                  name="targetDate"
                  value={form.targetDate}
                  onChange={handleInputChange}
                ></Input>
              </SubContainer>
            </TextInputContainer>
          </RowContainer>
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
        </RootContainer>
        <Div>
          <SubmitButton type="submit">수정하기</SubmitButton>
        </Div>
      </form>
    </Wrapper>
  );
}

//=============================================
const H1 = styled.h1`
  @media (max-width: 480px) {
    font-size: ${responsiveSize("24")};
  }
`;
const P = styled.p`
  padding-left: 10px;
  font-size: ${responsiveSize("20")};
  margin-bottom: ${responsiveSize(10)};

  //글씨 채우기용(화면 상에서는 안보이도록 )
  color: ${({ hiddenText }) => (hiddenText ? "transparent" : "black")};
  @media (max-width: 480px) {
    font-size: ${responsiveSize("15")};
  }
`;
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
  height: ${responsiveSize(40)};
  padding: ${responsiveSize("10")};
  font-size: ${responsiveSize("20")};
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
const RootContainer = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: start;
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
`;
const SubmitButton = styled.button`
  margin-top: ${responsiveSize(30)};
  height: ${responsiveSize(77)};
  font-size: ${responsiveSize(40)};
  width: ${responsiveSize(550)};
  margin-bottom: ${responsiveSize(40)};
  border-radius: ${responsiveSize(12)};
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.purple};
  border: none;
  cursor: pointer;

  @media (max-width: 600px) {
    font-size: ${responsiveSize(20)};
    width: min(${responsiveSize(280)});
    height: ${responsiveSize(50)};
  }
`;
