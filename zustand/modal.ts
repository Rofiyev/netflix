import { create } from "zustand";

type ModalType = {
  isOpen: boolean;
  setOpen: (val: boolean) => void;
};

const useModal = create<ModalType>((set) => ({
  isOpen: false,
  setOpen: (val: boolean) => set({ isOpen: val }),
}));

export default useModal;
