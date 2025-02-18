import { RowContainer, TimeText, TitleText } from "../../styles/GlobalStyle";
import styled, { keyframes } from "styled-components";
import { IoPersonAddOutline } from "react-icons/io5";
import profile from "../../images/profile.png";
import { responsiveSize } from "../../utils/Mediaquery";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { TimeCalculator } from "../../utils/TimeCalculator";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import { FaCheck } from "react-icons/fa";
import useFetchData from "../../hooks/useFetchData";
import { useUserInfo } from "../../store/useUserInfo";
import { useLikeApi } from "../../apis/communityApi/useLikeApi";
import { motion } from "framer-motion";
import { usePostData } from "../../hooks/usePostData";
import AlarmDialog from "../../styles/AlarmDialog";
import { useNavigate } from "react-router-dom";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function WriteBoardMain({ post }) {
  const [totalComments, setTotalComments] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  //내 게시물인가
  const [isMyPost, setIsMyPost] = useState(false);
  //친구인가
  const [isMyFriend, setIsMyFriend] = useState(false);
  const navigate = useNavigate();

  // post가 없는 경우를
  useEffect(() => {
    if (!post) {
      AlarmDialog({
        title: "유효하지 않은 게시물입니다.",
        type: "error",
      });
      navigate(-1);
    }
  }, [post, navigate]);

  const { data, isLoading, error } = useFetchData(`/posts/${post?.id}`);
  const user = useUserInfo((state) => state.user);
  //친구 판단
  const { arr: friends, isLoading: friendsLoading } = useFetchData(`/friends`);
  const { arr: friendsPending, isLoading: friendsPendingLoading } =
    useFetchData(`/friends/pending`); //친구 요청대기
  const { arr: friendsWaiting, isLoading: friendsWaitingLoading } =
    useFetchData("/friends/waiting"); //친구 요청목록
  const postWriterId = post?.userId;
  //친구요청보내기
  const { postData } = usePostData(`/friends/request/${postWriterId}`);

  //내 게시물인지 판단.
  useEffect(() => {
    if (data && user) {
      setIsMyPost(Number(user.userId) === Number(postWriterId));
    }
  }, [data, user, postWriterId, isMyPost]);

  useEffect(() => {
    //아래 조건 다 만족하면(true) 친구가 아님(또는 요청 중)
    const isFriend =
      !friends.some((friend) => friend.id === postWriterId) &&
      !friendsPending.some((friend) => friend.id === postWriterId) &&
      !friendsWaiting.some((friend) => friend.id === postWriterId);
    setIsMyFriend(isFriend);
  }, [friends, friendsPending, friendsWaiting, postWriterId]);

  const { likeCnt, isLiked, toggleLikes, isLikeLoading } = useLikeApi(post);

  // 오류 처리 및 존재하지 않는 게시물인 경우 처리
  useEffect(() => {
    if (
      !isLoading &&
      !isLikeLoading &&
      !friendsLoading &&
      !friendsPendingLoading &&
      !friendsWaitingLoading &&
      error
    ) {
      AlarmDialog({
        title: "유효하지 않은 게시물입니다.",
        type: "error",
      });
      navigate(-1);
    }
  }, [error, isLoading, data, navigate]);

  if (
    isLoading ||
    isLikeLoading ||
    friendsLoading ||
    friendsPendingLoading ||
    friendsWaitingLoading
  )
    return <div>Loading...</div>;

  const handleClicked = () => {
    //알람 다이얼로그 띄우기
    AlarmDialog({
      title: "친구요청",
      text: "친구 요청을 보냈습니다.",
      type: "success",
    });
    //친구요청 보내기
    postData();
    //친구요청을 보낸 상태유지(체크표시유지)
    setIsClicked(true);
  };

  let content;
  //내 게시글인 경우
  if (isMyPost) content = null;
  //친구가 아닌 상태
  else if (isMyFriend) {
    content = (
      <IconHover onClick={handleClicked}>
        {isClicked ? (
          <AnimationCheck size={20} />
        ) : (
          <IoPersonAddOutline
            style={{
              width: `${responsiveSize("20")}`,
              height: "auto",
              cursor: "pointer",
            }}
          />
        )}
      </IconHover>
    );
  } //친구일 때
  else if (!isMyFriend) {
    content = (
      <IconHover>
        <AnimationCheck size={20} />
      </IconHover>
    );
  }

  return (
    <>
      <Container>
        <RowContainer>
          <ProfileImg src={profile} alt="Profile"></ProfileImg>
          <NickNameContainer>
            <TitleText>{post?.userName}</TitleText>
            <TimeText>{TimeCalculator(post?.createdAt)}</TimeText>
          </NickNameContainer>
          {/* 이미 친구이면 체크표시 */}
          {/* 친구가 아니면 +표시 */}
          {/* 내 게시물이면 친구 추가 버튼 없애기 */}
          {content}
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
          <motion.div
            className="box"
            whileHover={{ scale: 1.3 }}
            transition={{ type: "spring", damping: 1 }}
          >
            <Checkbox
              style={{ color: "red" }}
              {...label}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              checked={!!isLiked}
              onChange={toggleLikes}
            />
          </motion.div>
          <p>{likeCnt ?? 0}</p>
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

const fadeIn = keyframes`
  from{
    transform: scale(0);
  }
  to{
    transform: scale(1);
  }
`;
// 체크 버튼으로 변경될 때 애니메이션 적용
const AnimationCheck = styled(FaCheck)`
  animation: ${fadeIn} 0.5s ease;
`;
const IconHover = styled.div`
  padding: 5px;
  cursor: pointer;
  border-radius: 50px;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgba(217, 217, 217, 0.5);
  }
`;
