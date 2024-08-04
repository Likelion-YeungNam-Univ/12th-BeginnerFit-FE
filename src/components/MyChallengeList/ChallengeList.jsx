import React from "react";
import Challenge from "../Main/Challenge";
import { useChallenge } from "../../store/useChallenge";

export const ChallengeList = () => {
  const { list } = useChallenge();

  return (
    <div>
      {list.map((item, idx) => (
        <Challenge
          key={item.challengeId}
          index={item.challengeId}
          content={item.challengeContent}
          complete={item.completed}
          handleCheck={() => {}}
        />
      ))}
    </div>
  );
};
