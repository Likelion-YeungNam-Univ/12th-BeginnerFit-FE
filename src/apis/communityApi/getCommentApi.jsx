import axios from "axios";
import api from "../axios";
import useCommentStore from "../../store/commentStore";
export const getCommentApi = async (postIdx, setComments, setIsLoading) => {
  const setCommentCount = useCommentStore.getState().setCommentCount;
  //로딩상태 true
  if (setIsLoading) setIsLoading(true);

  try {
    //댓글 요청 GET
    const response = await api.get(`/posts/${postIdx}/comments`);
    const newComments = response.data;
    if (Array.isArray(newComments) && newComments.length > 0) {
      //새 댓있으면 업데이트
      setComments((prevComments) => [...prevComments, ...newComments]);
    }
  } catch (error) {
    console.error("댓글을 불러오는 중 오류가 발생했습니다:", error);
  } finally {
    if (setIsLoading) setIsLoading(false); //로딩 상태를 false로
  }
};

