import styled from "styled-components";
import { responsiveSize } from "../../utils/Mediaquery.jsx";
import PropTypes from "prop-types";
import { useState } from "react";
import { motion } from "framer-motion";
export default function CommunityButtons({
  buttonList = [],
  selectCategory,
  setSelectCategory,
}) {
  return (
    <BtnContainer>
      {buttonList.map((item, index) => (
        <Button
          as={motion.button}
          key={index}
          $select={selectCategory === item}
          onClick={() => setSelectCategory(item)}
        >
          {item}
        </Button>
      ))}
    </BtnContainer>
  );
}
//missing in props validation 오류
CommunityButtons.prototype = {
  buttonList: PropTypes.node.isRequired,
};
const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Button = styled.div`
  width: fit-content;
  padding: 0 1rem;
  color: ${({ theme, $select }) =>
    $select ? theme.colors.white : theme.colors.gray02};
  background-color: ${({ theme, $select }) =>
    $select ? theme.colors.black : theme.colors.gray01};
  border: none;
  border-radius: ${responsiveSize("18")};
  height: ${responsiveSize("28")};
  font-size: ${responsiveSize("14")};
  cursor: pointer;
`;
