import React, { useEffect, useState } from "react";
import user from "../../images/user.png";
import { User } from "./User";
import { useFriendSearchStore } from "../../store/useFriendSearchStore";
import useFetchData from "../../hooks/useFetchData";

// 서버로 부터 사용자 전체 받아오기
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

export const UserList = () => {
  // input값 가져오기
  const { value } = useFriendSearchStore();

  // 친구 목록 받아오는 코드 ( 현재 친구가 없어서 mock 데이터로 사용하겠습니다. )
  const { data, isLoading, error } = useFetchData("/friends");

  useEffect(() => {
    console.log(data, error);
  }, [data]);

  const [searchUser, setSearchUser] = useState(null);

  // 무분별한 filter를 막기위해 0.3초 동안 입력이 없을 경우 해당 함수 수행
  useEffect(() => {
    const timer = setTimeout(() => {
      // 아무것도 입력안 했을 때는 전체 사용자 가져오기
      if (value == "") {
        setSearchUser(userList);
        return;
      } else {
        let arr = userList.filter((item) =>
          item.nickname.toLowerCase().includes(value.toLowerCase())
        );
        setSearchUser(arr);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);
  return (
    <div>
      {searchUser?.map((item) => (
        <User
          type="delete"
          key={item.id}
          id={item.id}
          nickname={item.nickname}
          image={item.image}
        />
      ))}
    </div>
  );
};
