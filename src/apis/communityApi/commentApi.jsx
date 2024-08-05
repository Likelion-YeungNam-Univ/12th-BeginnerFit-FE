import axios from "axios";
import api from "../axios";

export const commentApi = async (postId, content) => {

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const url = `${SERVER_URL}/posts/${postId}/comments`;

    const response = await api.post(url, { content: content });
    //성공여부
    return response.data;
};
