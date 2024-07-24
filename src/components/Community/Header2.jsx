import { responsiveSize } from "../../utils/Mediaquery";
import DropDown from "../../components/Community/DropDown";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RowContainer } from "../../styles/GlobalStyle";

export default function Header2({ isDrop }) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const ResponsiveIcon = styled(IoIosArrowBack)`
    cursor: pointer;
    font-size: 25px;
  `;
  return (
    <>
      <RowContainer style={{ padding: `${responsiveSize("20")}` }}>
        <ResponsiveIcon onClick={handleBack} />
        {isDrop ? <DropDown /> : undefined}
        <IoIosArrowBack
          style={{
            cursor: "pointer",
            width: `${responsiveSize("20")}`,
            height: "auto",
          }}
          onClick={handleBack}
        />
      </RowContainer>
    </>
  );
}
