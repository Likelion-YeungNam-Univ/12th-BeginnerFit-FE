import styled from "styled-components";
import { Mobile, PC, responsiveSize } from "../utils/Mediaquery";
import { useEffect, useState } from "react";
import writebtn from "../images/writebtn.png";
import Header from "../components/Community/Header";
import CommunityButtons from "../components/Community/CommunityButtons";
import PostList from "../components/Community/PostList";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const TEST_SERVER_URL = "http://localhost:3001";

  useEffect(() => {
    fetch(`${TEST_SERVER_URL}/posts`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.log(error));
  }, []);

  const buttonList = ["자유게시판", "정보공유", "내가 쓴 글", "저장한 글"];

  return (
    <Wrapper>
      <Container>
        <MainContent>
          <PC>
            <Header />
            <RowContainer>
              <Title>Community</Title>
              <WriteImgBtn src={writebtn} alt="WriteBtn" />
            </RowContainer>
            <CommunityButtons buttonList={buttonList} />
            <PostList posts={posts} />
          </PC>
          <Mobile>모바일버전</Mobile>
        </MainContent>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex-direction: column;
  align-items: center;
`;
const Container = styled.div`
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  height: 100%;
`;
const MainContent = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: solid 1px ${({ theme }) => theme.colors.gray04};
  padding: 20px;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Title = styled.h1`
  font-size: ${responsiveSize("35")};
  font-weight: 600;
  text-align: left;
`;
const WriteImgBtn = styled.img`
  width: ${responsiveSize("60")};
  height: ${responsiveSize("60")};
  margin-top: ${responsiveSize("20")};
  cursor: pointer;
`;
