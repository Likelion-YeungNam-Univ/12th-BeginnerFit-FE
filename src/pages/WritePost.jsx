import Header2 from "../components/Community/Header2";
import { RowContainer, Wrapper } from "../styles/GlobalStyle";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { responsiveSize } from "../../utils/Mediaquery";
import photoIcon from "../images/photoIcon.png";
import CommunityButtons from "../components/Community/CommunityButtons";
export default function WritePost() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };



  const selectList=["자유게시판","정보공유"];

  return (
    <Wrapper>
      <RowContainer style={{ padding: `${responsiveSize("20")}` }}>
        <ResponsiveIcon onClick={handleBack} />
        <PhotoIcon src={photoIcon}></PhotoIcon>
      </RowContainer>
      <CommunityButtons></CommunityButtons>
    </Wrapper>
  );
}

//======================================================
const PhotoIcon = styled.img`
  width: ${responsiveSize(20)};
  height: auto;
  cursor: pointer;
`;
const ResponsiveIcon = styled(IoIosArrowBack)`
cursor: pointer;
font-size: 25px;
`;
const InputTitle=styled.input`
    
`