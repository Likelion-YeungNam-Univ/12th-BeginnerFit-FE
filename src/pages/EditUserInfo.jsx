import styled from "styled-components";
import Header2 from "../components/Community/Header2";
import { responsiveSize } from "../utils/Mediaquery";
import { RowContainer, Wrapper } from "../styles/GlobalStyle";
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

  return (
    <Wrapper>
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
            <Input type="number" onInput={onInput}></Input>
            <P>cm</P>
          </SubContainer>
        </TextInputContainer>
        <RowContainer>
          <TextInputContainer>
            <P>몸무게</P>
            <SubContainer>
              <Input type="number" onInput={onInput}></Input>
              <P>kg</P>
            </SubContainer>
          </TextInputContainer>
          <TextInputContainer>
            <P>목표 몸무게</P>
            <SubContainer>
              <Input type="number" onInput={onInput}></Input>
              <P>kg</P>
            </SubContainer>
          </TextInputContainer>
        </RowContainer>
        <RowContainer>
          <TextInputContainer>
            <P>기간</P>
            <SubContainer>
              <Input type="date"></Input>
              
            </SubContainer>
          </TextInputContainer>
          <TextInputContainer>
            <P hiddenText>x</P>
            <SubContainer>
              <Input type="date"></Input>
            </SubContainer>
          </TextInputContainer>
        </RowContainer>
        <TextInputContainer>
          <P>운동시간</P>
          <SubContainer>
            <Input type="number" onInput={onInput}></Input>
            <P>시간</P>
          </SubContainer>
        </TextInputContainer>
      </RootContainer>
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
