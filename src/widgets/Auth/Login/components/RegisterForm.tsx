import Button from "@components/Button";
import Logo from "@components/Logo";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function RegisterForm() {
  return (
    <div className="w-[40vw] flex flex-col items-center justify-center relative h-screen">
      <Image
        src={"/bg2.svg"}
        alt=""
        className="w-full h-screen"
        width={1000}
        height={1000}
      />
      <div className="w-[70%] flex flex-col gap-8 absolute">
        <div className="w-full flex items-center justify-center">
          <Logo />
        </div>
        <div className="w-full flex items-center justify-center">
          <span className="text-xl">LOGIN</span>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <div className="flex-1">
                <span className="font-light text-sm italic">First Name </span>
                <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                  *
                </span>
                <input
                  type="text"
                  className=" w-full p-3 rounded-md bg-black-300 outline-none border-none"
                  placeholder="John"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <span className="font-light text-sm italic">Email</span>
                <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                  *
                </span>
                <input
                  type="text"
                  className=" w-full p-3 rounded-md bg-black-300 outline-none border-none"
                  placeholder="johndoe@gmail.com"
                />
              </div>
            </div>
          </div>
          <Button
            title="Login"
            className="w-full py-3 font-semibold bg-primary-700 rounded-md outline-none border-none "
          ></Button>
          <div className="flex gap-4 items-end justify-end">
            <div className="flex-1">
              <span className="text-sm">
               New to TEDx CCET?{" "}
                <Link
                  className="font-semibold text-primary-700"
                  href={"/register"}
                >
                  Signup
                </Link>
              </span>
            </div>
            <div className="flex-1 flex items-center justify-end">
              <span className="text-sm">Forgot password</span>
            </div>
          </div>
        </div>
      </div>
      <span className=" absolute text-sm bottom-4">
        For technical assistance.{" "}
        <Link href={"/"} className="font-semibold text-primary-700">
          Get help
        </Link>{" "}
      </span>
    </div>
  );
}
