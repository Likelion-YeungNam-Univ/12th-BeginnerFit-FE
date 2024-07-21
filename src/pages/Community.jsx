import styled from "styled-components";
import logo from "../images/logo.png";
import { Mobile, PC, responsiveSize } from "../utils/Mediaquery";
import { useEffect, useState } from "react";
import DropDown from "../components/Community/DropDown";
import writebtn from "../images/writebtn.png";
import { LuHeart } from "react-icons/lu";
import { GoComment } from "react-icons/go";
import {TimeCalculator} from '../utils/TimeCalculator.jsx';

const AppWrapper = ({ children }) => {
  return (
    <Wrapper>
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

  //버튼 리스트
  const buttonList = ["자유게시판", "정보공유", "내가 쓴 글", "저장한 글"];

  return (
    <AppWrapper>
      {/* PC버전 */}
      <PC>
        <RowContainer>
          <Header src={logo} />
          <DropDown />
        </RowContainer>
        <RowContainer>
          <Title>Community</Title>
          <WriteImgBtn src={writebtn} />
        </RowContainer>
        <BtnContainer>
          {buttonList.map((item, index) => (
            <Button key={index}>{item}</Button>
          ))}
        </BtnContainer>
        {posts.map((post) => (
          <ContentContaienr key={post.id}>
            <TitleContainer>
              <TitleAndTime>
                <TitleText>{post.title}</TitleText>
                <TimeText>{TimeCalculator(post.date)}</TimeText>
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

const Header = styled.img`
  height: 35px;
  width: auto;
  max-width: 600px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const WriteImgBtn = styled.img`
  width: ${responsiveSize("60")};
  height: ${responsiveSize("60")};
  margin-top: ${responsiveSize("20")};
  cursor: pointer;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  height: 100vh;
`;
const MainContent = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: ${({ theme }) => theme.colors.white};
  border: solid 1px ${({ theme }) => theme.colors.gray04};
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
  color: ${({ theme }) => theme.colors.gray02};
  background-color: ${({ theme }) => theme.colors.gray01};
  border: none;
  border-radius: ${responsiveSize("18")};
  height: ${responsiveSize("28")};
  font-size: ${responsiveSize("14")};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }
`;
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
  color: ${({ theme }) => theme.colors.gray02};
`;
const TimeText = styled.p`
  font-size: ${responsiveSize("12")};
  color: ${({ theme }) => theme.colors.gray02};
`;
const HeartCommentText = styled.a`
  font-size: ${responsiveSize("12")};
  color: ${({ theme }) => theme.colors.gray02};
`;
