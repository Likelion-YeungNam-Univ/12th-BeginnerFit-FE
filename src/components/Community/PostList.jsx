import styled from "styled-components";
import { TimeText, TitleText } from "../../styles/GlobalStyle.jsx";
import { responsiveSize } from "../../utils/Mediaquery";
import { LuHeart } from "react-icons/lu";
import { GoComment } from "react-icons/go";
import { TimeCalculator } from "../../utils/TimeCalculator.jsx";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

export default function PostList() {
  //const [posts, setPosts] = useState([]);
  const TEST_SERVER_URL = import.meta.env.VITE_TEST_SERVER_URL;
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

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

  //게시글 불러오기함수
  const getPost = async () => {
    try {
      const response = await api.get("/posts");
      console.log("API Response:", response.data); // 응답 데이터 구조 확인
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  //apis 파일에 정리 필요

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        posts.map((post) => (
          <Link
            key={post.id}
            to={`/posts/${post.id}`}
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <ContentContaienr>
              <LeftContent>
                <TitleText>{post.title}</TitleText>
                <ContentText>{post.content}</ContentText>
                <IdText>{post.author}</IdText>
              </LeftContent>
              <RightContent>
                <TimeText>{TimeCalculator(post.createdAt)}</TimeText>
                <HeartCommentContainer>
                  <LuHeart />
                  <HeartCommentText>{post.likeCnt}</HeartCommentText>
                  <GoComment />
                  <HeartCommentText>{post.comments}</HeartCommentText>
                </HeartCommentContainer>
              </RightContent>
            </ContentContaienr>
          </Link>
        ))
      )}
    </>
  );
}

const ContentContaienr = styled.li`
  width: 100%;
  display: flex;
  cursor: pointer;
  padding: 10px 0;
  justify-content: space-between;
`;
const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ContentText = styled.div`
  font-size: ${responsiveSize("16")};
  font-weight: 400;
`;

const IdText = styled.span`
  font-size: ${responsiveSize("12")};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray02};
`;

const HeartCommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin-top: 5px;
`;

const HeartCommentText = styled.span`
  font-size: ${responsiveSize("12")};
  color: ${({ theme }) => theme.colors.gray02};
`;
