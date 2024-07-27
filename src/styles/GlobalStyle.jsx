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

export const SubmitButton = styled.button`
  margin-top: ${responsiveSize(30)};
  height: ${responsiveSize(77)};
  font-size: ${responsiveSize(30)};
  width: ${responsiveSize(550)};
  margin-bottom: ${responsiveSize(40)};
  border-radius: ${responsiveSize(12)};
  text-align: center;
  color: ${({ theme, $isFormValid }) =>
    $isFormValid ? theme.colors.white : theme.colors.gray01};
  background-color: ${({ theme, $isFormValid }) =>
    $isFormValid ? theme.colors.purple : theme.colors.gray02};
  border: none;
  cursor: pointer;

  @media (max-width: 600px) {
    font-size: ${responsiveSize(20)};
    width: calc(100% - 20px);
    height: ${responsiveSize(60)};
  }
`;