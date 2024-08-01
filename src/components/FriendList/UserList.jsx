import React, { useEffect, useState } from "react";
import user from "../../images/user.png";
import { User } from "./User";
import {
  useFriendSearchStore,
  useFriendNumStore,
} from "../../store/useFriendSearchStore";
import useFetchData from "../../hooks/useFetchData";
import api from "../../apis/axios";

export const UserList = () => {
  // 서버에서 받아올 유저 리스트
  const [users, setUsers] = useState(null);

  // 검색한 유저 정보 담을 state
  const [searchUser, setSearchUser] = useState(null);

  // input값 가져오기
  const { value } = useFriendSearchStore();

  // 친구 수 저장할 함수 가져오기
  const { setNum } = useFriendNumStore();

  // 친구 목록 받아오는 코드
  const { data, isLoading, error } = useFetchData("/friends");

  // 받아온 데이터 users state에 저장
  useEffect(() => {
    let arr = data?.map((item) => {
      return {
        id: item.id,
        nickname: item.name,
        image: item.profilePictureUrl ?? user,
      };
    });
    setNum(arr && arr.length); // 친구 수 저장
    setUsers(arr);
  }, [data]);

  // 친구 삭제 버튼 눌렀을 때 실행할 함수
  // 현재는 화면에서만 지우는데 백엔드에서 api 완료되면 삭제 요쳥까지 추가하기
  const handleDelete = (id) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      let arr = users.filter((item) => item.id !== id);
      setNum(arr.length); // 친구 삭제후 숫자 저장
      setUsers(arr);
      // 서버에게 삭제 요청 보내기
      api.delete(`/friends/${id}`);
    }
  };

  // 무분별한 filter를 막기위해 0.3초 동안 입력이 없을 경우 해당 함수 수행
  useEffect(() => {
    const timer = setTimeout(() => {
      // 아무것도 입력안 했을 때는 전체 사용자 가져오기
      if (value == "") {
        setSearchUser(users);
        return;
      } else {
        let arr = users?.filter((item) =>
          item.nickname.toLowerCase().includes(value.toLowerCase())
        );
        setSearchUser(arr);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [value, data, users]);

  // 서버에서 데이터 받아오는 중이면 Loading 출력
  if (isLoading) return "Loading...";

  return (
    <div>
      {searchUser?.map((item) => (
        <User
          type="delete"
          key={item.id}
          id={item.id}
          nickname={item.nickname}
          image={item.image}
          onClick={() => handleDelete(item.id)}
        />
      ))}
    </div>
  );
};
