import styled from "styled-components";
import logo from "../../images/logo.png";
import DropDown from "./DropDown";

export default function Header() {
  return (
    <RowContainer>
      <HeaderImg src={logo} />
      <DropDown />
    </RowContainer>
  );
}

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderImg = styled.img`
  height: 35px;
  width: auto;
  max-width: 600px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
