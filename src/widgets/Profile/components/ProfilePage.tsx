"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { LuLogOut } from "react-icons/lu";
import { IoTicket } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { BsPersonSquare } from "react-icons/bs";
import ProfileRightSide from "./ProfileRightSide";
import Image from "next/image";
import { useRouter } from "next/navigation";
import showTedxToast from "@components/showTedxToast";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [isLoaded, setIsLoaded] = useState(true);
  const router = useRouter();

  const [profile, setProfile] = useState({});

  const handleSession = () => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    router.replace("/login");

    return () => clearTimeout(timer);
  };
  const handleSignout = async () => {
    // Show toast before sign out
    handleSession();
    showTedxToast({
      type: "success",
      message: "Logout successful", // Updated message
      desc: "We look forward to seeing you again.", // Updated description
    });

    // Sign out the user
    await signOut({ redirect: false });

    // Set a timeout to allow the toast to be visible before redirecting
    setTimeout(() => {
      router.replace("/login");
    }, 1000); // Adjust the timeout duration if needed
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user?._id) {
        try {
          const response = await fetch("/api/profile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: session.user._id,
            }),
          });
          const data = await response.json();
          setProfile(data);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchProfile();
  }, [session?.user?._id]);

  return (
    <div className="min-h-[100vh] flex flex-col items-start justify-start gap-3 px-[5vw]">
      <div className="flex w-full gap-10 pt-[110px]">
        <div className="flex-[0.5] w-full rounded-[10px] bg-black-100 p-3 gap-4 flex flex-col h-[48vh]">
          <div className="flex w-full items-center justify-center py-4">
            <BsPersonSquare className="text-8xl" />
          </div>
          <div>
            <button className="w-full text-white p-3 rounded-[10px] flex items-center justify-center gap-2">
              <FaRegEdit />
              Edit Profile
            </button>
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
          <ProfileRightSide session={session} />
        </div>
      </div>
    </div>
  );
}
