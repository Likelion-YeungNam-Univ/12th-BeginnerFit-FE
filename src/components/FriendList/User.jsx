import React from "react";
import { Image } from "../../styles/GlobalStyle";
import styled from "styled-components";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

// type으로 친구 추가할지 삭제할지 설정
export const User = ({ id, nickname, image, type }) => {
  return (
    <RowContainer style={{ margin: "5px 0px" }}>
      <Item>
        <Image src={image} width={55} height={55} />
        <Nickname>{nickname}</Nickname>
      </Item>
      <Item>
        <IconHover>
          {type === "delete" ? (
            <FaRegTrashAlt size={20} cursor={"pointer"} color="#9A9A9A" />
          ) : (
            <FaPlus size={20} cursor={"pointer"} />
          )}
        </IconHover>
      </Item>
    </RowContainer>
  );
};

const RowContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 31px;
  transition: all 0.5s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray01};
  }
`;

const IconHover = styled.div`
  padding: 5px;
  cursor: pointer;
  border-radius: 50px;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgba(217, 217, 217, 0.5);
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
`;

const Nickname = styled.p`
  &:hover {
    text-decoration: underline;
  }
`;
