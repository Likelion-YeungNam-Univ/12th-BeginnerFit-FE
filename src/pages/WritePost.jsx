import Header2 from "../components/Community/Header2";
import { RowContainer, SubmitButton, Wrapper } from "../styles/GlobalStyle";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { responsiveSize } from "../utils/Mediaquery";
import photoIcon from "../images/photoIcon.png";
import CommunityButtons from "../components/Community/CommunityButtons";
import { useState } from "react";

export default function WritePost() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const selectList = ["자유게시판", "정보공유"];

  //제목
  const [title, setTitle] = useState("");
  //내용
  const [content, setContent] = useState("");

  return (
    <Wrapper style={{ minHeight: "100vh", flexDirection: "column" }}>
      <StyledForm>
        <RowContainer style={{ padding: `${responsiveSize("20")}` }}>
          <ResponsiveIcon onClick={handleBack} />
          <PhotoIcon
            src={photoIcon}
            alt="photoicon"
            type="file"
            name="photo"
            accept="image/*,audio/*,video/mp4,video/x-m4v,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.csv"
          ></PhotoIcon>
        </RowContainer>
        <Div>
          <CommunityButtons buttonList={selectList}></CommunityButtons>
        </Div>
        <MainContainer>
          <InputTitle type="text" placeholder="제목을 입력하세요"></InputTitle>
          <InputContent
            type="text"
            placeholder="본문을 입력하세요"
          ></InputContent>
        </MainContainer>
        <Spacer />
        <ButtonWrapper>
          <SubmitButton>등록하기</SubmitButton>
        </ButtonWrapper>
      </StyledForm>
    </Wrapper>
  );
}

//======================================================
const PhotoIcon = styled.input`
  width: ${responsiveSize(20)};
  height: auto;
  cursor: pointer;
`;
const ResponsiveIcon = styled(IoIosArrowBack)`
  cursor: pointer;
  font-size: 25px;
`;
const InputTitle = styled.input`
  border-radius: ${responsiveSize(12)};
  text-align: left;
  background-color: ${({ theme }) => theme.colors.gray01};
  border: none;
  width: calc(100% - 40px);
  max-width: ${responsiveSize(550)};
  height: ${responsiveSize(77)};
  font-size: 1rem;
  margin: 20px 0;
  padding: 0 10px;
  @media (max-width: 600px) {
    font-size: small;
    width: calc(100% - 20px);
    height: min(${responsiveSize(50)});
  }
`;
const InputContent = styled.textarea`
  border-radius: ${responsiveSize(12)};
  text-align: left;
  background-color: ${({ theme }) => theme.colors.gray01};
  border: none;
  width: calc(100% - 40px);
  max-width: ${responsiveSize(550)};
  font-size: 1rem;
  height: ${responsiveSize(400)};
  padding: 10px;
  resize: none;
  @media (max-width: 600px) {
    font-size: small;
    width: calc(100% - 20px);
  }
`;

const MainContainer = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  flex-grow: 1;
`;

const ButtonWrapper = styled.div`
  padding: 0 0 30px 0;

  display: flex;
  justify-content: center;
`;

const Div = styled.div`
  padding: 0 20px;
`;
const Spacer = styled.div`
  flex-grow: 1;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
