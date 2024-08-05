import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import api from "../../apis/axios";
import { useEffect, useState } from "react";
import { useUserInfo } from "../../store/useUserInfo";
import AlarmDialog from "../../styles/AlarmDialog";

const ITEM_HEIGHT = 48;

export default function CommentDropDown({
  comment = null,
  onEditClick,
  loadComments,
  reloadComments,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = useUserInfo((state) => state.user);
  const myInfo = user?.userId;
  const isMyComment = myInfo === comment?.userId ? "mycomment" : "notmycomment";
  // post가 없을 경우 기본 UI만 렌더링
  if (isMyComment === "notmycomment") {
    return <></>;
  }
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

  // 옵션 구성 함수
  const setOptions = () => {
    switch (isMyComment) {
      // 자신이 작성한 댓글 -> 수정하기, 삭제하기
      case "mycomment":
        return [
          { label: "수정하기", action: "edit" },
          { label: "삭제하기", action: "delete" },
        ];
      // 자신이 작성하지 않은 댓글 -> 메뉴바 보이지않도록
      default:
        return [];
    }
  };

  const options = setOptions();

  // 댓글 삭제 함수
  const deleteComment = async () => {
    const confirmed = await AlarmDialog({
      title: "댓글 삭제",
      text: "정말로 이 댓글을 삭제하시겠습니까?",
      type: "warning",
      showCancel: true,
    });

    if (confirmed) {
      try {
        const response = await api.delete(`/posts/comments/${comment.id}`);
        response.data?.message || "댓글이 삭제되었습니다.";
        AlarmDialog({
          title: "댓글 삭제",
          type: "success",
          text: "댓글이 삭제되었습니다.",
        });
        reloadComments();
      } catch (error) {
        const errorMessage = error.response?.data?.message || "댓글 삭제 오류";
        AlarmDialog({
          title: "오류",
          type: "error",
          text: errorMessage,
        });
      }
    }
  };

  // 각 옵션별 수행 함수
  const handleAction = (action) => {
    switch (action) {
      case "edit":
        // 댓글 수정
        onEditClick(comment);
        break;
      //댓글 삭제
      case "delete":
        deleteComment();
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
