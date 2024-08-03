import React, { useEffect } from "react";
import Challenge from "../Main/Challenge";
import { useChallenge } from "../../store/useChallenge";
import { usePostData } from "../../hooks/usePostData";

export default function MyChallengeList() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  const { list3, setList, setCount, setList3, count } = useChallenge();

  const { data, isLoading, error, postData } = usePostData(
    "/challengeparticipant/completed-month-challenges"
  );

  useEffect(() => {
    if (data) {
      let arr = data.challenges.filter((item, idx) => idx <= 2);
      setList3(arr);
      setList(data.challenges);
      setCount(data.challenges.length);
    }
  }, [data]);

  useEffect(() => {
    postData({ year, month });
  }, []);

  return (
    <div>
      {list3.length === 0
        ? "완료한 챌린지가 없습니다!"
        : list3.map((item) => (
            <Challenge
              key={item.challengeId}
              index={item.challengeId}
              content={item.challengeContent}
              complete={true}
              handleCheck={() => {}}
            />
          ))}
    </div>
  );
}
