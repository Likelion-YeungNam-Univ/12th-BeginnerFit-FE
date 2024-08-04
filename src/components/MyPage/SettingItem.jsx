import React from "react";
import { Image } from "../../styles/GlobalStyle";
import styled from "styled-components";

export const SettingItem = ({ img, text, onClick }) => {
  return (
    <ImageWrap onClick={onClick}>
      <Image src={img} width={50} />
      <P>{text}</P>
    </ImageWrap>
  );
};

const ImageWrap = styled.div`
  cursor: pointer;
  border-radius: 31px;
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 5px;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray01};
  }
`;

const P = styled.p``;
