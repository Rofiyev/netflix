"use client";

import { menuItems } from "@/constants";
import { useGlobalContext } from "@/context";
import { usePathname, useRouter } from "next/navigation";
import { IoHomeOutline } from "react-icons/io5";
import { RiMovie2Fill, RiPlayList2Fill } from "react-icons/ri";
import { BiSolidMoviePlay } from "react-icons/bi";

const BottomNavbar = () => {
  const { setPageLoader } = useGlobalContext();
  const router = useRouter();
  const pathname = usePathname();

  const icons: JSX.Element[] = [
    <IoHomeOutline
      key={1}
      className={`text-2xl ${
        "/browse" === pathname && "text-red-500 text-3xl mb-1"
      }`}
    />,
    <RiMovie2Fill
      key={2}
      className={`text-2xl ${
        "/tv" === pathname && "text-red-500 text-3xl mb-1"
      }`}
    />,
    <BiSolidMoviePlay
      key={3}
      className={`text-2xl ${
        "/movies" === pathname && "text-red-500 text-3xl mb-1"
      }`}
    />,
    <RiPlayList2Fill
      key={4}
      className={`text-2xl ${
        "/my-list" === pathname && "text-red-500 text-3xl mb-1"
      }`}
    />,
  ];

  const changeRoute = (route: string) => {
    router.push(route);
    setPageLoader(true);
  };

  return (
    <div className="fixed z-50 bottom-0 left-0 w-screen h-14 bg-slate-900">
      <ul className={"flex justify-around items-center px-4 mt-1"}>
        {menuItems.map((item) => (
          <li
            onClick={() => changeRoute(item.route)}
            key={item.route}
            className={`w-20 h-20 flex flex-col p-1 rounded-full bg-slate-900 items-center cursor-pointer text-[16px] font-light text-[#e5e5e5] transition duration-[.4s] hover:text-[#b3b3b3] ${
              pathname === item.route && "-translate-y-7"
            }`}
          >
            {icons[+item.id - 1]}
            <span className={`${item.route === pathname && "text-red-500"}`}>
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BottomNavbar;
