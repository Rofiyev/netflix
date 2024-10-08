"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { AiFillGithub } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa6";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="w-full h-screen">
      <div className="absolute inset-0 bg-slate-950">
        <Image
          src="/background.jpg"
          alt="image"
          fill
          className="opacity-50 object-cover"
        />
      </div>
      <div className="relative z-10 w-11/12 md:w-[600px] bg-black/60 rounded-md h-[50vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-4">
        <div className="flex items-center flex-col justify-center h-full">
          <h1 className="text-2xl sm:text-4xl font-bold">
            Welcome to Netflix App
          </h1>
          <p className="text-neutral-200 text-sm">
            Unlimited movies, TV shows, and more
          </p>

          <Button
            className="mt-4 flex items-center w-full h-10 sm:h-[56px] rounded bg-white text-neutral-800 hover:bg-gray-100 transition"
            onClick={() => signIn("google")}
          >
            <FcGoogle className="w-6 sm:w-7 h-6 sm:h-7 mr-2" />
            Sign in with Google
          </Button>
          <Button
            className="mt-4 flex items-center w-full h-10 sm:h-[56px] rounded !bg-gray-400 !text-white hover:!bg-gray-500 transition"
            onClick={() => signIn("github")}
          >
            <AiFillGithub className="w-6 sm:w-7 h-6 sm:h-7 mr-2" />
            Sign in with Github
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
