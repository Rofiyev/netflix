"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { IAccount, ChildProps, ContextType, MovieProps } from "@/types";

export const Context = createContext<ContextType | null>(null);

const GlobalContext = ({ children }: ChildProps) => {
  const [account, setAccount] = useState<IAccount | null>(null);
  const [pageLoader, setPageLoader] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [movie, setMovie] = useState<MovieProps | null>(null);

  useEffect(() => {
    setAccount(JSON.parse(sessionStorage.getItem("account")!));
  }, []);

  return (
    <Context.Provider
      value={{
        account,
        setAccount,
        pageLoader,
        setPageLoader,
        open,
        setOpen,
        movie,
        setMovie,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default GlobalContext;

export const useGlobalContext = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error("useGlobalContext must be used within a GlobalContext");
  }
  return context;
};
