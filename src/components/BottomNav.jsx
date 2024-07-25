import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { MdOutlineChat } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { responsiveSize } from "../utils/Mediaquery";

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
        <Link>
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

export const BottomNavContainer = styled.nav`
  width: 100%;
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.black};
  height: ${responsiveSize("90")};
  bottom: 0;
  border-top-left-radius: ${responsiveSize("30")};
  border-top-right-radius: ${responsiveSize("30")};
  z-index: 1;
`;

const StyledIcon = styled.div`
  width: ${responsiveSize("48")};
  height: ${responsiveSize("48")};
  color: gray;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.lightpurple};
  }
`;
