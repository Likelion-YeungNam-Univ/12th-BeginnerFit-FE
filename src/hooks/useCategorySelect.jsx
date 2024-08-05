import { useState, useEffect } from "react";
// {key: [빈 배열]} 이런식으로 초기화
const initialSelected = (list) => {
  const initial = {};

  // 객체 순회
  Object.keys(list).forEach((category) => {
    initial[category] = [];
  });
  return initial;
};
export const useCategorySelect = (list, onSubmit, initialCategories = null) => {
  //카테고리 선택 상태관리
  const [selectedItems, setSelectedItems] = useState(
    initialCategories || initialSelected(list)
  );

  //카테고리 선택 시 객체 생성
  const handleSelectedItems = (key, value) => {
    setSelectedItems((prev) => {
      const newSelected = { ...prev };

      //한 번 더 눌러서 취소시
      if (newSelected[key].includes(value)) {
        newSelected[key] = newSelected[key].filter((item) => item !== value);
      }
      //카테고리아이템을 담을때
      else {
        newSelected[key].push(value);
      }


      return newSelected;
    });
  };
  useEffect(() => {
    if (initialCategories) {

      setSelectedItems(initialCategories);
    }
  }, [initialCategories]);

  useEffect(() => {
    onSubmit(selectedItems);
  }, [selectedItems]);

  return { selectedItems, handleSelectedItems };
};
