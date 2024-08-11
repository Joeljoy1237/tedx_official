import Image from "next/image";
import React from "react";

export default function RightSide() {
  return (
    <div className="md:min-h-[95vh] lg:min-h-[95vh] h-auto py-5 flex flex-col gap-5">
      <div className="flex flex-col">
        <div className="w-full flex items-center justify-between py-2">
          <span className="">Sub Total</span>
          <span className="font-sans">1300.00 INR</span>
        </div>
        <div className="w-full flex items-center justify-between py-2">
          <span className="">Discount</span>
          <span className="font-sans">Nill</span>
        </div>
      </div>
      <div className="w-full h-[1px] bg-black-300"></div>
      <div className="w-full flex items-center justify-between py-2">
        <span className="text-2xl font-semibold">Total:</span>
        <span className="font-sans text-2xl font-semibold">1300.00 INR</span>
      </div>
      <div className="flex-grow items-center justify-center hidden md:flex lg:flex">
        <div className="max-h-[70vh] w-full flex items-center justify-center overflow-hidden">
          <Image
            src={"/ticket.gif"}
            alt="Ticket Image"
            height={0}
            width={0}
            className="h-[20rem] w-auto"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
