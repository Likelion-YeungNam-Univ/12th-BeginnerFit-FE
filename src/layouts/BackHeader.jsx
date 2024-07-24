import { responsiveSize } from "../utils/Mediaquery";
import DropDown from "../components/Community/DropDown";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RowContainer } from "../styles/GlobalStyle";

export default function BackHeader({ padding, option }) {
  const navigate = useNavigate();

  // 뒤로 가기 버튼 눌렀을 때 실행할 함수
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <RowContainer style={{ padding: `${responsiveSize(padding)}` }}>
        <IoIosArrowBack
          style={{
            cursor: "pointer",
            width: `${responsiveSize("20")}`,
            height: "auto",
          }}
          onClick={handleBack}
        />
        {option && <DropDown />}
      </RowContainer>
    </>
  );
}
