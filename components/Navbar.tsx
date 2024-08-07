"use client";

import Image from "next/image";
import { menuItems } from "@/constants";
import { AiOutlineSearch } from "react-icons/ai";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGlobalContext } from "@/context";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import MoviePopup from "@/components/shared/movie/movie-popup";
import axios from "axios";
import { IAccount, AccountResponse } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { account, setAccount, setPageLoader } = useGlobalContext();
  const { data: session }: any = useSession();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<AccountResponse>(
          `/api/account?uid=${session.user.uid}`
        );
        data.success && setAccounts(data.data as IAccount[]);
      } catch (e) {
        return toast({
          title: "Error",
          description: "An error occurred while fetching your accounts",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (session) getData();
  }, [session]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    sessionStorage.removeItem("account");
    signOut();
    setAccount(null);
  };

  return (
    <div className={"relative"}>
      <header
        className={cn(
          "header h-[10vh] transition-all duration-400 ease-in-out",
          isScrolled && "bg-background/80 backdrop-blur-md"
        )}
      >
        <div className={"flex items-center h-full space-x-2 md:space-x-10"}>
          <Image
            src="/netflix.png"
            width={120}
            height={120}
            alt="NETFLIX"
            className="cursor-pointer object-contain"
            onClick={() => {
              router.push("/browse");
              setPageLoader(true);
            }}
          />
          <ul className={"hidden md:space-x-4 md:flex cursor-pointer"}>
            {menuItems.map((item) => (
              <li
                onClick={() => {
                  router.push(item.route);
                  setPageLoader(true);
                }}
                key={item.route}
                className={
                  "cursor-pointer text-[16px] font-light text-[#e5e5e5] transition duration-[.4s] hover:text-[#b3b3b3]"
                }
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <MoviePopup />

        <div className={"font-light flex items-center space-x-4 text-sm"}>
          {showSearchBar ? (
            <SearchBar setShowSearchBar={setShowSearchBar} />
          ) : (
            <AiOutlineSearch
              onClick={() => setShowSearchBar((prev) => !prev)}
              className={"hidden sm:inline sm:w-6 sm:h-6 cursor-pointer"}
            />
          )}

          <Popover>
            <PopoverTrigger>
              <div className="flex gap-2 items-center cursor-pointer">
                <Image
                  width={30}
                  height={30}
                  src="/user.png"
                  className="max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"
                  alt="Current Profile"
                />
                <p>{account && account.name}</p>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              {isLoading ? (
                <div className={"flex flex-col space-y-4"}>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className={"w-full h-14"} />
                  ))}
                </div>
              ) : (
                accounts &&
                accounts.map((account: IAccount) => (
                  <div
                    className={
                      "cursor-pointer flex gap-3 h-14 hover:bg-slate-800 rounded-md items-center px-4 py-2"
                    }
                    key={account._id}
                    onClick={() => {
                      setAccount(null);
                      sessionStorage.removeItem("account");
                    }}
                  >
                    <Image
                      width={30}
                      height={30}
                      src="/user.png"
                      alt="Current Profile"
                      className="max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"
                    />
                    <p>{account.name}</p>
                  </div>
                ))
              )}

              <button
                onClick={logout}
                className={
                  "mt-4 text-center w-full text-sm font-light hover:bg-slate-800 rounded-md py-2 border border-white/40 h-[40px]"
                }
              >
                Sign out of Netflix
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </header>
    </div>
  );
};

export default Navbar;