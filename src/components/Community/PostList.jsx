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

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  //게시글 불러오기함수
  const getPost = async () => {
    try {
      const response = await axios.get(`${TEST_SERVER_URL}/posts`);
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);
  // useEffect(() => {
  //   fetch(`${TEST_SERVER_URL}/posts`)
  //     .then((response) => response.json())
  //     .then((data) => setPosts(data))
  //     .catch((error) => console.log(error));
  // }, []);

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
            <ContentContaienr key={post.id}>
              <TitleContainer>
                <TitleAndTime>
                  <TitleText>{post.title}</TitleText>
                  <TimeText>{TimeCalculator(post.createdAt)}</TimeText>
                </TitleAndTime>
                <ContentText>{post.content}</ContentText>
                <RowContainer>
                  <IdText>{post.author}</IdText>
                  <HeartCommentContainer>
                    <LuHeart />
                    <HeartCommentText>{post.likes}</HeartCommentText>
                    <GoComment />
                    <HeartCommentText>{post.comments}</HeartCommentText>
                  </HeartCommentContainer>
                </RowContainer>
              </TitleContainer>
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
`;
//제목 내용 아이디 컨테이너박스
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
//타이틀+시간 컨테이너 박스
const TitleAndTime = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
//좋아요,하트 컨테이너 박스
const HeartCommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const ContentText = styled.span`
  font-size: ${responsiveSize("16")};
  font-weight: 400;
`;
const IdText = styled.span`
  font-size: ${responsiveSize("12")};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray02};
`;

const HeartCommentText = styled.a`
  font-size: ${responsiveSize("12")};
  color: ${({ theme }) => theme.colors.gray02};
`;
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
