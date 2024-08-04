import { create } from "zustand";

export const useAlarmStore = create((set) => ({
  // 안 읽은 알람 수 저장할 변수
  count: 0,
  // 안 읽은 알람 수 업데이트 함수
  setCount: (num) =>
    set(() => ({
      count: num,
    })),
}));
