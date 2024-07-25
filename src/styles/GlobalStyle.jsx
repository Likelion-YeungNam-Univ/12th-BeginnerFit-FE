import styled from "styled-components";
import { responsiveSize } from "../utils/Mediaquery";
export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const TimeText = styled.p`
  font-size: ${responsiveSize("12")};
  color: ${({ theme }) => theme.colors.gray02};
`;

export const TitleText = styled.h3`
  font-size: ${responsiveSize("16")};
  font-weight: 600;
`;
export const Wrapper = styled.div`
  flex-direction: column;
  border: solid 1px ${({ theme }) => theme.colors.gray04};
  align-items: center;
  justify-content: center;
`;

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
  border-top-left-radius: ${responsiveSize("30")};
  border-top-right-radius: ${responsiveSize("30")};
  z-index: 1;
`;