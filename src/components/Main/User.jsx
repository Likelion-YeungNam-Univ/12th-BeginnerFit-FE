import styled from "styled-components";
import { responsiveSize } from "../../utils/Mediaquery";

export default function User({ nickname, rank }) {
  return (
    <Container>
      <Number>{rank}</Number>
      <NickName>{nickname}</NickName>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 10px 10px 10px;
  border-radius: ${responsiveSize("31")};
  background-color: ${({ theme }) => theme.colors.gray01};
  margin-bottom: 10px;
`;

const Number = styled.div`
  border-radius: 50%;
  width: ${responsiveSize("30")};
  height: ${responsiveSize("30")};
  background-color: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${responsiveSize("10")};
`;

const NickName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
