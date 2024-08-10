"use client";

import React, { useState, KeyboardEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import { useGlobalContext } from "@/context";
import UseSearchInput from "@/zustand/searchInput";

const SearchBar = () => {
  const { setOpenSearchInput } = UseSearchInput();
  const [query, setQuery] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const { setPageLoader } = useGlobalContext();

  const handleKeySubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query && query.trim() !== "") {
      setPageLoader(true);
      if (pathname !== "/search") router.replace(`/search/${query}`);
      else router.push(`/search/${query}`);
    }
  };

  return (
    <div className={"flex justify-center items-center text-center"}>
      <div className="bg-[rgba(0,0,0,0.75)] border border-[hsla(0,0%,100%,0.5)] rounded-sm pr-2 items-center text-center flex">
        <div className={"order-2"}>
          <input
            placeholder={"Search Movies, TV and Dramas"}
            className="bg-transparent text-[14px] font-medium h-[34px] py-2 placeholder:text-[14px] font-md text-white outline-none w-[210px]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={handleKeySubmit}
          />
        </div>
        <button className="px-2.5">
          <AiOutlineSearch
            onClick={() => setOpenSearchInput(false)}
            className="inline w-6 h-6 cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
