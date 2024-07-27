import { create } from "zustand";

const useCommentStore = create((set) => ({
  commentCounts: {}, //각 게시물ID가 키,댓글 수를 값
  //댓글 수 업데이트 함수
  setCommentCount: (postId, count) =>
    set((state) => ({
      commentCounts: {
        ...state.commentCounts,
        [postId]: count,
      },
    })),
  //특정 게시물의 댓글 수 1씩 증가 함수
  incrementCommentCount: (postId) =>
    set((state) => ({
      commentCounts: {
        ...state.commentCounts,
        [postId]: (state.commentCounts[postId] || 0) + 1, // 기존 값이 없으면 0에서 시작
      },
    })),

  // 특정 게시물의 댓글 수를 1 감소시키는 함수

  decrementCommentCount: (postId) =>
    set((state) => ({
      commentCounts: {
        ...state.commentCounts,

        [postId]: Math.max((state.commentCounts[postId] || 0) - 1, 0),
      },
    })),
}));

export default useCommentStore;
