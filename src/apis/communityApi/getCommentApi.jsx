import axios from "axios";

export const getCommentApi = async (
  postIdx,
  page,
  setComments,
  setIsLoading,
  setHasMore,
  updateTotalComments
) => {
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

  //로딩상태 true
  if (setIsLoading) setIsLoading(true);

  try {
    //댓글 요청 GET
    const response = await api.get(`/posts/${postIdx}/comments`, {
      params: {
        page: page,
        size: 5, //댓글 5개씩 페이지세이션
      },
    });
    const newComments = response.data;
    //댓글 갯수 설정
    updateTotalComments(response.data.length);

    if (Array.isArray(newComments) && newComments.length > 0) {
      //새 댓있으면 업데이트
      setComments((prevComments) => [...prevComments, ...newComments]);
      setHasMore(newComments.length === 5);
    } else {
      //더 이상 가져올 댓글 없을 시
      setHasMore(false);
    }
  } catch (error) {
    console.error("댓글을 불러오는 중 오류가 발생했습니다:", error);
  } finally {
    if (setIsLoading) setIsLoading(false); //로딩 상태를 false로
  }
};
