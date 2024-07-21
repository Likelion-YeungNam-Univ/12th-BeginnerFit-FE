import styled from "styled-components";
import Header2 from "../components/Community/Header2";

export default function DetailBoard() {
  //뒤로 가기 버튼

  return (
    <Wrapper>
      <MainContent>
        <Header2 />
      </MainContent>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  flex-direction: column;
  align-items: center;
`;
const MainContent = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: solid 1px ${({ theme }) => theme.colors.gray04};
  padding: 20px;
`;
