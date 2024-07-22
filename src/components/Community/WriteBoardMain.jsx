import { RowContainer, TimeText, TitleText } from "../../styles/GlobalStyle";
import styled from "styled-components";
import { IoPersonAddOutline } from "react-icons/io5";
import profile from "../../images/profile.png";
import { responsiveSize } from "../../utils/Mediaquery";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { TimeCalculator } from "../../utils/TimeCalculator";
import axios from "axios";
import { useState } from "react";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function WriteBoardMain({ post }) {
  //테스트 서버주소
  const TEST_SERVER_URL = import.meta.env.VITE_TEST_SERVER_URL;
  //좋아요 기능함수
  const [clickLike, setClickLike] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  console.log(post.likes);

  const toggleLike = async () => {
    //사용자가 좋아요 누르면 갱신
    try {
      const url = `${TEST_SERVER_URL}/posts/${post.id}`;
      const newLikes = clickLike ? likes - 1 : likes + 1;

      //서버에 좋아요 요청
      await axios.patch(url, { likes: newLikes });
      //상태 업뎃
      setLikes(newLikes);
      setClickLike(!clickLike);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <RowContainer style={{ marginTop: `${responsiveSize("50")}` }}>
        <ProfileImg src={post.profileUrl || profile} alt="Profile"></ProfileImg>
        <NickNameContainer>
          <TitleText>{post.userName}</TitleText>
          <TimeText>{TimeCalculator(post.createdAt)}</TimeText>
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
        <Title>{post.title}</Title>
        <ContentText>{post.content}</ContentText>
      </TitleContentContainer>
      {/* 통신해서 이미지가 있을 때만 띄우기 */}
      {post.pictureUrl && <Image src={post.pictureUrl}></Image>}
      {/* 하트 체크박스 */}
      <HeartContainer>
        <Checkbox
          style={{ color: "red", border: "black" }}
          {...label}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          checked={clickLike}
          onChange={toggleLike}
        />
        <p>{likes}</p>
      </HeartContainer>
      <RowLine />
    </>
  );
}
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
  position: absolute;
  left: 0;
  right: 0;
  width: ${responsiveSize("600")};
  height: ${responsiveSize("18")};
  background-color: ${({ theme }) => theme.colors.gray01};
`;
//하트랑 좋아요갯수 컨테이너
const HeartContainer = styled.div`
  display: flex;
  justify-content: end;
  padding: 0 ${responsiveSize("10")};
`;
