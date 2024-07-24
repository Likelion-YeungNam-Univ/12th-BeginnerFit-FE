import axios from "axios";
export const getPostApi = async (idx, post, setPost, setLoading) => {
  const TEST_SERVER_URL = import.meta.env.VITE_TEST_SERVER_URL;
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const url = `${SERVER_URL}/posts/${idx}`;

  try {
    const response = await axios.get(url);
    setPost(response.data);
    setLoading(false);
  } catch (error) {
    console.log("게시물 불러오기 오류", error);
  }
};
