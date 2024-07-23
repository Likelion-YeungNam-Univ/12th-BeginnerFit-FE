import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header2 from "../components/Community/Header2";
import WriteBoardMain from "../components/Community/WriteBoardMain";
import { RowContainer, Wrapper } from "../styles/GlobalStyle";
import { BottomNavContainer } from "../components/BottomNav";
import { responsiveSize } from "../utils/Mediaquery";
import { FiChevronRight } from "react-icons/fi";
import { commentApi } from "../apis/commentApi";

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

  //댓글 작성관리
  const [comment, setComment] = useState("");
  const accessToken = "";

  const isCommentEmpty = comment.trim().length === 0;

  const handleCommentSubmit = async () => {
    //빈 댓글 작성 시 버튼 클릭 금지 및 비활성화
    if (isCommentEmpty) return;

    try {
      await commentApi(idx, comment, accessToken);
      //입력칸 초기화
      setComment("");
    } catch (error) {
      console.log("댓글 전송 실패", error);
    }
  };
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
      <BottomNavContainer>
        <RowContainer
          style={{ width: "100%", padding: `${responsiveSize("10")}` }}
        >
          <TextInput
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 입력하세요."
          ></TextInput>
          <SendButton onClick={handleCommentSubmit} disabled={isCommentEmpty}>
            <FiChevronRight
              style={{ height: "30px", width: "30px", color: "white" }}
            />
          </SendButton>
        </RowContainer>
      </BottomNavContainer>
    </>
  );
}
//============================================
const TextInput = styled.input`
  padding: ${responsiveSize("10")};
  border-radius: ${responsiveSize("30")};
  height: ${responsiveSize("35")};
  font-size: ${responsiveSize("20")};
  border: none;
  flex: 1;
  margin-right: ${responsiveSize("10")};
`;
const SendButton = styled.button`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  flex-shrink: 0;
  width: ${responsiveSize("50")};
  height: ${responsiveSize("50")};
  border: none;
  border-radius: 50%;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray03 : theme.colors.lightpurple};
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.2);
  }
`;
