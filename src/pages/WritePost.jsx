import { Wrapper } from "../styles/GlobalStyle";
import { useForm } from "react-hook-form";
import { postStore } from "../store/postStore";
import Form from "../components/Community/Form";
import { useWritePost } from "../hooks/useWritePost";
import styled from "styled-components";
import { responsiveSize } from "../utils/Mediaquery";
export default function WritePost() {
  //React Hoopk Form
  const { handleSubmit } = useForm();
  //Zustand 상태 가져오기
  const { selectCategory, file } = postStore();

  //useWritePost에서 가져오기
  const { onSubmit, handleUpload } = useWritePost("/posts");

  return (
    <Wrapper style={{ minHeight: "100vh", flexDirection: "column" }}>
      <Form
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        handleUpload={handleUpload}
        categories={selectCategory}
      ></Form>
    </Wrapper>
  );
}

