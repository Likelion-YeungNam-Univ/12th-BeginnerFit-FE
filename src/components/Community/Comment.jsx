import styled from "styled-components";
import { responsiveSize } from "../../utils/Mediaquery";
import { RowContainer } from "../../styles/GlobalStyle";
import DropDown from "./DropDown";
import axios from "axios";
import { useEffect, useState } from "react";
import profile from "../../images/profile.png";
import Button from "@mui/material/Button";

export default function Comment({ post }) {
  //테스트 서버
  const TEST_SERVER_URL = import.meta.env.VITE_TEST_SERVER_URL;

  //해당 게시글 댓글 불러오기
  const [comments, setComments] = useState([]);
  //무한 스크롤 시 로딩
  const [isLoading, setIsLoading] = useState(false);
  //더 불러올수 있는지 여부
  const [hasMore, setHasMore] = useState(true);
  //댓글 5개씩 페이지네이션 페이지번호
  const [page, setPage] = useState(1);

  //댓글 불러오는 함수
  const getComment = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const response = await axios.get(
        //실제 서버 주소
        //${SERVER_URL}/posts/${post.id}/comments

        //테스트용
        `${TEST_SERVER_URL}/comments${post.id}`,
        {
          params: {
            page: page,
            size: 5,
          },
        }
      );

      const newComments = response.data;
      if (Array.isArray(newComments) && newComments.length > 0) {
        setComments((prevComments) => [...prevComments, ...newComments]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(newComments.length == 5);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("댓글을 불러오는 중 오류가 발생했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setComments([]);
    setPage(1);
    setHasMore(true);
    getComment();
  }, [post.id]);

  //5개씩 더보기 함수
  const handleLoadMore = () => {
    getComment();
  };

  return (
    <>
      <CommentNum>댓글 {comments.length}개</CommentNum>
      {comments.map((comment, index) => (
        <CommentItem key={index}>
          <RowContainer>
            <UserContainer>
              <Profile src={profile}></Profile>
              <NickAndDate>
                <NickName>{comment.username}</NickName>
                <Date>{comment.createdAt.substring(0, 10)}</Date>
              </NickAndDate>
            </UserContainer>
            <DropDown></DropDown>
          </RowContainer>
          <CommentContent>{comment.content}</CommentContent>
        </CommentItem>
      ))}
      {hasMore && (
        <Button
          variant="contained"
          size="medium"
          style={{
            backgroundColor: "#7D7AFF",
          }}
          onClick={handleLoadMore}
          disabled={isLoading}
        >
          {isLoading ? "불러오는 중..." : "더 보기"}
        </Button>
      )}
    </>
  );
}

const CommentNum = styled.h6`
  font-size: ${responsiveSize("20")};
  text-align: start;
`;
//유저 이름 사진 컨테이너
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
