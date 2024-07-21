import React from "react";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });
  return <React.Fragment>{isMobile && children}</React.Fragment>;
};

Mobile.propTypes = {
  children: PropTypes.node,
};

const PC = ({ children }) => {
  const isPc = useMediaQuery({
    query: "(min-width:600px)",
  });
  return <React.Fragment>{isPc && children}</React.Fragment>;
};

PC.propTypes = {
  children: PropTypes.node,
};

// 반응형 크기 계산 함수
const responsiveSize = (pixelValue) => `calc(${pixelValue}px + (100vw/1920))`;

export { Mobile, PC,responsiveSize };
