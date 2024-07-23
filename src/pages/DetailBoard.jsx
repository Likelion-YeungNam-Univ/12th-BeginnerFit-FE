import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header2 from "../components/Community/Header2";
import WriteBoardMain from "../components/Community/WriteBoardMain";
import {Wrapper} from "../styles/GlobalStyle";
export default function DetailBoard() {
  const { idx } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  //환경변수에서 테스트서버가져오기
  const TEST_SERVER_URL = import.meta.env.VITE_TEST_SERVER_URL;

  const getPost = async () => {
    try {
      const url = `${TEST_SERVER_URL}/posts/${idx}`;
      console.log("Request URL:", url); // 요청 URL 확인
      const response = await axios.get(url);
      console.log("Response data:", response.data); // 응답 데이터 로그
      setPost(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    getPost();
  }, [idx]);

  return (
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
  );
}



