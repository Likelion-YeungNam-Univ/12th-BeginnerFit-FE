import axios from "axios";
import api from "../axios";
export const getPostApi = async (idx, setPost, setLoading) => {
  const response = await api.get(`/posts/${idx}`);
 // console.log(idx);
  setPost(response.data);
  setLoading(false);
};
