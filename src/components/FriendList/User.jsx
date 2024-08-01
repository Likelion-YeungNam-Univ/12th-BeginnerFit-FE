import React, { useState } from "react";
import { Image } from "../../styles/GlobalStyle";
import styled, { keyframes } from "styled-components";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { usePostData } from "../../hooks/usePostData";

// type으로 친구 추가할지 삭제할지 설정
export const User = ({ id, nickname, image, type, onClick }) => {
  // 친구 추가 버튼을 눌렀는지 확인하는 state (친구 추가 버튼을 누르면 + 버튼이 안 보여야됨)
  const [isPlused, setIsPlused] = useState(false);

  //
  const { data, isLoading, error, postData } = usePostData(
    `/friends/request/${id}`
  );

  // 친구 추가 버튼 눌렀을 때 실행할 함수
  const handlePlusButton = () => {
    // 이미 친구 추가됐으면 state 변경 없음
    if (isPlused) {
      return;
    }
    setIsPlused(true);
    // 서버에게 친구 추가 api 요청
    postData();
  };

  return (
    <RowContainer style={{ margin: "5px 0px" }}>
      <Item>
        <Image src={image} width={55} height={55} />
        <Nickname>{nickname}</Nickname>
      </Item>
      <Item>
        <IconHover onClick={onClick ?? handlePlusButton}>
          {type === "delete" ? (
            <FaRegTrashAlt size={20} cursor={"pointer"} color="#9A9A9A" />
          ) : !isPlused ? (
            <FaPlus size={20} cursor={"pointer"} onClick={handlePlusButton} />
          ) : (
            <AnimationCheck size={20} />
          )}
        </IconHover>
      </Item>
    </RowContainer>
  );
};

// 체크 버튼으로 변경될 때 애니메이션 적용
const fadeIn = keyframes`
  from{
    transform: scale(0);
  }
  to{
    transform: scale(1);
  }
`;
// 체크 버튼으로 변경될 때 애니메이션 적용
const AnimationCheck = styled(FaCheck)`
  animation: ${fadeIn} 0.5s ease;
`;

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
