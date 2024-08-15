"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { LuLogOut } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { BsPersonSquare } from "react-icons/bs";
import ProfileRightSide from "./ProfileRightSide";
import { useRouter } from "next/navigation";
import showTedxToast from "@components/showTedxToast";

interface User {
  resetTokenUsed: boolean;
  isAdmin: boolean;
  resetCount: Number;
  tokenUsed: boolean;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  designation: string;
}

interface Group {
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  ticketId: string;
  _id: string;
}

interface Profile {
  user: User;
  group: Group[];
  bookingId: string;
}

interface ProfilePageProps {
  profile: Profile | null;
}

export default function ProfilePage({ profile }: ProfilePageProps) {
  const { data: session, status } = useSession();
  const [isLoaded, setIsLoaded] = useState(true);
  const router = useRouter();

  const handleSession = () => {
    // router.prefetch(
    //   "/tickets/66bdc42baaed4152efdeace1/66bdc42baaed4152efdeace2"
    // );
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    router.replace("/login");

    return () => clearTimeout(timer);
  };

  const handleSignout = async () => {
    handleSession();
    showTedxToast({
      type: "success",
      message: "Logout successful",
      desc: "We look forward to seeing you again.",
    });

    await signOut({ redirect: false });

    setTimeout(() => {
      router.replace("/login");
    }, 1000);
  };

  return (
    <div className="min-h-[100vh] flex flex-col items-start justify-start gap-3 px-[5vw]">
      <div className="flex w-full flex-col gap-10 pt-[110px] md:flex-row lg:flex-row">
        <div className="md:flex-[0.5] lg:flex-[0.5] flex-[1] w-full rounded-[10px] bg-black-100 p-3 gap-4 flex flex-col h-[48vh]">
          <div className="flex w-full items-center justify-center py-4">
            <BsPersonSquare className="text-8xl" />
          </div>
          <div>
            {/* <button className="w-full text-white p-3 rounded-[10px] flex items-center justify-center gap-2">
              <FaRegEdit />
              Edit Profile
            </button> */}
          </div>
          <div>
            <button
              onClick={() => {
                handleSignout();
              }}
              className="w-full bg-primary-700 text-white p-3 rounded-[10px] flex items-center justify-center gap-2"
            >
              <LuLogOut /> Logout
            </button>
          </div>
        </div>
        <div className="flex-[2]">
          <ProfileRightSide profile={profile} />
        </div>
      </div>
    </div>
  );
}
