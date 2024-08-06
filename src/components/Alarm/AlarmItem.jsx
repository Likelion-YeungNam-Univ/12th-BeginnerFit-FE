import React, { useEffect, useState } from "react";
import { Image } from "../../styles/GlobalStyle";
import styled from "styled-components";
import { useAlram } from "../../hooks/useAlarm";

export const AlarmItem = ({ type, data, time, userId, id, check }) => {
  const { url, text, clock, alarmCheck, handleOnFriend, handleImageClick } =
    useAlram({ type, check, id, data, time });

  return (
    <Wrap>
      {/*  안 읽은 알람일 때 빨간색 점 모양 보여주기 */}
      {!alarmCheck && <NotRead></NotRead>}
      <Container>
        <RowContainer>
          <Image
            src={url}
            alt={type}
            width={80}
            height={80}
            onClick={handleImageClick}
          />
          <P>{text}</P>
        </RowContainer>
        <Clock>{clock}</Clock>
      </Container>
      {/* 친구 요청 알람인 경우 거절 수락 버튼 띄우고 수락,거절 버튼이 눌렀으면 버튼 사라지게 구현*/}
      {type === "FRIEND_REQUEST" && (
        <Container>
          {!alarmCheck && (
            <>
              <Button
                $type="reject"
                onClick={() => handleOnFriend("reject", userId)}
              >
                거절
              </Button>
              <Button
                $type="sure"
                onClick={() => handleOnFriend("sure", userId)}
              >
                수락
              </Button>
            </>
          )}
        </Container>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
  border-radius: 10px;
  padding: 10px;
  background-color: ${({ $check }) => ($check ? "lightgray" : null)};
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 20px; */
`;

const RowContainer = styled.div`
  gap: 20px;
  display: flex;
`;

const P = styled.p`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Clock = styled.p`
  color: ${({ theme }) => theme.colors.gray02};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  cursor: pointer;
  width: 48%;
  border: none;
  padding: 10px;
  border-radius: 12px;
  color: white;
  transition: all 0.3s ease;
  background-color: ${({ $type }) => ($type === "sure" ? "black" : "#D9D9D9")};
  &:hover {
    background-color: gray;
  }
`;

const NotRead = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
  left: 70px;
`;
