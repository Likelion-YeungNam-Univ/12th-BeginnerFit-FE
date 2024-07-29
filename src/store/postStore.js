import { create } from "zustand";
export const postStore = create((set) => ({
  //사진
  file: null,
  fileUrl: null,
  setFile: (file) => set({ file }),
  setFileUrl: (fileUrl) => set({ fileUrl }),
  //카테고리
  selecCategory: "자유게시판",
  //카테고리 선택
  setSelectCategory: (category) => set({ selectCategory: category }),
  //제목
  title: "",
  setTitle: (title) => set({ title }),
  //내용
  content: "",
  setContent: (content) => set({ content }),
}));
