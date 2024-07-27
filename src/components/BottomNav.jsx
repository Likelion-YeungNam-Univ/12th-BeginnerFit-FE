import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { MdOutlineChat } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { responsiveSize } from "../utils/Mediaquery";
import { BottomNavContainer } from "../styles/GlobalStyle";
export default function BottomNav() {
  return (
    <BottomNavContainer>
      <div>
        {/* 메인이동 */}
        <Link to="/main">
          <StyledIcon as={GoHome} />
        </Link>
      </div>
      {/* 프로필 이동 */}
      <div>
        <Link to="/mypage">
          <StyledIcon as={FiUser} />
        </Link>
      </div>
      {/* 채팅이동 */}
      <div>
        <Link>
          <StyledIcon as={MdOutlineChat} />
        </Link>
      </div>
    </BottomNavContainer>
  );
}

//================================================================================


const StyledIcon = styled.div`
  width: ${responsiveSize("38")};
  height: ${responsiveSize("38")};
  color: gray;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.lightpurple};
  }
`;
