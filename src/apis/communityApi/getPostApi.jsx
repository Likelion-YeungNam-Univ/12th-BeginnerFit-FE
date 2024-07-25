import axios from "axios";
export const getPostApi = async (idx, post, setPost, setLoading) => {
  // const TEST_SERVER_URL = import.meta.env.VITE_TEST_SERVER_URL;
  // const SERVER_URL = import.meta.env.VITE_SERVER_URL;

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
    const response = await api.get(`/posts/${idx}`);
    console.log(idx);
    setPost(response.data);
    setLoading(false);
  } catch (error) {
    console.log("게시물 불러오기 오류", error);
  }
};
