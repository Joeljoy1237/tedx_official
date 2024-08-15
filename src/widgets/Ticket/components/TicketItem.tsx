import Logo from "@components/Logo";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TicketItem() {
  return (
    <div  id="ticket" className="w-auto flex flex-row items-center justify-center rotate-90 md:rotate-0 lg:rotate-0">
      <div className="w-[650px] bg-black-200 h-[300px] rounded-[30px] flex flex-row">
        <div className="flex w-[35%]">
          <Image
            src={"/ticketbg.webp"}
            alt=""
            width={1000}
            height={1000}
            className="w-full h-full ticketImage"
          />
        </div>
        <div className="flex w-full flex-col py-2 px-4 items-center justify-between relative">
          <div className="flex w-full justify-between items-center">
            <div className="w-[8rem] flex mt-[-7px]">
              <Logo />
            </div>
            <Link className="text-sm mt-[-7px]" href="/">
              www.tedxccet.in
            </Link>
          </div>
          <div className="flex w-full items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] mt-[-15px]">
            <Image
              src={"/infin8.webp"}
              alt=""
              width={1000}
              height={1000}
              className="w-[10rem] h-full"
            />
          </div>
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col items-start justify-center">
              <span className="text-xs">Date</span>
              <span className="text-sm">
                <span className="sans">7<sup>th</sup></span> September{" "}
                <span className="sans">2024</span>
              </span>
            </div>
            <div className="flex flex-col items-start justify-center">
              <span className="text-xs">Time</span>
              <span className="text-sm sans">9:00 AM</span>
            </div>
            <div className="flex flex-col items-start justify-center">
              <span className="text-xs">VENUE</span>
              <span className="text-sm">Seminar Hall</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[250px] flex flex-col items-center justify-between">
        <div className="border-2 h-[20px] border-white"></div>
        <div className="border-2 h-[20px] border-white"></div>
        <div className="border-2 h-[20px] border-white"></div>
        <div className="border-2 h-[20px] border-white"></div>
        <div className="border-2 h-[20px] border-white"></div>
        <div className="border-2 h-[20px] border-white"></div>
      </div>
      <div className="w-[280px] h-[300px] rounded-[30px] bg-primary-700 p-4 items-center flex-col  justify-center gap-[2rem] relative">
        <div className="flex flex-row w-full items-center justify-center absolute top-[2rem] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <span className="text-white text-xl font-semibold">
            Grab Your Tickets Now!
          </span>
        </div>
        <div className="flex flex-row w-full items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <Image
            src={"/qr.webp"}
            alt=""
            width={1000}
            height={1000}
            className="w-[10rem] h-full"
          />
        </div>
        <div className="flex flex-row w-full items-center justify-center absolute b bottom-3 left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <span className="text-white text-xs">
            Be Present At The Seminar Hall Before 9:00 IST
          </span>
        </div>
      </div>
    </div>
  );
}
