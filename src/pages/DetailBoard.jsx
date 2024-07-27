import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header2 from "../components/Community/Header2";
import WriteBoardMain from "../components/Community/WriteBoardMain";
import { RowContainer, Wrapper } from "../styles/GlobalStyle";
import { BottomNavContainer } from "../components/BottomNav";
import { responsiveSize } from "../utils/Mediaquery";
import { FiChevronRight } from "react-icons/fi";
import { commentApi } from "../apis/communityApi/commentApi";
import { getPostApi } from "../apis/communityApi/getPostApi";

export default function DetailBoard() {
  const { idx } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  //게시물 불러오기
  const handleGetPosts = async () => {
    try {
      //게시물 불러오는 함수 호출
      await getPostApi(idx, post, setPost, setLoading);
    } catch (error) {
      console.log("게시물 불러오기 실패", error);
    }
  };

  useEffect(() => {
    handleGetPosts();
  }, [idx]);

  return (
    <>
      <Wrapper>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <Header2 />
            <WriteBoardMain post={post} />
          </>
        )}
      </Wrapper>
    </>
  );
}
//============================================

