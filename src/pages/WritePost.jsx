import { Wrapper } from "../styles/GlobalStyle";
import { useForm } from "react-hook-form";
import { postStore } from "../store/postStore";
import Form from "../components/Community/Form";
import { useWritePost } from "../hooks/useWritePost";
import { useLocation } from "react-router-dom";
export default function WritePost() {
  //React Hoopk Form
  const { handleSubmit } = useForm();
  //Zustand 상태 가져오기
  const { selectCategory} =
    postStore();

  //useWritePost에서 가져오기
  const { onSubmit, handleUpload } = useWritePost("/posts");

  //state받아오기
  const location = useLocation();
  const { isEdit: loactionIsEdit, post: locationPost } = location.state || {};

  const handleFormSubmit = () => {
    onSubmit(loactionIsEdit, locationPost?.id);
  };
  return (
    <Wrapper style={{ minHeight: "100vh", flexDirection: "column" }}>
      <Form
        handleSubmit={handleSubmit(handleFormSubmit)}
        handleUpload={handleUpload}
        categories={selectCategory}
        //게시글 수정일때만 전달 게시글 작성->null값주기
        isEdit={loactionIsEdit}
        post={locationPost}
      ></Form>
    </Wrapper>
  );
}
