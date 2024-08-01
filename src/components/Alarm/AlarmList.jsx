import React from "react";
import { AlarmItem } from "./AlarmItem";

// 임시 데이터
const alarm = [
  { type: "add", data: "yeongi" },
  { type: "completedFriend", data: 5 },
  { type: "completedChallenge" },
  { type: "remainChallenge", data: 3 },
  { type: "completedFriend", data: 5 },
];

export const AlarmList = () => {
  return (
    <div>
      {alarm.map((item) => (
        <AlarmItem {...item} />
      ))}
    </div>
  );
};
