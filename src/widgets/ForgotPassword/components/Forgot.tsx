"use client"

import Button from "@components/Button";
import Logo from "@components/Logo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Forgot() {
  const [mail, setMail] = useState("");
  const router = useRouter();
  const handleReset = async () => {
    try {
      const response = await fetch("/api/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: mail,
        }),
      });
      if (response.ok) {
        alert("Check your mail");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 relative">
      <Image
        src={"/forgot.png"}
        className="w-full h-[100vh] object-cover bg-center"
        width={1000}
        height={1000}
        alt=""
      />
      <div className="absolute top-0 left-0 w-full h-screen items-center justify-center flex flex-col gap-14">
        <div className="">
          <Link href={"/"} className="w-[1rem]">
            <Image
              src={"/Logo.svg"}
              alt=""
              width={1000}
              height={1000}
              className="w-[17rem]"
            />
          </Link>
        </div>
        <div className="shadow-lg md:w-[30vw] lg:w-[30vw] w-[90vw] flex flex-col items-start justify-center gap-4">
          <span className="text-xl font-bold">Forgot your Password ?</span>
          <span className="">
            Please enter the email address which you'd like your password reset
            information sent to
          </span>
          <input
            type="text"
            className="w-full py-4 rounded-lg px-2 bg-black-300 outline-none border-none0"
            placeholder="Email address"
            onChange={(e) => {
              setMail(e.target.value);
            }}
          />
            <Button
              title="Request reset link"
              className="w-full bg-primary-700 p-3 rounded-lg font-semibold"
              onClick={()=>{
                handleReset()
              }}
            />
          <Link href={"/login"} className="w-full">
            <Button
              title="Back to login"
              className="w-full text-primary-700 p-3 rounded-lg font-semibold"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
