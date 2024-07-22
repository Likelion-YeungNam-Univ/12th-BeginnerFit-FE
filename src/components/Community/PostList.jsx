import styled from "styled-components";
import { TimeText, TitleText } from "../../styles/GlobalStyle.jsx";
import { responsiveSize } from "../../utils/Mediaquery";
import { LuHeart } from "react-icons/lu";
import { GoComment } from "react-icons/go";
import { TimeCalculator } from "../../utils/TimeCalculator.jsx";

export default function PostList({ posts }) {
  return (
    <>
      {posts.map((post) => (
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
      ))}
    </>
  );
}
const ContentContaienr = styled.div`
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
