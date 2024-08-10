import { create } from "zustand";

type SearchInputType = {
  isOpenSearchInput: boolean;
  setOpenSearchInput: (val: boolean) => void;
};

const UseSearchInput = create<SearchInputType>((set) => ({
  isOpenSearchInput: false,
  setOpenSearchInput: (val: boolean) => set({ isOpenSearchInput: val }),
}));

export default UseSearchInput;
