import { postStore } from "../../store/postStore";
import styled from "styled-components";
import { responsiveSize } from "../../utils/Mediaquery";
export default function CategorySelect() {
  const selectList = ["자유게시판", "정보공유"];
  //Zustand store에서 상태값 가져오기
  //리렌더링 방지
  const setSelectCategory=postStore((state)=>state.setSelectCategory);
  const selectCategory=postStore((state)=>state.selectCategory);
  
  return (
    <Div>
      {selectList.map((category, index) => (
        <Button
          key={index}
          type="button"
          onClick={() => setSelectCategory(category)}
          $selected={selectCategory === category}
        >
          {category}
        </Button>
      ))}
    </Div>
  );
}
const Div = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const Button = styled.button`
  width: fit-content;
  padding: 0 1rem;
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.white : theme.colors.gray02};
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.black : theme.colors.gray01};
  border: none;
  border-radius: ${responsiveSize("18")};
  height: ${responsiveSize("28")};
  font-size: ${responsiveSize("14")};
  cursor: pointer;
`;
