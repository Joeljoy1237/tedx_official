import Button from "@components/Button";
import Logo from "@components/Logo";
import Link from "next/link";
import React from "react";

export default function AdminHeader() {
  return (
    <div className="flex px-[2vw] items-center justify-between py-[2rem] fixed bg-black-100 w-full">
      <div className="">
        <Logo />
      </div>
      <div className=""></div>
      <div className="">
        <Link href={'/'}>
          <Button
            className="bg-primary-700 rounded-[10px] p-3 outline-none border-none"
            title="Back to Main"
          />
        </Link>
      </div>
    </div>
  );
}
