import TitleBar from "@components/TitleBar";
import React from "react";
import { IoTicket } from "react-icons/io5";
import PurchasedTicket from "./PurchasedTicket";

interface User {
  _id?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  organisation?: string | null;
}

interface ProfileData {
  session?: {
    user?: User;
  } | null;
}

export default function ProfileRightSide({ session }: ProfileData) {
  const user = session?.user || {};

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <span className="text-4xl">
          Welcome 👋,{" "}
          <span className="font-semibold">
            {user.firstName || "User"} {user.lastName || ""}{" "}
            <span className="text-base font-normal">
              ( {user._id || "N/A"} )
            </span>
          </span>
        </span>
        <div className="flex gap-2">
          <span className="text-xl">Email:</span>
          <span className="text-xl">{user.email || "N/A"}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-xl">Organisation:</span>
          <span className="text-xl">{user.organisation || "N/A"}</span>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="">
          <span className="flex items-center justify-start gap-3 text-3xl font-semibold">
            <IoTicket className="font-semibold" />
            <div className="flex gap-2">
              <span className="">My</span>
              <span className="text-primary-700 font-semibold">Tickets</span>
            </div>
          </span>
        </div>
        <div className="w-full flex items-center justify-start">
            <PurchasedTicket/>
        </div>
      </div>
    </div>
  );
}
