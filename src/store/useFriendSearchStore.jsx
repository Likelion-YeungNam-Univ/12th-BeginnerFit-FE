import { create } from "zustand";

// FriendList에서 사용자 검색 데이터 저장할 store
export const useFriendSearchStore = create((set) => ({
  value: "",
  setValue: (value) => set(() => ({ value })),
}));

// 친구 숫자 저장할 store
export const useFriendNumStore = create((set) => ({
  num: 0,
  setNum: (num) => set(() => ({ num })),
}));
