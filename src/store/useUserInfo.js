import { create } from "zustand";
import { persist } from 'zustand/middleware'
//유저정보 
export const useUserInfo = create(
    persist(
        (set) => ({
            user: {
              email: null,
              userId: 0,
            },
            setUser: (user) => set({ user }),
          }),
          {
            name:"user-info",
            getStorage:()=>localStorage,
          }
    )
)
