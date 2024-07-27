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

export const Image = styled.img`
  cursor: pointer;
  width: ${({ $width }) => responsiveSize($width)};
  height: ${({ $height }) => responsiveSize($height)};
`;

// 메인이랑 마이페이지에서 사용되는 스타일
export const MainWrapper = styled.div`
  flex-direction: column;
  align-items: center;
`;

export const MainContainer = styled.div`
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  height: 100%;
`;

export const MainContent = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: solid 1px ${({ theme }) => theme.colors.gray04};
  padding: 20px;
  box-sizing: border-box;
  min-height: 100vh;
`;

export const MainH2 = styled.h1`
  margin-top: 40px;
  margin-bottom: 20px;
`;

export const MainH3 = styled.h2`
  margin-top: 40px;
  margin-bottom: 10px;
`;
