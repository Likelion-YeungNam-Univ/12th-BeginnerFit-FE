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
  align-items: center;
  justify-content: center;
`;