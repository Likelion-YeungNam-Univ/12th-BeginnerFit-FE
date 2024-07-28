import axios from "axios";
import api from "../axios";
export const getPostApi = async (idx, setPost, setLoading) => {
  try {
    const response = await api.get(`/posts/${idx}`);
    console.log(idx);
    setPost(response.data);
    setLoading(false);
  } catch (error) {
    console.log("게시물 불러오기 오류", error);
  }
};
