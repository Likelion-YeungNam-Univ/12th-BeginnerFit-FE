import Header2 from "../components/Community/Header2";
import { RowContainer, SubmitButton, Wrapper } from "../styles/GlobalStyle";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { responsiveSize } from "../utils/Mediaquery";
import photoIcon from "../images/photoIcon.png";
import CommunityButtons from "../components/Community/CommunityButtons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Watch } from "@mui/icons-material";

export default function WritePost() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const selectList = ["자유게시판", "정보공유"];

  //React Hoopk Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //파일 올리기-1개
  const [file, setFile] = useState(null);

  //카테고리 선택 기본값자자유게시판
  const [selectCategory, setSelectCategory] = useState(selectList[0]);

  //제목 내용입력확인
  const title = watch("title");
  const content = watch("content");
  //파일 업로드 핸들러
  const handleUpload = (e) => {
    e.preventDefault();
    const uploadFile = e.target.files[0];
    if (uploadFile) {
      setFile(uploadFile);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append(
      "createDto",
      new Blob(
        [
          JSON.stringify({
            title: data.title,
            content: data.content,
            categoryName: selectCategory,
          }),
        ],
        { type: "application/json" }
      )
    );

    if (file) {
      formData.append("postPicture", file);
    }

    // FormData 확인
    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/posts`,
        formData,
        {
          headers: {
            //  "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
          },
        }
      );
      //게시물 작성 성공
      alert("게시물이 등록되었습니다.");
      console.log("게시물 등록", response.data);
      navigate("/posts"); //커뮤니티 페이지 이동
    } catch (error) {
      console.error("게시물 등록 중 오류가 발생", error);
      if (error.response) {
        // 서버가 응답한 경우
        console.error("서버 응답 데이터:", error.response.data);
        console.error("서버 응답 상태:", error.response.status);
        console.error("서버 응답 헤더:", error.response.headers);
      } else if (error.request) {
        // 요청이 만들어졌지만 응답이 없는 경우
        console.error("요청 데이터:", error.request);
      } else {
        // 요청을 설정하는 중에 오류가 발생한 경우
        console.error("오류 메시지:", error.message);
      }
      console.error("전체 오류 설정:", error.config);
    }
  };

  //카테고리 선택
  const handleCategorySelect = (category) => {
    setSelectCategory(category);
  };

  return (
    <Wrapper style={{ minHeight: "100vh", flexDirection: "column" }}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <RowContainer style={{ padding: `${responsiveSize("20")}` }}>
          <ResponsiveIcon onClick={handleBack} />
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
        <Div>
          {selectList.map((category, index) => (
            <Button
              key={index}
              type="button"
              onClick={() => handleCategorySelect(category)}
              $selected={selectCategory === category}
            >
              {category}
            </Button>
          ))}
        </Div>
        <MainContainer>
          <InputTitle
            type="text"
            placeholder="제목을 입력하세요"
            {...register("title", {
              required: true,
              maxLength: 30,
              minLength: 1,
            })}
          ></InputTitle>
          <InputContent
            type="text"
            placeholder="본문을 입력하세요"
            {...register("content", {
              required: true,
              maxLength: 500,
              minLength: 1,
            })}
          ></InputContent>
        </MainContainer>
        <Spacer />
        <ButtonWrapper>
          <SubmitButton
            type="submit"
            $isFormValid={title && content}
            disabled={!title || !content}
          >
            등록하기
          </SubmitButton>
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
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const Spacer = styled.div`
  flex-grow: 1;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Button = styled.button`
  width: fit-content;
  padding: 0 1rem;
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.white : theme.colors.gray02};
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.black : theme.colors.gray01};
  border: none;
  border-radius: ${responsiveSize("18")};
  height: ${responsiveSize("28")};
  font-size: ${responsiveSize("14")};
  cursor: pointer;
`;
