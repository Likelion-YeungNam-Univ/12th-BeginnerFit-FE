import { create } from "zustand";

export const useChallenge = create((set) => ({
  count: 0,
  list: [],
  list3: [],
  setList3: (newList) =>
    set(() => ({
      list3: newList,
    })),
  setList: (newList) =>
    set(() => ({
      list: newList,
    })),
  setCount: (count) =>
    set(() => ({
      count: count,
    })),
}));
