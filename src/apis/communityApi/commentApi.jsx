import axios from "axios";
import api from "../axios";

export const commentApi = async (postId, content) => {

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const url = `${SERVER_URL}/posts/${postId}/comments`;
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
