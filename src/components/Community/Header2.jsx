import { responsiveSize } from "../../utils/Mediaquery";
import DropDown from "../../components/Community/DropDown";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RowContainer } from "../../styles/GlobalStyle";

export default function Header2() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <RowContainer style={{padding:`${responsiveSize("20")}`}}>
        <IoIosArrowBack
          style={{
            cursor: "pointer",
            width: `${responsiveSize("20")}`,
            height: "auto",
          }}
          onClick={handleBack}
        />
        <DropDown />
      </RowContainer>
    </>
  );
}
