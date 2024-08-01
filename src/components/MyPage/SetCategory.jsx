import styled from "styled-components";
import { responsiveSize } from "../../utils/Mediaquery";
import { useState } from "react";
import { useCategorySelect } from "../../hooks/useCategorySelect";

export default function SetCategory({ onSubmit, isSignUp, initialCategories }) {
  // 카테고리 제목 및 아이템
  const list = {
    "운동 강도": ["저강도", "중강도", "고강도"],
    "운동 목표": [
      "심폐기능향상",
      "유연성향상",
      "기분개선",
      "체중조절",

      "체력증진",
      "재활",
      "기타",
      "코어근육강화",
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
  initialCategories;
  //카테고리 선택 훅 호출
  const { selectedItems, handleSelectedItems } = useCategorySelect(
    list,
    onSubmit,
    initialCategories
  );
  console.log('셀렉카테고리'+selectedItems);
  return (
    <Container>
      {Object.entries(list).map(([key, values]) => (
        <CategoryContainer key={key} isSignUp={isSignUp}>
          <CategoryTitle>{key}</CategoryTitle>
          <ItemContainer>
            {values.map((value) => (
              <Item
                key={value}
                $selected={selectedItems[key]?.includes(value)}
                onClick={() => handleSelectedItems(key, value)}
              >
                {value}
              </Item>
            ))}
          </ItemContainer>
        </CategoryContainer>
      ))}
    </Container>
  );
}

const Container = styled.div`
  margin-top: ${responsiveSize(35)};
  display: flex;
  flex-direction: column;
  gap: ${responsiveSize(20)};
`;

const CategoryContainer = styled.div`
  padding: ${({ isSignUp }) => (isSignUp ? "5px 0" : "20px 0")};
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
  cursor: pointer;
  white-space: nowrap;

  //선택된 카테고리 배경색 및 텍스트색깔 변경
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.white : theme.colors.gray02};

  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.purple : theme.colors.gray01};
`;
