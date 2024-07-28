import styled from "styled-components";
import { TimeText, TitleText } from "../../styles/GlobalStyle.jsx";
import { responsiveSize } from "../../utils/Mediaquery";
import { LuHeart } from "react-icons/lu";
import { GoComment } from "react-icons/go";
import { TimeCalculator } from "../../utils/TimeCalculator.jsx";
import { Link } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData.jsx";
import useCommentStore from "../../store/commentStore.js";
import { useEffect } from "react";
import { getCommentApi } from "../../apis/communityApi/getCommentApi.jsx";

export default function PostList({ category }) {
  let setUrl;
  if (category === "내가 쓴 글") {
    setUrl = "/posts/me";
  } else if (category === "저장한 글") {
    //
  } else {
    setUrl = `/posts/categories/${category}`;
  }
  const { arr, loading } = useFetchData(setUrl);

  //댓글 수 관리
  const commentCounts = useCommentStore((state) => state.commentCounts);
  const setCommentCount = useCommentStore((state) => state.setCommentCount);

  useEffect(() => {
    async function loadInitialCommentCounts() {
      if (arr && arr.length > 0) {
        for (const post of arr) {
          await getCommentApi(
            post.id,
            1,
            () => {},
            null,
            () => {}
          );
        }
      }
    }

    loadInitialCommentCounts();
  }, [arr, setCommentCount]);
  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        arr.map((post) => (
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
                  <HeartCommentText>
                    {commentCounts[post.id] || 0}
                  </HeartCommentText>
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
