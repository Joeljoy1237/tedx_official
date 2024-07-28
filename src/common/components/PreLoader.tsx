import Image from "next/image";
import React from "react";

export default function PreLoader() {
  return (
    <div className="fixed inset-0 z-[1000] bg-black-100 flex items-center justify-center">
      <div className="text-white">
        <div className="flex items-center justify-center flex-col gap-4">
          <Image src={"/Logo.svg"} height={300} width={340} alt="" />
          <span className="loader"></span>
        </div>
      </div>
    </div>
  );
}
