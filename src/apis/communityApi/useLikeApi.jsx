import { queryClient } from "../../main";
import api from "../axios";

import { useQuery, useMutation } from "react-query";

export const useLikeApi = (post) => {
  //게시물 좋아요 개수
  const { data: likesCnt } = useQuery({
    queryKey: ["likesCnt", post?.id],
    queryFn: async () => {
      const response = await api.get(`/posts/${post?.id}`);
      return response.data.likeCnt;
    },
  });

  //게시글 좋아요 여부 확인
  const { data: isLiked } = useQuery({
    queryKey: ["likeStatus", post?.id],
    queryFn: async () => {
      const response = await api.get(`/posts/${post?.id}/likes/check`);
      //좋아요 되어 있으면 true
      //console.log(response);
      return response.data;
    },
    //refetchInterval: 1000, //1초마다 한 번씩 수동 통신
  });

  //Mutation
  //좋아요 토글
  const toggleLikehandler = useMutation({
    mutationFn: async () => {
      //좋아요가 되어있으면 -> 좋아요 취소
      if (isLiked) {
        await api.delete(`/posts/${post?.id}/likes`);
      }
      //좋아요가 안되어있으면 -> 좋아요
      else {
        await api.post(`/posts/${post?.id}/likes`);
      }
    },
    //mutation 함수 실행 전 실행.
    onMutate: async () =>
      //쿼리에서 값 불러오기
      {
        //충돌 방지
        await queryClient.cancelQueries(["likesCnt", post?.id]);
        await queryClient.cancelQueries(["likeStatus", post?.id]);
        //현재 좋아요 개수와 상태가져오기
        const prevLikeCnt = queryClient.getQueriesData(["likesCnt", post?.id]);
        const prevLikeStatus = queryClient.getQueriesData([
          "likeStatus",
          post.id,
        ]);
        //서버 응답 기다리지 않고 업뎃
        queryClient.setQueryData(["likeStatus", post?.id], !isLiked);
        queryClient.setQueryData(["likesCnt", post?.id], (old) => {
          {
            return isLiked ? old - 1 : old + 1;
          }
        });
        return { prevLikeCnt, prevLikeStatus };
      },
    //에러시
    onError: (context) => {
      queryClient.setQueryData(["likesCnt", post?.id], context.prevLikeCnt);
      queryClient.setQueryData(
        ["likeStatus", post?.id],
        context.prevLikeStatus
      );
    },
    //mutation 성공시
    onSettled: () => {
      queryClient.invalidateQueries(["likeStatus", post?.id]);
      queryClient.invalidateQueries(["likeCnt", post?.id]);
    },
  });

  const toggleLikes = () => {
    toggleLikehandler.mutate();
  };

  return {
    likeCnt: likesCnt,
    isLiked,
    toggleLikes,
    isLoading: toggleLikehandler.isLikeLoading,
  };
};
