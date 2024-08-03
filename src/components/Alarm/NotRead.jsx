import React from "react";
import styled from "styled-components";

// 빨간색 점 컴포넌트
export const NotRead = () => {
  return <Wrap></Wrap>;
};

const Wrap = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
  left: 70px;
`;
