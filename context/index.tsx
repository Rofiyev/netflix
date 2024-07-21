"use client";

import { ChildProps, ContextType } from "@/types";
import { FC, createContext, useContext, useState } from "react";

export const Context = createContext<ContextType | undefined>(undefined);

const GlobalContext: FC<ChildProps> = ({ children }) => {
  const [account, setAccount] = useState(null);

  return <Context.Provider value={{ account }}>{children}</Context.Provider>;
};

export default GlobalContext;

export const useGlobalContext = () => {
  const context = useContext<ContextType | undefined>(Context);

  if (!context) throw new Error("Context value is undefined");

  return context;
};
