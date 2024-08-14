"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, forwardRef } from "react";
import QRCode from "qrcode";
import Logo from "@components/Logo";

const PurchasedTicket = forwardRef<HTMLDivElement>((props, ref) => {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const options = {
          color: {
            dark: "#FFFFFF", // White color for the QR code
            light: "#eb0028", // Red background
          },
        };
        const qrCodeSrc = await QRCode.toDataURL(
          "https://localhost:3000/",
          options
        );
        setSrc(qrCodeSrc);
      } catch (err) {
        console.error(err);
      }
    };

    generateQRCode();
  }, []);

  return (
    <div
      id="ticket"
      className="w-auto bg-black-100 flex flex-row items-center justify-center rotate-90 md:rotate-0 lg:rotate-0"
      ref={ref}
    >
      <div className="w-[700px] bg-black-200 h-[300px] rounded-[30px] flex flex-row">
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
                <span className="sans">7</span> September{" "}
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
      <div className="w-[300px] h-[300px] -rotate-90 rounded-[30px] bg-primary-700 p-4 items-center flex-row justify-center gap-[2rem] relative">
        <div className="flex flex-col">
          <span className="font-bold text-xl">ABHISHEK SANTHOSH</span>
          <span className="font-semibold italic">Google LLC</span>
          <span className="font-semibold italic">Full stack developer</span>
          <span className="font-sans">ID: TEDxCCET/2024/22</span>
        </div>
        <div className="absolute bottom-0 left-0 w-[10rem] flex flex-col">
          <span className="text-[0.6rem] ml-4 mb-[-10px] z-10">
          Be Present At The Seminar Hall Before 9:00 IST
          </span>
          {src ? (
            <Image
              src={src}
              alt="QR Code"
              height={100}
              width={100}
              className="w-[8.5rem] rounded-[30px]"
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className=""></div>
        <Image
          src={"/alappy.png"}
          alt="QR Code"
          height={500}
          width={500}
          className="absolute bottom-3 right-3 w-[10rem]"
        />
      </div>
    </div>
  );
});

PurchasedTicket.displayName = "PurchasedTicket";
export default PurchasedTicket;
