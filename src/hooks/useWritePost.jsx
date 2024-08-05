import { useNavigate } from "react-router-dom";
import { postStore } from "../store/postStore";
import axios from "axios";
import api from "../apis/axios";
import AlarmDialog from "../styles/AlarmDialog";
export const useWritePost = () => {
  //Zustand 상태 가져오기
  const {
    file,
    setFile,
    selectCategory,
    title,
    content,
    setTitle,
    setContent,
    setFileUrl,
  } = postStore();

  const navigate = useNavigate();

  //파일 업로드
  const handleUpload = (e) => {
    e.preventDefault();
    const uploadFile = e.target.files[0];
    if (uploadFile) {
      setFile(uploadFile);
      //작성란에 이미지 보이기
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileUrl(reader.result);
      };
      reader.readAsDataURL(uploadFile);
    }
  };
  //제출
  const onSubmit = async (isEdit, postId = null) => {
    const formData = new FormData();
    //DTO이름 구별
    const dtoName = isEdit ? "updateDto" : "createDto";

    formData.append(
      dtoName,
      new Blob(
        [
          JSON.stringify({
            title,
            content,
            categoryName: selectCategory,
          }),
        ],
        { type: "application/json" }
      )
    );

    if (file) {
      formData.append("postPicture", file);
    }

    

    //수정과 작성서버 주소
    const SERVER_URL =
      import.meta.env.VITE_SERVER_URL +
      (isEdit && postId ? `/posts/${postId}` : `/posts`);

    //게시글 수정이면 put,게시물 작성이면 post
    const method = isEdit ? "PUT" : "POST";

    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios({
        method: method,
        url: SERVER_URL,
        data: formData,
        headers: {
          //"Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      //게시물 작성 성공
      if (method === "put") {
        AlarmDialog({
          title: "수정",
          text: "게시물이 수정되었습니다.",
          type: "success",
        });
      } else if (method === "post") {
        AlarmDialog({
          title: "게시",
          text: "게시물이 게시되었습니다.",
          type: "success",
        });
      }

      //입력칸 초기화
      setTitle("");
      setContent("");
      setFileUrl("");

      navigate("/posts"); //커뮤니티 페이지 이동
    } catch (error) {
      AlarmDialog({
        title: "오류",
        text: "게시글 등록 중 오류가 발생했습니다.",
        type: "error",
      });
    }
  };

  return { onSubmit, handleUpload };
};
