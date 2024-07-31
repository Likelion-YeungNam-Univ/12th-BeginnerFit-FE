import React from "react";
import Challenge from "../Main/Challenge";
import useFecthData from "../../hooks/useFetchData";

const challengeList = [
  { content: "30분 이상 운동하기" },
  { content: "물 2L 이상 마시기" },
  { content: "헬스장 가기" },
];

export default function MyChallengeList() {
  return (
    <div>
      {challengeList.map((item, idx) => (
        <Challenge
          key={idx}
          index={idx + 1}
          content={item.content}
          complete={true}
          handleCheck={() => {}}
        />
      ))}
    </div>
  );
}
