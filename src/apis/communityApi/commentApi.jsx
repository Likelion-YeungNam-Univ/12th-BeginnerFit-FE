import axios from "axios";

export const commentApi = async (postId, content) => {
  //환경변수에서 테스트서버가져오기
  //const TEST_SERVER_URL = import.meta.env.VITE_TEST_SERVER_URL;

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const url = `${SERVER_URL}/posts/${postId}/comments`;

  //임시 토큰
  const TOKEN = import.meta.env.VITE_TOKEN;

  // axios 인스턴스 생성
  const api = axios.create({
    baseURL: "/api",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  try {
    const response = await api.post(url, { content: content });
    //성공여부
    console.log("댓글 작성완료!", response.data);
    return response.data;
  } catch (error) {
    console.log("댓글 작성 실패", error);
    throw error;
  }
};
