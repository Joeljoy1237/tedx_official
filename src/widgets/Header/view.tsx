import React from "react";
import Image from "@components/Image";
import Logo from "@components/Logo";

export default function HeaderView() {
  return (
    <div className="fixed w-screen items-center justify-between px-[5vw] py-[1.3rem] top-0 z-50 flex">
      <div className="flex-1">
        <Logo />
      </div>
      <div className="flex-1 flex items-center justify-center">
        hi
      </div>
      <div className="flex-1 flex items-center justify-end">hi</div>
    </div>
  );
}
