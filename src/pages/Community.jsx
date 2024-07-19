import styled from "styled-components";
import { Mobile, PC, responsiveSize } from "../styles/Mediaquery";
import { useEffect, useState } from "react";

const AppWrapper = ({ children }) => {
  return (
    <Wrapper>
      <TestNav>Beginner Fit</TestNav>
      <Container>
        <MainContent>{children}</MainContent>
      </Container>
    </Wrapper>
  );
};

export default function Community() {
  //게시판 정보불러오기
  const [posts, setPosts] = useState([]);
  //JSON테스트 서버 주소
  const TEST_SERVER_URL = "http://localhost:3001";

  //게시글 더미 데이터 호출
  useEffect(() => {
    fetch(`${TEST_SERVER_URL}/posts`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <AppWrapper>
      {/* PC버전 */}
      <PC>
        <Title>Community</Title>
        <BtnContainer>
          <Button>자유게시판</Button>
          <Button>정보공유</Button>
        </BtnContainer>
        {posts.map((post) => (
          <ContentContaienr key={post.id}>
            <TitleContainer>
              <TitleAndTime>
                <TitleText>{post.title}</TitleText>
                <TimeText>{post.date}</TimeText>
              </TitleAndTime>
              <ContentText>{post.content}</ContentText>
              <IdText>{post.author}</IdText>
            </TitleContainer>
          </ContentContaienr>
        ))}
      </PC>
      {/* 모바일 버전 */}
      <Mobile>모바일버전</Mobile>
    </AppWrapper>
  );
}

//==========================================================
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TestNav = styled.nav`
  height: 48px;
  width: 100%;
  max-width: 600px;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 29px;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: white;
  height: 100vh;
`;
const MainContent = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border: solid 1px #d9d9d9;
  padding: 20px;
  box-sizing: border-box;
`;
const Title = styled.h1`
  font-size: ${responsiveSize("35")};
  font-weight: 600;
  text-align: left;
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Button = styled.button`
  width: fit-content;
  padding: 0 1rem;
  color: black;
  background-color: #d9d9d9;
  border: none;
  border-radius: ${responsiveSize("18")};
  height: ${responsiveSize("28")};
  font-size: ${responsiveSize("14")};
  cursor: pointer;
`;
const ContentContaienr = styled.div`
  width: 100%;
  display: flex;
  cursor: pointer;
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
const TitleText = styled.h3`
  font-size: ${responsiveSize("16")};
  font-weight: 600;
`;
const ContentText = styled.span`
  font-size: ${responsiveSize("16")};
  font-weight: 400;
`;
const IdText = styled.span`
  font-size: ${responsiveSize("12")};
  font-weight: 400;
  color: #00000080;
`;
const TimeText = styled.p`
  font-size: ${responsiveSize("12")};
  color: #00000080;
`;
