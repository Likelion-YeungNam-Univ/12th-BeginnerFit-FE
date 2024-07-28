import api from "../axios";

export const likeApi = async (postId, like) => {
  try {
    
    let response;
    if (like) {
      response = await api.delete(`/posts/${postId}/likes`);
    } else {
      response = await api.post(`/posts/${postId}/likes`);
    }

    if (response.data.code === "SUCCESS") {
      return true;
    } else if (response.data.code === "FAIL") {
      console.warn(response.data.message);
      return false;
    }
  } catch (error) {
    console.error("좋아요 API 에러:", error);
    throw error;
  }
};
