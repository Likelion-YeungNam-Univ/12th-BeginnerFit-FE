import { create } from "zustand";

// FriendList에서 사용자 검색 데이터 저장할 state
export const useFriendSearchStore = create((set) => ({
  value: "",
  setValue: (value) => set(() => ({ value })),
}));
