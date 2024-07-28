import { RowContainer, TimeText, TitleText } from "../../styles/GlobalStyle";
import styled from "styled-components";
import { IoPersonAddOutline } from "react-icons/io5";
import profile from "../../images/profile.png";
import { responsiveSize } from "../../utils/Mediaquery";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { TimeCalculator } from "../../utils/TimeCalculator";
import { useState } from "react";
import Comment from "./Comment";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function WriteBoardMain({post}) {
  //좋아요 기능함수
  const [clickLike, setClickLike] = useState(false);
  //const [likes, setLikes] = useState(post.likes);
  const [totalComments, setTotalComments] = useState(0);

  return (
    <>
      <Container>
        <RowContainer>
          <ProfileImg
            src={ profile}
            alt="Profile"
          ></ProfileImg>
          <NickNameContainer>
            <TitleText>{post?.userName}</TitleText>
            <TimeText>{TimeCalculator(post?.createdAt)}</TimeText>
          </NickNameContainer>
          <IoPersonAddOutline
            style={{
              width: `${responsiveSize("20")}`,
              height: "auto",
              cursor: "pointer",
            }}
          />
        </RowContainer>
        <TitleContentContainer>
          <Title>{post?.title}</Title>
          <ContentText>{post?.content}</ContentText>
        </TitleContentContainer>
        {/* 통신해서 이미지가 있을 때만 띄우기 */}
        {post?.pictureUrl && (
          <Image alt={post?.pictureUrl} src={post?.pictureUrl}></Image>
        )}
        {/* 하트 체크박스 */}
        <HeartContainer>
          <Checkbox
            style={{ color: "red", border: "black" }}
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={clickLike}
            //onChange={toggleLike}
          />
          <p>{}</p>
        </HeartContainer>
      </Container>
      <RowLine />
      <Comment post={post} setTotalComments={setTotalComments} />
    </>
  );
}
const Container = styled.div`
  padding: 0px 20px;
`;
const ProfileImg = styled.img`
  width: ${responsiveSize("60")};
  height: ${responsiveSize("60")};
`;
const NickNameContainer = styled.div`
  position: absolute;
  flex-direction: column;
  justify-content: center;
  margin-left: ${responsiveSize("70")};
`;
//제목 내용컨테이너
const TitleContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Title = styled.h2`
  font-size: ${responsiveSize("30")};
  color: ${({ theme }) => theme.colors.black};
`;
const ContentText = styled.div`
  font-size: ${responsiveSize("20")};
  color: ${({ theme }) => theme.colors.black};
`;
const Image = styled.img`
  margin-top: ${responsiveSize("20")};
  width: 100%;
  height: auto;
  border-radius: ${responsiveSize("30")};
`;

const RowLine = styled.hr`
  width: min(600px, 100%);
  border: none;
  height: ${responsiveSize("18")};
  background-color: ${({ theme }) => theme.colors.gray01};
`;
//하트랑 좋아요갯수 컨테이너
const HeartContainer = styled.div`
  display: flex;
  justify-content: end;
  padding: 0 ${responsiveSize("10")};
`;
