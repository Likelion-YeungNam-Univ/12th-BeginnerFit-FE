// hooks/useComments.js
import { useState, useCallback, useEffect } from "react";
import { getCommentApi } from "../apis/communityApi/getCommentApi";
import { commentApi } from "../apis/communityApi/commentApi";

export const useComments = (postId) => {
  // 댓글  상태 관리
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // 댓글을 불러오는 함수
  const fetchComments = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      // API를 호출하여 댓글 불러오기
      await getCommentApi(postId, page, setComments, setIsLoading, setHasMore);
      setPage((prevPage) => prevPage + 1); // 다음 페이지로 이동
    } catch (error) {
      console.error("댓글을 불러오는 중 오류가 발생했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  }, [postId, page, hasMore, isLoading]);

  // 새 댓글을 추가
  const addComment = useCallback(
    async (content) => {
      try {
        // API를 호출하여 새 댓글 추가
        const newComment = await commentApi(postId, content);
        setComments((prevComments) => [newComment, ...prevComments]); // 새 댓글을 목록 맨 앞에 추가

        setPage(1);
        setComments([]);
        fetchComments();
      } catch (error) {
        console.error("댓글 추가 중 오류가 발생했습니다:", error);
      }
    },
    [postId, fetchComments]
  );

  // postId가 변경될 때마다 댓글 목록 초기화 및 새로 불러오기
  useEffect(() => {
    setPage(1);
    setComments([]);
    setHasMore(true);
    fetchComments();
  }, [postId]);

  
  return {
    comments,
    isLoading,
    hasMore,
    fetchComments,
    addComment,
  };
};
