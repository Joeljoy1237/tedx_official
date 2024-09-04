import Button from "@components/Button";
import Logo from "@components/Logo";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export default function AdminHeader() {
  const { data: session, status } = useSession();
  return (
    <div className="flex px-[2vw] items-center justify-between py-[1.5rem] fixed bg-black-100 w-full">
      <div className="">
        <Link href={'/'}>
        <Logo />
        </Link>
      </div>
      <div className="w-full ml-[5vw]">
        <div className="w-full flex items-center justify-between">
          <span className="capitalize font-semibold text-2xl">
            Welcome👋,{" "}{session?.user?.firstName?.toLowerCase()}{" "}{session?.user?.lastName?.toLowerCase()}
          </span>
          <div className="flex flex-row items-center justify-center mr-5 gap-2 text-primary-700">
            <MdOutlineAdminPanelSettings className="font-semibold text-2xl"/>
            <span className="capitalize font-semibold text-xl">Admin</span>
          </div>
        </div>
      </div>
      <div className="w-[6vw]">
        <div className="p-1 rounded-full h-[50px] w-[50px] border-primary-700 border-[2px] overflow-hidden">
          <Image
            src="/astronaut.webp"
            height={50}
            width={50}
            alt="Profile Picture"
            className="object-cover h-full w-full rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
