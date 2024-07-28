
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import api from "../../apis/axios";
import { useEffect, useState } from "react";
import { useUserInfo } from "../../store/useUserInfo";

const ITEM_HEIGHT = 48;

export default function CommentDropDown({ comment=null,onEditClick }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const user=useUserInfo((state)=>state.user);
  console.log(user);
  const myInfo=user?.userId;
  // post가 없을 경우 기본 UI만 렌더링
  if (!comment) {
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
  const isMyComment = myInfo === comment?.userId ? "mycomment" : "notmycomment";

  // 옵션 구성 함수
  const setOptions = () => {
    switch (isMyComment) {
      // 자신이 작성한 댓글 -> 수정하기, 삭제하기
      case "mycomment":
        return [
          { label: "수정하기", action: "edit" },
          { label: "삭제하기", action: "delete" },
        ];
      // 자신이 작성하지 않은 댓글 -> 신고하기, 저장하기
      case "notmycomment":
        return [
          { label: "신고하기", action: "report" },
          { label: "저장하기", action: "save" },
        ];
      default:
        return [];
    }
  };

  const options = setOptions();

  // 댓글 삭제 함수
  const deleteComment = async () => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      try {
        const response = await api.delete(`/posts/comments/${comment.id}`);
        const message = response.data?.message || "댓글이 삭제되었습니다.";
        console.log(message);
        alert("댓글이 삭제되었습니다.");
        
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "댓글 삭제 오류";
        console.log(errorMessage, error);
        alert(errorMessage);
      }
    }
  };

  // 댓글 신고 함수(API가 존재하지 않음)
//   const reportPost = async () => {
//     if (comment?.id === undefined) {
//       alert("댓글 ID가 유효하지 않습니다.");
//       return;
//     }
//     if (window.confirm("정말로 이 댓글을 신고하시겠습니까?")) {
//       try {
//         const response = await api.post(`/posts/${post.id}/declarations`);
//         console.log(response);
//         alert("게시물이 신고되었습니다.");
//         // 게시물 목록으로 이동
//         navigate("/posts");
//       } catch (error) {
//         console.log("게시물 신고 오류", error);
//       }
//     }
//   };

  // 각 옵션별 수행 함수
  const handleAction = (action) => {
    switch (action) {
      case "edit":
        // 댓글 수정 
        onEditClick();
        break;
      //댓글 삭제
      case "delete":
        deleteComment();
        break;
    //   // 게시물 신고
    //   case "report":
    //     reportPost();
    //     break;
      default:
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
