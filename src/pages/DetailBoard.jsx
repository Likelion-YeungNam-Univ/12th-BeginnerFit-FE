import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header2 from "../components/Community/Header2";
import WriteBoardMain from "../components/Community/WriteBoardMain";
import { Wrapper } from "../styles/GlobalStyle";
import { getPostApi } from "../apis/communityApi/getPostApi";
import { QueryClientProvider } from "react-query";

export default function DetailBoard() {
  const { idx } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  //게시물 불러오기
  const handleGetPosts = async () => {
    setLoading(true);
    try {
      //게시물 불러오는 함수 호출
      await getPostApi(idx, setPost, setLoading);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetPosts();
  }, [idx]);
  return (
    <Wrapper style={{ minHeight: "100vh" }}>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Header2 isDrop={true} post={post} />
          <WriteBoardMain post={post} />
        </>
      )}
    </Wrapper>
  );
}
//============================================
