"use client";

import Button from "@components/Button";
import Logo from "@components/Logo";
import showTedxToast from "@components/showTedxToast";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ResetPassword() {
  const router = useRouter();
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const params = useParams<{ token: string }>();

  const handleNewPassword = async () => {
    try {
      const response = await fetch("/api/reset/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: params.token,
          password,
          confirmPassword,
        }),
      });
  
      // Check if the response is OK (status code 200)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Password reset failed", {
          cause: errorData.desc,
        });
      }
  
      // If successful, show success toast and redirect to the login page
      const successData = await response.json();
      showTedxToast({
        type: "success",
        message: successData.message,
        desc: successData.desc,
      });
      router.push("/login");
    } catch (e: any) {
      console.error("Password reset error:", e);
      showTedxToast({
        type: "error",
        message: e.message,
        desc: e.cause,
      });
      router.push("/"); // Redirect to home or a relevant page on error
    }
  };
  
  // Added `params.token` as a dependency to run the effect when the token changes
  
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
          <span className="text-xl font-bold">Reset password</span>
          <input
            type="text"
            className="w-full py-4 rounded-lg px-2 bg-black-300 outline-none border-none0"
            placeholder="New password"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <input
            type="text"
            className="w-full py-4 rounded-lg px-2 bg-black-300 outline-none border-none0"
            placeholder="Confirm password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <Button
            title="Reset Password"
            className="w-full bg-primary-700 p-3 rounded-lg font-semibold"
            onClick={() => {
              handleNewPassword();
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
