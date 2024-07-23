import axios from "axios";

export const commentApi = async (postId, content, accessToken) => {
  //환경변수에서 테스트서버가져오기
  const TEST_SERVER_URL = import.meta.env.VITE_TEST_SERVER_URL;
  const url = `${TEST_SERVER_URL}/posts/${postId}/comments`;
  try {
    const response = await axios.post(
      url,
      { content: content },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    //성공여부
    console.log("댓글 작성완료!", response.data);
    return response.data;
  } catch (error) {
    console.log("댓글 작성 실패", error);
    throw error;
  }
};
