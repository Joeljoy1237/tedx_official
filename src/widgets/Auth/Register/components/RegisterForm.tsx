import Button from "@components/Button";
import Logo from "@components/Logo";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function RegisterForm() {
  return (
    <div className="w-[100vw] md:w-[40vw] lg:w-[40vw] flex flex-col items-center lg:justify-center relative min-h-[100vh] pt-96 md:pt-0 lg:pt-0 py-[30vh] md:py-[10vh] lg:py-0  shadow-xl">
      <Image
        src={"/bg2.svg"}
        alt=""
        className="w-full h-screen"
        width={1000}
        height={1000}
      />
      <div className="md:w-[85%] lg:w-[85%] w-[90vw] flex flex-col gap-8 absolute">
        <div className="w-full flex items-center justify-center">
          <Logo />
        </div>
        <div className="w-full flex items-center justify-center">
          <span className="text-xl">Sign up</span>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 flex-col md:flex-row lg:flex-row">
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
              <div className="flex-1">
                <span className="font-light text-sm italic">Last Name </span>
                <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                  *
                </span>
                <input
                  type="text"
                  className=" w-full p-3 rounded-md bg-black-300 outline-none border-none"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="flex gap-4 flex-col md:flex-row lg:flex-row">
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
              <div className="flex-1">
                <span className="font-light text-sm italic">Mobile Number</span>
                <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                  *
                </span>
                <input
                  type="text"
                  className=" w-full p-3 rounded-md bg-black-300 outline-none border-none fontNormal"
                  placeholder="9876543210"
                />
              </div>
            </div>
            <div className="flex gap-4 flex-col md:flex-row lg:flex-row">
              <div className="flex-1">
                <span className="font-light text-sm italic">
                  Organisation/College
                </span>
                <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                  *
                </span>
                <input
                  type="text"
                  className=" w-full p-3 rounded-md bg-black-300 outline-none border-none"
                  placeholder="Google LLC"
                />
              </div>
              <div className="flex-1">
                <span className="font-light text-sm italic">Password</span>
                <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                  *
                </span>
                <input
                  type="text"
                  className=" w-full p-3 rounded-md bg-black-300 outline-none border-none"
                  placeholder="!password"
                />
              </div>
            </div>
          </div>
          <Button
            title="Signup"
            className="w-full py-3 font-semibold bg-primary-700 rounded-md outline-none border-none "
          ></Button>
          <div className="flex gap-4 items-center justify-between">
            <div className="flex items-center justify-start">
              <span className="text-xs md:text-sm lg:text-sm">
                Already have an account?{" "}
                <Link
                  className="font-semibold text-primary-700"
                  href={"/login"}
                >
                  Login
                </Link>
              </span>
            </div>
            <div className="flex items-center justify-end">
              <span className="text-xs md:text-sm lg:text-sm">
                Forgot password
              </span>
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
