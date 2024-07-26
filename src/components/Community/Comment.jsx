import styled from "styled-components";
import { responsiveSize } from "../../utils/Mediaquery";
import { RowContainer } from "../../styles/GlobalStyle";
import DropDown from "./DropDown";
import { useEffect, useState } from "react";
import profile from "../../images/profile.png";
import { FiChevronRight } from "react-icons/fi";
import { BottomNavContainer } from "../../components/BottomNav";
import { getCommentApi } from "../../apis/communityApi/getCommentApi";
import useCommentStore from "../../store/commentStore";
import { commentApi } from "../../apis/communityApi/commentApi";
import api from "../../apis/axios";

export default function Comment({ post }) {
  // 해당 게시글 댓글 불러오기
  const [comments, setComments] = useState([]);
  // 무한 스크롤 시 로딩
  const [isLoading, setIsLoading] = useState(false);
  // 더 불러올수 있는지 여부
  const [hasMore, setHasMore] = useState(true);
  // 댓글 5개씩 페이지네이션 페이지번호
  const [page, setPage] = useState(1);

  // 각 댓글 관리
  const [comment, setComment] = useState("");
  const isCommentEmpty = comment.trim().length === 0;

  const handleCommentSubmit = async () => {
    // 빈 댓글 작성 시 버튼 클릭 금지 및 비활성화
    if (isCommentEmpty) return;

    try {
      await commentApi(post.id, comment);
      // 입력칸 초기화
      setComment("");

      setPage(1);
      setComments([]);
      await getCommentApi(post.id, 1, setComments, setIsLoading, setHasMore);
    } catch (error) {
      console.log("댓글 전송 실패", error);
    }
  };

  // Zustand 이용한 댓글 수 관리
  const setCommentCount = useCommentStore((state) => state.setCommentCount);


  useEffect(() => {
    const fetchComments = async () => {
      setComments([]);
      setPage(1);
      setHasMore(true);
      await getCommentApi(post.id, 1, setComments, setIsLoading, setHasMore);
    };
    fetchComments();
  }, [post.id]);
  return (
    <>
      <CommentNum>댓글 {comments.length}개</CommentNum>
      {comments &&
        comments.map((comment, index) => (
          <CommentItem key={index}>
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
              <DropDown></DropDown>
            </RowContainer>
            <CommentContent>{comment.content}</CommentContent>
          </CommentItem>
        ))}
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
