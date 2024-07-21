import { responsiveSize } from "../../utils/Mediaquery";
import DropDown from "../../components/Community/DropDown";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header2() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <RowContainer>
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
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
