import { postStore } from "../../store/postStore";
import styled from "styled-components";
import CategorySelect from "./CategorySelect";
import Header2 from "./Header2";
import { responsiveSize } from "../../utils/Mediaquery";
import { SubmitButton } from "../../styles/GlobalStyle";
export default function Form({
  handleSubmit,
  onSubmit,
  handleUpload,
  categories,
}) {
  //Zustand에서 상태가져오기
  const { fileUrl, file, title, content, setTitle, setContent } = postStore();

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Header2 isPictureIcon={true} handleUpload={handleUpload} />
      <CategorySelect categories={categories} />
      <MainContainer>
        <InputTitle
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputContent
          type="text"
          placeholder="본문을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </MainContainer>
      {fileUrl ? <Photo src={fileUrl} alt="uploaded photo"></Photo> : undefined}
      <Spacer />
      <ButtonWrapper>
        <SubmitButton
          type="submit"
          $isFormValid={title && content && categories}
          disabled={!title || !content || !categories}
        >
          등록하기
        </SubmitButton>
      </ButtonWrapper>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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

const Spacer = styled.div`
  flex-grow: 1;
`;

const Photo = styled.img`
  margin-top: ${responsiveSize("20")};
  padding: 0 20px;
  height: auto;
  border-radius: 10%;
`;
