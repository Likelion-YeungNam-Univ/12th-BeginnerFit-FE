import styled from "styled-components";
import { TimeText, TitleText } from "../../styles/GlobalStyle.jsx";
import { responsiveSize } from "../../utils/Mediaquery";
import { LuHeart } from "react-icons/lu";
import { GoComment } from "react-icons/go";
import { TimeCalculator } from "../../utils/TimeCalculator.jsx";
import { Link } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData.jsx";
import useCommentStore from "../../store/commentStore.js";
import { useEffect, useState } from "react";
import { getCommentApi } from "../../apis/communityApi/getCommentApi.jsx";
import Pagination from "./Pagination.jsx";
import { motion } from "framer-motion";
export default function PostList({ category }) {
  //페이지네이션
  //한 페이지당 보여줄 게시물의 개수
  const [limitPage, setLimitPage] = useState(6);
  //해당 페이지의 첫 게시물 위치
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limitPage;

  let setUrl;
  if (category === "내가 쓴 글") {
    setUrl = "/posts/me";
  } else if (category === "저장한 글") {
    //저장되는 지 확인해야 할 듯.
    setUrl = "/posts/scraps/me";
  } else {
    setUrl = `/posts/categories/${category}`;
  }
  const { arr, loading, total } = useFetchData(setUrl);

  //댓글 수 관리
  const commentCounts = useCommentStore((state) => state.commentCounts);
  const setCommentCount = useCommentStore((state) => state.setCommentCount);
  //게시글 날짜순 정렬(최신순이 더 위에 오도록)
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (arr) {
      const sortedPosts = [...arr].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts);
    }
  }, [arr]);
  useEffect(() => {
    async function loadInitialCommentCounts() {
      if (arr && arr.length > 0) {
        for (const post of arr) {
          const postId = category === "저장한 글" ? post.postInfo?.id : post.id;
          await getCommentApi(
            postId,
            1,
            () => {},
            null,
            () => {}
          );
        }
      }
    }

    loadInitialCommentCounts();
  }, [arr, setCommentCount, category]);
  return (
    <motion.div
      key={page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
    >
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        posts.slice(offset, offset + limitPage).map((post) => {
          const currentPost = category === "저장한 글" ? post.postInfo : post;
          //예외처리
          if (!currentPost) return null;
          return (
            <Link
              key={currentPost.id}
              to={`/posts/${currentPost.id}`}
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <ContentContaienr>
                <LeftContent>
                  <TitleText>{currentPost.title}</TitleText>
                  <ContentText>{currentPost.content}</ContentText>
                  <IdText>{currentPost.author}</IdText>
                </LeftContent>
                <RightContent>
                  <TimeText>{TimeCalculator(currentPost.createdAt)}</TimeText>
                  <HeartCommentContainer>
                    <LuHeart />
                    <HeartCommentText>{currentPost.likeCnt}</HeartCommentText>
                    <GoComment />
                    <HeartCommentText>
                      {commentCounts[currentPost.id] || 0}
                    </HeartCommentText>
                  </HeartCommentContainer>
                </RightContent>
              </ContentContaienr>
            </Link>
          );
        })
      )}
      <Page>
        <Pagination
          total={total}
          limit={limitPage}
          page={page}
          setPage={setPage}
        />
      </Page>
    </motion.div>
  );
}
const Page = styled.div`
  align-items: center;
  display: flex;
  margin-top: 20px;
  left: 50%;
  transform: translateX(-50%);
  justify-content: center;
  position: fixed;
  bottom: 100px;
`;
const ContentContaienr = styled.li`
  width: 100%;
  display: flex;
  cursor: pointer;
  margin-top: 10px;
  padding: 10px 0;
  border-radius: ${responsiveSize(15)};
  justify-content: space-between;
  transition: all 0.5s ease;
  &:hover {
    scale: calc(105%);
    background-color: ${({ theme }) => theme.colors.gray01};
  }
`;
const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ContentText = styled.div`
  font-size: ${responsiveSize("16")};
  text-overflow: ellipsis;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  font-weight: 400;
  -webkit-box-orient: vertical;
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
