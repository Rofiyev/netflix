"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { LockKeyhole, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import useModal from "@/zustand/modal";
import Modal from "../Modal";
import LoginAccountForm from "../form/login-account-form";
import CreateAccountForm from "../form/create-account-form";
import { AccountResponse, IAccount } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "../ui/use-toast";
import { ACCOUNT_LIMIT } from "@/config";
import { Skeleton } from "../ui/skeleton";

const ManageAccount = () => {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [state, setState] = useState<"login" | "create">("create");
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [currentAccount, setCurrentAccount] = useState<IAccount | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setOpen } = useModal();
  const { data: session }: any = useSession();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<AccountResponse>(
          `/api/account?uid=${session?.user?.uid}`
        );
        data.data && setAccounts(data.data as IAccount[]);
      } catch (error) {
        return toast({
          title: "Error creating",
          description: "An error occurred while creating your account!",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [session]);

  useEffect(() => setOpen(false), [setOpen]);

  const addAccountHandler = () => {
    setOpen(true);
    setState("create");
  };

  const switchAccountHandler = (account: IAccount) => {
    if (isDelete) return;
    setOpen(true);
    setState("login");
    setCurrentAccount(account);
  };

  const onDelete = async (id: string) => {
    try {
      const isConfirmed = confirm(
        "Are you sure, you want to delete this account?"
      );
      if (isConfirmed) {
        const { data } = await axios.delete<AccountResponse>(
          `/api/account?id=${id}`
        );
        if (data.success) {
          setAccounts(
            accounts.filter((account: IAccount) => account._id !== id)
          );
          return toast({
            title: "Account deleted successfully",
            description: "Your account had been deleted successfully",
          });
        } else {
          return toast({
            title: "Error",
            description: data.message,
            variant: "destructive",
          });
        }
      }
    } catch (e) {
      return toast({
        title: "Error deleting",
        description: "There is a problem deleting the account!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center flex-col items-center relative pb-4">
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-white font-bold text-4xl sm:text-5xl my-12">
          Who`s Watching
        </h1>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {Array.from({ length: 4 }).map((_, i: number) => (
              <div className="flex flex-col" key={i}>
                <Skeleton className="max-w-[180px] rounded min-w-[84px] max-h-[200px] min-h-[84px] object-cover w-[155px] h-[155px]" />
                <Skeleton className="h-4 w-11/12 mx-auto mt-3" />
              </div>
            ))}
          </div>
        ) : (
          <ul
            className={`w-full h-full grid grid-cols-2 gap-y-4 p-0 my-12 ${
              accounts.length >= 2 && "md:grid-cols-3"
            } ${accounts.length > 3 && "lg:grid-cols-4"}`}
          >
            {Array.isArray(accounts) &&
              accounts.map((account: IAccount) => (
                <li
                  key={account._id}
                  onClick={() => switchAccountHandler(account)}
                  className="max-w-[180px] w-[155px] cursor-pointer flex flex-col items-center gap-3 min-w-[180px]"
                >
                  <div className="relative">
                    <div className="max-w-[200px] min-w-[84px] max-h-[200px] min-h-[84px] object-cover w-[155px] h-[155px] relative">
                      <Image
                        src="/user.png"
                        alt="image"
                        fill
                        className="rounded"
                      />
                    </div>
                    {isDelete && (
                      <div
                        onClick={() => onDelete(account._id)}
                        className="absolute transform bottom-0 z-10 cursor-pointer bg-slate-900 p-1 rounded-tr"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </div>
                    )}
                    <div className="absolute top-1 left-1">
                      <LockKeyhole className="text-white opacity-60" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-1">
                    <span className="font-mono font-bold text-xl text-nowrap">
                      {account.name}
                    </span>
                  </div>
                </li>
              ))}

            {accounts.length < ACCOUNT_LIMIT && !isLoading && (
              <li
                onClick={addAccountHandler}
                className="border text-white bg-[#e5b109] font-bold text-xl border-black max-w-[180px] rounded min-w-[84px] max-h-[180px] min-h-[84px] w-[155px] h-[155px] cursor-pointer flex justify-center items-center ml-3"
              >
                Add account
              </li>
            )}
          </ul>
        )}

        <Button
          onClick={() => setIsDelete((prev: boolean) => !prev)}
          className="bg-transparent rounded-none hover:bg-transparent text-white border border-gray-100 cursor-pointer tracking-wide inline-flex text-sm px-[1.5em] py-[0.5em]"
        >
          Manage Profiles
        </Button>

        {/* Use Modal Provider */}
        <Modal>
          {state === "login" && (
            <LoginAccountForm currentAccount={currentAccount} />
          )}
          {state === "create" && (
            <CreateAccountForm
              uid={session?.user?.uid}
              accounts={accounts}
              setAccounts={setAccounts}
            />
          )}
        </Modal>
        {/* Use Modal Provider */}
      </div>
    </div>
  );
};

export default ManageAccount;
