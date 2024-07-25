import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header2 from "../components/Community/Header2";
import WriteBoardMain from "../components/Community/WriteBoardMain";
import { RowContainer, Wrapper } from "../styles/GlobalStyle";
import { BottomNavContainer } from "../styles/GlobalStyle";
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

  //댓글 작성관리
  const [comment, setComment] = useState("");
  const isCommentEmpty = comment.trim().length === 0;

  const handleCommentSubmit = async () => {
    //빈 댓글 작성 시 버튼 클릭 금지 및 비활성화
    if (isCommentEmpty) return;

    try {
      await commentApi(idx, comment);
      //입력칸 초기화
      setComment("");
    } catch (error) {
      console.log("댓글 전송 실패", error);
    }
  };
  return (
    <Wrapper style={{ minHeight: "100vh" }}>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Header2 />
          <WriteBoardMain post={post} />
        </>
      )}

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
    </Wrapper>
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
