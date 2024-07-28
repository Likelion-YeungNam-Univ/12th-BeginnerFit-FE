import { create } from "zustand";
//유저정보 
export const useUserInfo = create((set) => ({
  user: {
    email: null,
    userId:0,
  },
  setUser: (user) => set({ user }),
}));
