import styled from "styled-components";
import { responsiveSize } from "../../utils/Mediaquery.jsx";

export default function CommunityButtons({ buttonList }) {
  return (
    <BtnContainer>
      {buttonList.map((item, index) => (
        <Button key={index}>{item}</Button>
      ))}
    </BtnContainer>
  );
}

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Button = styled.button`
  width: fit-content;
  padding: 0 1rem;
  color: ${({ theme }) => theme.colors.gray02};
  background-color: ${({ theme }) => theme.colors.gray01};
  border: none;
  border-radius: ${responsiveSize("18")};
  height: ${responsiveSize("28")};
  font-size: ${responsiveSize("14")};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }
`;