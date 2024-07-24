import React from "react";
import styled from "styled-components";
import { responsiveSize } from "../utils/Mediaquery";
export default function Tag({ title }) {
  return <Div>{title}</Div>;
}

const Div = styled.div`
  background-color: ${({ theme }) => theme.colors.gray01};
  color: ${({ theme }) => theme.colors.gray02};
  min-width: ${responsiveSize("50")};
  width: auto;
  padding: 5px;
  text-align: center;
  border-radius: 28px;
  font-size: ${responsiveSize("14")};
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray02};
    color: ${({ theme }) => theme.colors.gray03};
  }
`;
