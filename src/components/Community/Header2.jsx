import { responsiveSize } from "../../utils/Mediaquery";
import DropDown from "../../components/Community/DropDown";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RowContainer } from "../../styles/GlobalStyle";
import photoIcon from "../../images/photoIcon.png";

export default function Header2({ isDrop, handleUpload, isPictureIcon }) {
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
        {/* 사진 올리는 상단바 */}
        {isPictureIcon ? (
          <RowContainer style={{ padding: `${responsiveSize("20")}` }}>
            <input
              type="file"
              name="photo"
              accept="image/*,audio/*,video/mp4,video/x-m4v"
              onChange={handleUpload}
              style={{ display: "none" }}
              id="file-upload"
            />
            <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
              <img src={photoIcon} alt="photoicon" />
            </label>
          </RowContainer>
        ) : undefined}
      </RowContainer>
    </>
  );
}
