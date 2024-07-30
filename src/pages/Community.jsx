import styled from "styled-components";
import { responsiveSize } from "../utils/Mediaquery";
import writebtn from "../images/writebtn.png";
import { Header } from "../layouts/header";
import CommunityButtons from "../components/Community/CommunityButtons";
import PostList from "../components/Community/PostList";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
export default function Community() {
  const buttonList = ["자유게시판", "정보공유", "내가 쓴 글", "저장한 글"];
  //자유게시판을 디폴트값으로
  const [selectCategory, setSelectCategory] = useState(buttonList[0]);

  //게시판 작성페이지 이동
  const navigate = useNavigate();
  const [key, setKey] = useState(selectCategory);
  const goToWritePost = () => {
    //useLocation으로 받기
    navigate("/posts/write", { state: { isEdit: false, post: null } });
  };
  useEffect(() => {
    setKey(selectCategory);
  }, [selectCategory]);

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
          <CommunityButtons
            buttonList={buttonList}
            setSelectCategory={setSelectCategory}
            selectCategory={selectCategory}
          />
          <AnimatePresence>
            <motion.div
              key={key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
            >
              <PostList category={selectCategory} />
            </motion.div>
          </AnimatePresence>
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
