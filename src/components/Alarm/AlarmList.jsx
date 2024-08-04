import React, { useEffect, useState } from "react";
import { AlarmItem } from "./AlarmItem";
import useFetchData from "../../hooks/useFetchData";
import { useAlarmStore } from "../../store/useAlarmStore";
export const AlarmList = () => {
  // 알람 데이터 저장할 state
  const [alarmList, setAlarmList] = useState([]);

  // 안읽은 알람 수 저장할 함수 가져오는 코드
  const { setCount } = useAlarmStore();

  // 알람 데이터 불러오는 코드
  const { data, isLoading, error } = useFetchData("/alarm");

  useEffect(() => {
    if (data) {
      console.log(data);
      // 안 읽은 알람 수 저장할 변수
      let count = 0;

      // 알림 안 읽은 갯수 카운트
      // sort문 안에 작성하니 이상하게 동작하여 따로 반복문을 돌도록 수정하였습니다
      data.forEach((item) => {
        if (!item.alarmChecked) count++;
      });
      // 최신 순으로 업데이트
      let arr = data.sort((a, b) => {
        return new Date(b.alarmDate) - new Date(a.alarmDate);
      });

      setCount(count);
      setAlarmList(arr);
    }
  }, [data]);

  return (
    <div>
      {data && alarmList.length === 0
        ? "알림이 없어요!"
        : data?.map((item) => (
            <AlarmItem
              type={item.alarmType}
              data={item.alarmMessage}
              time={item.alarmDate}
              id={item.alarmId}
              key={item.alarmId}
              userId={item.userId}
              check={item.alarmChecked}
            />
          ))}
    </div>
  );
};
