import Image from "next/image";
import React from "react";

export default function Bought() {
  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center flex-col">
      <Image src={'/closed.png'} alt="" height={200} width={200}/>
      You have already bought tickets
    </div>
  );
}
