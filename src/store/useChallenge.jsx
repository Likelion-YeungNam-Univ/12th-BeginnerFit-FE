import { create } from "zustand";

export const useChallenge = create((set) => ({
  list: [],
  setList: (newList) =>
    set(() => ({
      list: newList,
    })),
}));
