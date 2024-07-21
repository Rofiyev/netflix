"use client";

import { useState } from "react";
import PinInput from "react-pin-input";
import { Loader2 } from "lucide-react";

const LoginAccountForm = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [pin, setPin] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(value: string) {
    setIsLoading(true);
    console.log(value);
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

        {isLoading && <Loader2 className="animate-spin" />}
      </div>
    </>
  );
};

export default LoginAccountForm;
