import styled from "styled-components";
import { responsiveSize } from "../../utils/Mediaquery";

export default function SetCategory() {
  // 카테고리 제목 및 아이템
  const list = {
    "운동 강도": ["저강도", "중강도", "고강도"],
    "운동 목표": [
      "심폐기능 향상",
      "유연성 향상",
      "기분개선",
      "체중 조절",

      "체력 증진",
      "재활",
      "기타",
      "코어근육 강화",
    ],
    "고민 부위": [
      "팔뚝",
      "배",
      "가슴",
      "어깨",
      "허벅지",
      "종아리",
      "엉덩이",
      "등",
    ],
  };

  return (
    <Container>
      {Object.entries(list).map(([key, values]) => (
        <CategoryContainer key={key}>
          <CategoryTitle>{key}</CategoryTitle>
          <ItemContainer>
            {values.map((value, index) => (
              <Item key={index}>{value}</Item>
            ))}
          </ItemContainer>
        </CategoryContainer>
      ))}
      <Div>
        <SubmitButton>수정하기</SubmitButton>
      </Div>
    </Container>
  );
}
const Div=styled.div`
    display: flex;
    justify-content: center;
`
const Container = styled.div`
  margin-top: ${responsiveSize(35)};
  display: flex;
  flex-direction: column;
  gap: ${responsiveSize(20)};
`;

const CategoryContainer = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: ${responsiveSize(10)};
`;

const CategoryTitle = styled.div`
  font-weight: 600;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${responsiveSize(10)};
`;

const Item = styled.li`
  list-style-type: none;
  border-radius: ${responsiveSize(20)};
  height: ${responsiveSize(30)};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${responsiveSize(15)};
  color: ${({ theme }) => theme.colors.gray02};
  background-color: ${({ theme }) => theme.colors.gray01};
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.purple};
  }
`;

const SubmitButton = styled.button`
  margin-top: ${responsiveSize(30)};
  height: ${responsiveSize(77)};
  font-size: ${responsiveSize(40)};
  width: ${responsiveSize(550)};
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
