import axios from "axios";
import api from "../axios";
import useCommentStore from "../../store/commentStore";
<<<<<<< HEAD
export const getCommentApi = async (
  postIdx,
  page,
  setComments,
  setIsLoading,
  setHasMore
) => {
=======
export const getCommentApi = async (postIdx, setComments, setIsLoading) => {
>>>>>>> dfa37e34d0b32552fbac1ca1dd5b9f936e222d7c
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
<<<<<<< HEAD
      setHasMore(newComments.length === 5);

      // 총 댓글 수 계산 및 저장
      if (page === 1) {
        const totalCount = response.headers["x-total-count"];
        setCommentCount(postIdx, parseInt(totalCount) || newComments.length);
      }
    } else {
      //더 이상 가져올 댓글 없을 시
      setHasMore(false);
=======
>>>>>>> dfa37e34d0b32552fbac1ca1dd5b9f936e222d7c
    }
  } catch (error) {
    console.error("댓글을 불러오는 중 오류가 발생했습니다:", error);
  } finally {
    if (setIsLoading) setIsLoading(false); //로딩 상태를 false로
  }
};

