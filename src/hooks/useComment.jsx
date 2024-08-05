// hooks/useComments.js
import { useState, useEffect } from "react";
import { getCommentApi } from "../apis/communityApi/getCommentApi";
import { commentApi } from "../apis/communityApi/commentApi";

export const useComment = (post) => {
  // 해당 게시글 댓글 불러오기
  const [comments, setComments] = useState([]);
  // 무한 스크롤 시 로딩
  const [isLoading, setIsLoading] = useState(false);
  // 더 불러올수 있는지 여부
  const [hasMore, setHasMore] = useState(true);
  // 댓글 5개씩 페이지네이션 페이지번호
  const [page, setPage] = useState(1);

  // 각 댓글 관리
  const [comment, setComment] = useState("");
  const isCommentEmpty = comment.trim().length === 0;

  const handleCommentSubmit = async () => {
    // 빈 댓글 작성 시 버튼 클릭 금지 및 비활성화
    if (isCommentEmpty) return;

    try {
      //새 댓글 작성
      await commentApi(post.id, comment);
      // 입력칸 초기화
      setComment("");

      setPage(1);
      //댓글 배열 초기화
      setComments([]);
      //새 댓글이 작성된 새로운 댓글 목록 불러오기.
      await getCommentApi(post.id, 1, setComments, setIsLoading, setHasMore);
    } catch (error) {
      //onsole.log("댓글 전송 실패", error);
    }
  };

  //스크롤 관리
  const loadComments = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const newComments = await getCommentApi(
        post.id,
        page + 1,
        setComments,
        setIsLoading,
        setHasMore
      );
      if (newComments.length > 0) {
        setComments((prevComments) => [...prevComments, ...newComments]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const reloadComments = async () => {
    setComments([]);
    setPage(1);
    setHasMore(true);
    await getCommentApi(post.id, 1, setComments, setIsLoading, setHasMore);
  };

  useEffect(() => {
    const fetchComments = async () => {
      setComments([]);
      setPage(1);
      setHasMore(true);
      await getCommentApi(post.id, 1, setComments, setIsLoading, setHasMore);
    };
    fetchComments();
  }, [post?.id]);

  return {
    comments,
    comment,
    setComment,
    handleCommentSubmit,
    isCommentEmpty,
    loadComments,
    isLoading,
    hasMore,
    reloadComments
  };
};
