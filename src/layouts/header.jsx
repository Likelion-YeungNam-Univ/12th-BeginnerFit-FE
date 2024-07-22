import React from "react";
import styled from "styled-components";
import DropDown from "../components/Community/DropDown";
import { FaRegBell } from "react-icons/fa";
import logo from "../images/logo.png";
import { responsiveSize } from "../utils/Mediaquery";
import { TbUsers } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const Header = ({ type, size }) => {
  const nav = useNavigate();

  // 로고 클릭했을 때 main화면으로 이동
  const handleLogoClick = () => {
    nav("/main");
  };

  return (
    <RowContainer>
      <ImgWrap onClick={handleLogoClick}>
        <HeaderImg src={logo} />
      </ImgWrap>
      {type === "option" ? <DropDown /> : null}
      {type === "alarm" ? (
        <IconWrap>
          <FaRegBell size={responsiveSize(size)} cursor={"pointer"} />
        </IconWrap>
      ) : null}
      {type === "people" ? (
        <TbUsers size={responsiveSize(size)} cursor={"pointer"} />
      ) : null}
    </RowContainer>
  );
};

const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

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

const IconWrap = styled.div`
  background-color: inherit;
  border-radius: 50%;
  transition: all 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray01};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.gray02};
  }
  padding: 5px;
`;
