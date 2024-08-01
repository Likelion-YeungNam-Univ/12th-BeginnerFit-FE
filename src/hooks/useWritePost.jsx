import { useNavigate } from "react-router-dom";
import { postStore } from "../store/postStore";
import axios from "axios";
import api from "../apis/axios";
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

    // FormData 확인
    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    //수정과 작성서버 주소
    const SERVER_URL =
      import.meta.env.VITE_SERVER_URL +
      (isEdit && postId ? `/posts/${postId}` : `/posts`);
    console.log("Server URL:", SERVER_URL);
    //게시글 수정이면 put,게시물 작성이면 post
    const method = isEdit ? "PUT" : "POST";
    console.log("HTTP Method:", method);

    const accessToken=localStorage.getItem("accessToken");
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
        alert("게시물이 수정되었습니다.");
        console.log("게시물 수정", response.data);
      } else if (method === "post") {
        alert("게시물이 등록되었습니다.");
        console.log("게시물 등록", response.data);
      }

      //입력칸 초기화
      setTitle("");
      setContent("");
      setFileUrl("");

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

  return { onSubmit, handleUpload };
};
