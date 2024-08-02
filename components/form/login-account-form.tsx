"use client";

import { useState, FC } from "react";
import PinInput from "react-pin-input";
import { AccountResponse, IAccount } from "@/types";
import Loading from "../Loading";
import { toast } from "../ui/use-toast";
import axios from "axios";
import { useGlobalContext } from "@/context";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  currentAccount: IAccount | null;
}

const LoginAccountForm: FC<Props> = ({ currentAccount }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isError, setIsError] = useState<boolean>(false);
  const [pin, setPin] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setAccount } = useGlobalContext();

  async function onSubmit(value: string) {
    setIsLoading(true);
    try {
      const { data } = await axios.post<AccountResponse>("/api/account/login", {
        uid: currentAccount?.uid,
        accountId: currentAccount?._id,
        pin: value,
      });

      if (data.success) {
        setAccount(data.data as IAccount);
        sessionStorage.setItem("account", JSON.stringify(data.data));
        router.push(pathname);
        return toast({
          title: "Account unlocked",
          description: "Your account has been unlocked successfully",
        });
      } else {
        setIsError(true);
        return toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      return toast({
        title: "Error",
        description: "An error occurred while logging in!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-gray-400 font-bold text-[16px] mb-4">
        Profile Lock is currently ON
      </h1>
      {isError ? (
        <h2 className="text-red-500 text-center font-bold text-[20px]">
          Whoops, wrong PIN. Please tyr again
        </h2>
      ) : (
        <h2 className="text-red-500 text-center font-bold text-[20px]">
          Enter your PIN to access this profile
        </h2>
      )}

      <div className="flex items-center justify-center">
        <PinInput
          length={4}
          secret
          secretDelay={200}
          initialValue={pin}
          type="numeric"
          onChange={(value: string) => setPin(value)}
          style={{
            padding: "20px",
            display: "flex",
            gap: "10px",
          }}
          inputStyle={{
            color: "white",
            height: "70px",
            width: "70px",
            fontSize: "40px",
            borderRadius: "6px",
          }}
          onComplete={(value: string) => onSubmit(value)}
          disabled={isLoading}
          inputFocusStyle={{ borderColor: "white" }}
          autoSelect
        />

        {isLoading && <Loading className="ml-1" />}
      </div>
    </>
  );
};

export default LoginAccountForm;
