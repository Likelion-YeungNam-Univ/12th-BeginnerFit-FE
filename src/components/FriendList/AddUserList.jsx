import React from "react";
import { User } from "./User";
import user from "../../images/user.png";
// mock 데이터 ( 서버에서 검색한 값 가져오기 )
const userList = [
  { id: 1, nickname: "zoedhj", image: user },
  { id: 2, nickname: "ywamcgj", image: user },
  { id: 3, nickname: "qmbvsz", image: user },
  { id: 4, nickname: "xpjaf", image: user },
  { id: 5, nickname: "gftrwb", image: user },
  { id: 6, nickname: "utdjlg", image: user },
  { id: 7, nickname: "ekzn", image: user },
  { id: 8, nickname: "bnqozga", image: user },
  { id: 9, nickname: "vjocb", image: user },
  { id: 10, nickname: "hwxdp", image: user },
  { id: 11, nickname: "lymuo", image: user },
];
export const AddUserList = () => {
  return (
    <div>
      {userList?.map((item) => (
        <User
          key={item.id}
          id={item.id}
          nickname={item.nickname}
          image={item.image}
        />
      ))}
    </div>
  );
};
