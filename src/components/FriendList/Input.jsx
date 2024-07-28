import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useFriendSearchStore } from "../../store/useFriendSearchStore";
import useInputFocus from "../../hooks/useInputFocus";

export const Input = () => {
  const { value, setValue } = useFriendSearchStore();

  // 처음 랜더링시 input 요소에 focus 주기위해 사용
  const { inputRef } = useInputFocus();

  return (
    <Container>
      <CostomInput
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <IconWrap>
        <FaSearch color="#9A9A9A" size={20} />
      </IconWrap>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const CostomInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 15px 50px 15px 15px;
  outline: none;
  border-radius: 27px;
  border: none;
  background-color: ${({ theme }) => theme.colors.gray01};
  font-size: 16px;
  height: 50px;
`;

const IconWrap = styled.span`
  position: absolute;
  right: 15px;
  top: 15px;
`;
