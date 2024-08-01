import React, { useEffect, useState } from "react";
import { User } from "./User";
import { MainH3 } from "../../styles/GlobalStyle";
import user from "../../images/user.png";
import { usePostData } from "../../hooks/usePostData";
import { useFriendSearchStore } from "../../store/useFriendSearchStore";
import styled from "styled-components";

export const AddUserList = () => {
  // 유저 정보 담을 state
  const [userList, setUserList] = useState([]);

  // 검색 값 저장할 value
  const { value, setValue } = useFriendSearchStore();

  // 친구 검색 요청할 post 함수 가져오기
  const { data, isLoading, postData } = usePostData("/friends/non-friends");

  // 친구 검색 api 연동 입력값이 없을 때는 빈 배열로 초기화
  useEffect(() => {
    const timer = setTimeout(async () => {
      // 검색 값이 빈 문자열이 아닌 경우 실행
      if (value !== "") {
        let postdata = await postData({ searchName: value });
        if (postdata) {
          setUserList(postdata);
        }
      } else {
        // 검색 값이 빈 문자열인 경우 빈배열로 초기화
        setUserList([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  // 첫 랜더링 시 inpurt 검색값 빈 문자열로 초기화
  useEffect(() => {
    setValue("");
  }, []);

  // 아무것도 입력하지 않았을 때 랜더링
  if (value === "") return <P>친구 닉네임을 입력하세요!</P>;

  // 로딩중이면 로딩중이라고 띄우기
  if (isLoading) return <P>Loading...</P>;

  return (
    <div>
      {userList?.length === 0 ? (
        <P>검색 결과가 없습니다.</P>
      ) : (
        userList?.map((item) => (
          <User
            key={item.id}
            id={item.id}
            nickname={item.name}
            image={item.profileUrl ?? user}
          />
        ))
      )}
    </div>
  );
};

const P = styled.p`
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.gray02};
`;
