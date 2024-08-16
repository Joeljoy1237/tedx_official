import Logo from "@components/Logo";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TicketMobile() {
  return (
    <div className="h-full w-[90vw] flex items-center justify-center flex-col">
      <div className="bg-black-200 w-[90vw] h-[370px] rounded-[20px] p-[1rem] relative flex items-center justify-center flex-col">
        <div className="flex w-full justify-between items-center absolute top-1 px-4">
          <div className="w-[6rem] flex mt-[-7px]">
            <Logo />
          </div>
          <Link className="text-xs mt-[-7px]" href="/">
            www.tedxccet.in
          </Link>
        </div>
        <div className="flex w-full items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] mt-[-15px]">
          <Image
            src={"/infin8.webp"}
            alt=""
            width={1000}
            height={1000}
            className="w-[10rem] h-full ml-[2rem]"
          />
        </div>
        <div className="flex  flex-row items-center justify-between w-full absolute bottom-2 px-4">
          <div className="flex flex-col items-start justify-center text-[10px] gap-[2px]">
            <span className="text-[8px]">Date</span>
            <span className="text-[9px]">
              <span className="sans">7<sup>th</sup></span> September{" "}
              <span className="sans">2024</span>
            </span>
          </div>
          <div className="flex flex-col items-start justify-center  gap-[2px]">
            <span className="text-[8px]">Time</span>
            <span className="text-[9px] sans">9:00 AM</span>
          </div>
          <div className="flex flex-col items-start justify-center">
            <span className="text-[8px]">VENUE</span>
            <span className="text-[9px]">Seminar Hall</span>
          </div>
        </div>
      </div>
      <div className="w-[80vw] flex flex-row items-center justify-between  gap-[2px]">
        <div className="border-[1px] w-[6vw] border-white"></div>
        <div className="border-[1px] w-[6vw] border-white"></div>
        <div className="border-[1px] w-[6vw] border-white"></div>
        <div className="border-[1px] w-[6vw] border-white"></div>
        <div className="border-[1px] w-[6vw] border-white"></div>
        <div className="border-[1px] w-[6vw] border-white"></div>
        <div className="border-[1px] w-[6vw] border-white"></div>
        <div className="border-[1px] w-[6vw] border-white"></div>
      </div>
      <div className="bg-primary-700 w-full h-[160px] p-[5vw]  rounded-[20px] relative flex items-center justify-center">
        <div className="flex gap-4">
          <Image
            src={"/qr.webp"}
            alt=""
            width={1000}
            height={1000}
            className="w-[5rem] h-[5rem]"
          />
          <div className="w-full items-center justify-center flex">
            <span className="text-xl font-semibold">Grab your tickets now!</span>
          </div>
        </div>
        <div className="absolute bottom-3 text-[10px] left-[50%] translate-x-[-50%] translate-y-[50%] w-full flex items-center justify-center">
          <span className="">
            Be Present At The Seminar Hall Before 9:00 IST
          </span>
        </div>
      </div>
    </div>
  );
}
