import styled from "styled-components";
import { responsiveSize } from "../../utils/Mediaquery";
import { RowContainer } from "../../styles/GlobalStyle";
import profile from "../../images/profile.png";
import { FiChevronRight } from "react-icons/fi";
import { BottomNavContainer } from "../../styles/GlobalStyle";
import { useComment } from "../../hooks/useComment";
import { useRef, useCallback, useState, useEffect } from "react";
import CommentDropDown from "./CommentDropDown";
import api from "../../apis/axios";
import { useUserInfo } from "../../store/useUserInfo";
import AlarmDialog from "../../styles/AlarmDialog";

export default function Comment({ post }) {
  const {
    comments,
    comment,
    setComment,
    handleCommentSubmit,
    isCommentEmpty,
    loadComments,
    isLoading,
    hasMore,
    reloadComments,
  } = useComment(post);
  const [sortedComment, setSortedComment] = useState([]);

  const observer = useRef();
  const lastCommentElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadComments();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, loadComments]
  );

  //댓글 수정 텍스트입력
  const [editCommentText, setEditCommentText] = useState("");
  //수정 상태인가
  const [isEditMode, setIsEditMode] = useState(false);
  //수정할 댓글 id
  const [commentId, setCommentId] = useState(null);

  //댓글 수정 함수
  const handleOnEditClick = (comment) => {
    setIsEditMode(true);
    setEditCommentText(comment.content);
    setCommentId(comment.id);
  };
  const editComment = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/posts/comments/${commentId}`, {
        content: editCommentText,
      });
      AlarmDialog({
        title:"댓글 수정",
        text:"댓글이 수정되었습니다.",
        type:"success"
      })
      // alert(message);
      setIsEditMode(false);
      setEditCommentText("");
      setCommentId(null);
      reloadComments();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "댓글 수정 오류";
      AlarmDialog({
        title:"오류",
        text:"댓글 수정에 실패했습니다.",
        type:"error",
      })
    }
  };
  //댓글 최신순 정리
  useEffect(() => {
    if (comments) {
      const sortedComment = [...comments].sort((a, b) => b.id - a.id);
      setSortedComment(sortedComment);
    }
  }, [comments]);

  //자신의 댓글인지 확인
  const user = useUserInfo((state) => state.user);

  return (
    <>
      <Container>
        <CommentNum>댓글 {sortedComment.length}개</CommentNum>
        {sortedComment &&
          sortedComment.map((comment) => (
            // 내 댓글인가

            <CommentItem
              key={comment.id}
              ref={
                comment.id === sortedComment.length - 1
                  ? lastCommentElementRef
                  : null
              }
            >
              <RowContainer>
                <UserContainer>
                  <Profile src={profile}></Profile>
                  <NickAndDate>
                    <NickName>{comment.username}</NickName>
                    <Date>
                      {comment.createdAt
                        ? comment.createdAt.substring(0, 10)
                        : "날짜없음"}
                    </Date>
                  </NickAndDate>
                </UserContainer>
                {/* 내 댓글이면 드롭메뉴 안보이기 */}
                <CommentDropDown
                  comment={comment}
                  onEditClick={handleOnEditClick}
                  loadComments={loadComments}
                  reloadComments={reloadComments}
                />
              </RowContainer>
              <CommentContent>{comment.content}</CommentContent>
            </CommentItem>
          ))}
      </Container>
      <BottomNavContainer>
        <RowContainer
          style={{ width: "100%", padding: `${responsiveSize("10")}` }}
        >
          {isEditMode ? (
            <Form onSubmit={editComment}>
              <TextInput
                type="text"
                value={editCommentText}
                onChange={(e) => setEditCommentText(e.target.value)}
              />
              <SendButton type="submit" disabled={!editCommentText.trim()}>
                <FiChevronRight
                  style={{ height: "30px", width: "30px", color: "white" }}
                />
              </SendButton>
            </Form>
          ) : (
            <>
              <TextInput
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="댓글을 입력하세요."
              ></TextInput>
              <SendButton
                onClick={handleCommentSubmit}
                disabled={isCommentEmpty}
              >
                <FiChevronRight
                  style={{ height: "30px", width: "30px", color: "white" }}
                />
              </SendButton>
            </>
          )}
        </RowContainer>
      </BottomNavContainer>
    </>
  );
}

const CommentNum = styled.h6`
  font-size: ${responsiveSize("20")};
  text-align: start;
`;

// 유저 이름 사진 컨테이너
const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const Profile = styled.img`
  width: ${responsiveSize("30")};
  height: ${responsiveSize("30")};
  border-radius: 50%;
`;

const NickAndDate = styled.div`
  margin-left: ${responsiveSize("10")};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const NickName = styled.a`
  font-size: ${responsiveSize("16")};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
`;

const Date = styled.a`
  font-size: ${responsiveSize("12")};
  color: ${({ theme }) => theme.colors.gray02};
`;

const CommentContent = styled.pre`
  font-size: ${responsiveSize("16")};
  color: ${({ theme }) => theme.colors.black};
  font-weight: 400;
  word-wrap: break-word;
  white-space: pre-wrap;
`;

const CommentItem = styled.div`
  margin-bottom: ${responsiveSize("20")};
`;

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
const Container = styled.div`
  padding: 0px 20px;
  height: 100vh;
  overflow-y: auto;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
`;
