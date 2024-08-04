"use client";
import Button from "@components/Button";
import Logo from "@components/Logo";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import showTedxToast from "@components/showTedxToast";

export default function RegisterForm() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      // Redirect to home page
      router.push("/");
    }
  }, [status, session, router]);

  const handleSignIn = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault(); // Prevent default form submission behavior
    setIsSubmitting(true);
  
    try {
      // Validate input fields
      if (!email && !password) {
        throw new Error(JSON.stringify({
          message: "Please fill the required fields",
          desc: "Email and password are required"
        }));
      }
  
      if (!email) {
        throw new Error(JSON.stringify({
          message: "Email is required"
        }));
      } else if (!password) {
        throw new Error(JSON.stringify({
          message: "Password is required"
        }));
      }
  
      // Perform sign-in
      const response = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
  
      // Check response and handle success
      if (response?.ok) {
        const data = response?.error ? JSON.parse(response.error) : { message: "Login Successfully", desc: "Redirecting to home page" };
        
        showTedxToast({
          type: "success",
          message: data.message, // Show the success message from the response
          desc: data.desc, // Optionally, show the description from the response
        });
  
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        throw new Error(JSON.stringify({
          message: "User not found",
          desc: "Please check your email and password"
        }));
      }
    } catch (err: any) {
      // Handle errors
      const error = JSON.parse(err.message || "{}");
  
      showTedxToast({
        type: "error",
        message: error.message, // Show the error message
        desc: error.desc , // Optionally, show the error description
      });
  
      setIsSubmitting(false); // Ensure to stop submitting state regardless of outcome
    }
  };
  

  return (
    <div className="md:w-[40vw] lg:w-[40vw] w-[90vw] flex flex-col items-center justify-center relative h-screen">
      <Image
        src={"/bg2.svg"}
        alt=""
        className="w-full h-screen"
        width={1000}
        height={1000}
      />
      <div className="md:w-[70%] lg:w-[70%] w-[100%] flex flex-col gap-8 absolute">
        <div className="w-full flex items-center justify-center">
          <Link href={"/"}>
            {" "}
            <Logo />
          </Link>
        </div>
        <div className="w-full flex items-center justify-center">
          <span className="text-xl">LOGIN</span>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <span className="font-light text-sm italic">Password</span>
                <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                  *
                </span>
                <input
                  type="password"
                  className=" w-full p-3 rounded-md bg-black-300 outline-none border-none"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <Button
            title={isSubmitting ? "Please wait ..." : "Login"}
            disabled={isSubmitting}
            onClick={handleSignIn}
            className="w-full py-3 font-semibold bg-primary-700 rounded-md outline-none border-none "
          ></Button>
          <div className="flex gap-4 items-end justify-between">
            <div className="flex items-center justify-start">
              <span className="text-xs md:text-sm lg:text-sm">
                New to TEDx CCET?{" "}
                <Link
                  className="font-semibold text-primary-700"
                  href={"/register"}
                >
                  Signup
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
