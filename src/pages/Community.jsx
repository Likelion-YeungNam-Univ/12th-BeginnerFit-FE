import styled from "styled-components";
import { responsiveSize } from "../utils/Mediaquery";
import writebtn from "../images/writebtn.png";
import { Header } from "../layouts/header";
import CommunityButtons from "../components/Community/CommunityButtons";
import PostList from "../components/Community/PostList";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";

export default function Community() {
  const buttonList = ["자유게시판", "정보공유", "내가 쓴 글", "저장한 글"];
  //게시판 작성페이지 이동
  const navigate = useNavigate();
  const goToWritePost = () => {
    //useLocation으로 받기
    navigate("/posts/write", { state: { isEdit: false, post: null } });
  };
  return (
    <Wrapper>
      <Container>
        <MainContent>
          <Header type={"option"} size={"30"} />
          <RowContainer>
            <Title>Community</Title>
            <WriteImgBtn
              src={writebtn}
              alt="WriteBtn"
              onClick={goToWritePost}
            />
          </RowContainer>
          <CommunityButtons buttonList={buttonList} />
          <PostList />
        </MainContent>
      </Container>
      <BottomNav />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
const Container = styled.div`
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  height: 100vh;
`;
const MainContent = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: solid 1px ${({ theme }) => theme.colors.gray04};
  height: 100vh;
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
