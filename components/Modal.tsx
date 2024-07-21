"use client";

import useModal from "@/zustand/modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FC, ReactNode } from "react";

const Modal: FC<{ children: ReactNode }> = ({ children }) => {
  const { isOpen, setOpen } = useModal();

  return (
    <Dialog open={isOpen} onOpenChange={() => setOpen(!isOpen)}>
      <DialogContent className="max-w-2xl min-h-[20vh]">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
