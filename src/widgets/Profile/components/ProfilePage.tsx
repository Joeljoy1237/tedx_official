"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { LuLogOut } from "react-icons/lu";
import { IoTicket } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { BsPersonSquare } from "react-icons/bs";
import ProfileRightSide from "./ProfileRightSide";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState({});

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
          console.log(data);

          setProfile(data);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchProfile();
  }, [session?.user?._id]);

  return (
    <div className="min-h-[100vh] pt-[110px] flex flex-col items-start justify-start px-[5vw] gap-3">
      <div className="flex w-full gap-10">
        <div className="flex-[0.5] w-full rounded-[10px] bg-black-200 p-3 gap-4 flex flex-col h-[48vh]">
          <div className="flex w-full items-center justify-center py-4">
            <BsPersonSquare className="text-8xl" />
          </div>
          <div>
            <button className="w-full text-white p-3 rounded-[10px] flex items-center justify-center gap-2">
              <IoTicket />
              My Tickets
            </button>
            <button className="w-full text-white p-3 rounded-[10px] flex items-center justify-center gap-2">
              <FaRegEdit />
              Edit Profile
            </button>
          </div>
          <div>
            <button className="w-full bg-primary-700 text-white p-3 rounded-[10px] flex items-center justify-center gap-2">
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
