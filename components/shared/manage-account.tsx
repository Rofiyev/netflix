"use client";

import Image from "next/image";
import { useState } from "react";
import { LockKeyhole, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import useModal from "@/zustand/modal";
import Modal from "../Modal";
import LoginAccountForm from "../form/login-account-form";
import CreateAccountForm from "../form/create-account-form";

const ManageAccount = () => {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [state, setState] = useState<"login" | "create">("create");
  const { setOpen } = useModal();

  const addAccountHandler = () => {
    setOpen(true);
    setState("create");
  };

  const switchAccountHandler = () => {
    setOpen(true);
    setState("login");
  };

  return (
    <div className="min-h-screen flex justify-center flex-col items-center relative">
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-white font-bold text-5xl my-12">Who`s Watching</h1>

        <ul className="flex p-0 my-12">
          <li
            onClick={switchAccountHandler}
            className="max-w-[200px] w-[155px] cursor-pointer flex flex-col items-center gap-3 min-w-[200px]"
          >
            <div className="relative">
              <div className="max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] object-cover w-[155px] h-[155px] relative">
                <Image src="/user.png" alt="image" fill />
              </div>
              {isDelete && (
                <div className="absolute transform bottom-0 z-10 cursor-pointer">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
              )}
            </div>
            <div className="flex gap-1">
              <span className="font-mono font-bold text-2xl">Dilshod</span>
              <LockKeyhole />
            </div>
          </li>
          <li
            onClick={addAccountHandler}
            className="border text-white bg-[#e5b109] font-bold text-xl border-black max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] w-[155px] h-[155px] cursor-pointer flex justify-center items-center"
          >
            Add account
          </li>
        </ul>

        <Button
          onClick={() => setIsDelete((prev: boolean) => !prev)}
          className="bg-transparent rounded-none hover:bg-transparent text-white border border-gray-100 cursor-pointer tracking-wide inline-flex text-sm px-[1.5em] py-[0.5em]"
        >
          Manage Profiles
        </Button>

        {/* Use Modal Provider */}
        <Modal>
          {state === "login" && <LoginAccountForm />}
          {state === "create" && <CreateAccountForm />}
        </Modal>
        {/* Use Modal Provider */}
      </div>
    </div>
  );
};

export default ManageAccount;
