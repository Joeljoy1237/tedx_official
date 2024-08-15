"use client";
import Button from "@components/Button";
import Logo from "@components/Logo";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import showTedxToast from "@components/showTedxToast";
import { useSession } from "next-auth/react";

export default function RegisterForm() {
  const router = useRouter();

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [designation, setDesignation] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEnterPress = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if('key' in event && event.key == "Enter") {
      handleSignUp(event);
    }
  }
  const handleSignUp = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          mobile,
          organisation,
          designation,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json(); // Parse the response data
        // await signIn("credentials", {
        //   email,
        //   password,
        //   redirect: false,
        // });
        showTedxToast({
          type: "success",
          message: data.message, // Show the success message from the response
          desc: data.desc, // Optionally, show the description from the response
        });
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed", {
          cause: errorData.desc,
        });
      }
    } catch (error: any) {
      showTedxToast({
        type: "error",
        message: error.message,
        desc: error?.cause,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[100vw] md:w-[40vw] lg:w-[40vw] flex flex-col items-center lg:justify-center relative  min-h-[100vh] pt-96 md:pt-0 lg:pt-0 py-[40vh] md:py-[10vh] lg:py-0  shadow-xl">
      <Image
        src={"/bg2.svg"}
        alt=""
        className="w-full h-screen"
        width={1000}
        height={1000}
      />
      <div className="md:w-[85%] lg:w-[85%] w-[90vw] flex flex-col gap-8 absolute">
        <div className="w-full flex items-center justify-center">
          <Link href={"/"}>
            {" "}
            <Logo />
          </Link>
        </div>
        <div className="w-full flex items-center justify-center">
          <span className="text-xl">Sign up</span>
        </div>
        <div className="flex flex-col gap-6" onKeyDown={handleEnterPress}>
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
                  value={firstName}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
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
                  value={lastName}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
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
                  type="email"
                  className=" w-full p-3 rounded-md bg-black-300 outline-none border-none"
                  placeholder="johndoe@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
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
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
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
                  value={organisation}
                  onChange={(e) => {
                    setOrganisation(e.target.value);
                  }}
                />
              </div>

              <div className="flex-1">
                <span className="font-light text-sm italic">Designation</span>
                <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                  *
                </span>
                <input
                  type="text"
                  className=" w-full p-3 rounded-md bg-black-300 outline-none border-none"
                  placeholder="Student"
                  value={designation}
                  onChange={(e) => {
                    setDesignation(e.target.value);
                  }}
                />
              </div>

              <div className="flex-1">
                <span className="font-light text-sm italic">Password</span>
                <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                  *
                </span>
                <input
                  type="password"
                  className=" w-full p-3 rounded-md bg-black-300 outline-none border-none"
                  placeholder="!password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <Button
            disabled={isSubmitting}
            onClick={handleSignUp}
            title={isSubmitting ? "Please wait ..." : "SignUp"}
            className="w-full py-3 font-semibold bg-primary-700 rounded-md outline-none border-none "
          ></Button>
          <div className="flex gap-4 items-center justify-between">
            <div className="flex items-center justify-start mt-5 mb-5">
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
            {/* <div className="flex items-center justify-end">
              <span className="text-xs md:text-sm lg:text-sm">
                Forgot password
              </span>
            </div> */}
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
