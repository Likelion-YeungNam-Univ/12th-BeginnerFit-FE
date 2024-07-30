import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import api from "../../apis/axios";
import useFetchData from "../../hooks/useFetchData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ITEM_HEIGHT = 48;

export default function DropDown({ post = null }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  // 자신의 게시물 서치
  const {
    data: myInfo,
    isLoading: isMyInfoLoading,
    error: myInfoError,
  } = useFetchData("/users/me");

  if (isMyInfoLoading) return <div>Loading...</div>;
  if (myInfoError) return <div>Error loading user info</div>;

  // post가 없을 경우 기본 UI만 렌더링
  if (!post) {
    return (
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
    );
  }
  if (!myInfo) {
    return <div>Loading user info...</div>;
  }
  console.log("내정보 id:", myInfo[0].id);
  console.log("게시물정보 id:", post.userId);
  const isMyPost = myInfo[0]?.id === post?.userId ? "mypost" : "notmypost";

  // 옵션 구성 함수
  const setOptions = () => {
    switch (isMyPost) {
      // 자신이 작성한 게시물 -> 수정하기, 삭제하기
      case "mypost":
        return [
          { label: "수정하기", action: "edit" },
          { label: "삭제하기", action: "delete" },
        ];
      // 자신이 작성하지 않은 게시물 -> 신고하기, 저장하기
      case "notmypost":
        return [
          { label: "신고하기", action: "report" },
          { label: "저장하기", action: "save" },
        ];
      default:
        return [];
    }
  };

  const options = setOptions();

  // 게시물 삭제 함수
  const deletePost = async () => {
    if (window.confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      try {
        const response = await api.delete(`/posts/${post.id}`);
        const message = response.data?.message || "게시물이 삭제되었습니다.";
        console.log(message);
        alert("게시물이 삭제되었습니다.");
        // 게시물 목록으로 이동
        navigate("/posts");
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "게시물 삭제 오류";
        console.log(errorMessage, error);
        alert(errorMessage);
      }
    }
  };

  // 게시물 신고 함수
  const reportPost = async () => {
    if (post?.id === undefined) {
      alert("게시물 ID가 유효하지 않습니다.");
      return;
    }
    if (window.confirm("정말로 이 게시물을 신고하시겠습니까?")) {
      try {
        const response = await api.post(`/posts/${post.id}/declarations`);
        console.log(response);
        alert("게시물이 신고되었습니다.");
        // 게시물 목록으로 이동
        navigate("/posts");
      } catch (error) {
        console.log("게시물 신고 오류", error);
      }
    }
  };

  //게시물 저장함수
  const scrapPost = async () => {
    if (post?.id === undefined) {
      alert("게시물 ID가 유효하지 않습니다.");
      return;
    }
    try {
      const response = await api.post(`/posts/${post.id}/scraps`);
      console.log(response);
      alert("게시물이 저장되었습니다.");
    } catch (error) {
      console.log("게시물 저장 오류", error);
    }
  };
  // 각 옵션별 수행 함수
  const handleAction = (action) => {
    switch (action) {
      case "edit":
        // 게시글 수정 이동
        navigate(`/posts/edit`, { state: { isEdit: true, post: post } });
        break;
      // 게시물 삭제
      case "delete":
        deletePost();
        break;
      // 게시물 신고
      case "report":
        reportPost();
        break;
        //게시물 저장
      case "save":
        scrapPost();
        break;
    }
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.label}
            onClick={() => {
              handleAction(option.action);
              handleClose();
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
