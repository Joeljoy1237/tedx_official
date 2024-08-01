import Image from "next/image";
import React from "react";
import FullLogo from "./FullLogo";

export default function PreLoader() {
  return (
    <div className="fixed inset-0 z-[1000] bg-black-100 flex items-center justify-center">
      <div className="text-white">
        <div className="flex items-center justify-center flex-col gap-4 px-5vw">
          <FullLogo/>
          <span className="loader"></span>
        </div>
      </div>
    </div>
  );
}
