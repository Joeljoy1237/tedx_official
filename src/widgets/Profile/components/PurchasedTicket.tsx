import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, forwardRef } from "react";
import QRCode from "qrcode";
import Logo from "@components/Logo";

interface Buyer {
  firstName: string;
  lastName: string;
  ticketId: string;
  organisation: string;
  designation?: string;
}

interface PurchasedTicketProps {
  buyer: Buyer;
}

const PurchasedTicket = forwardRef<HTMLDivElement, PurchasedTicketProps>(
  ({ buyer }, ref) => {
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
            `https://tedxccet.in/admin/check-qr/${buyer?.ticketId}`,
            options
          );
          setSrc(qrCodeSrc);
        } catch (err) {
          // console.error(err);
        }
      };

      generateQRCode();
    }, [buyer?.ticketId]);

    return (
      <div
        id="ticket"
        className="w-[1000px] h-[300px] bg-black-100 flex flex-row items-center justify-center"
        ref={ref}
      >
        <div className="w-[700px] bg-black-200 h-[300px] rounded-[30px] flex flex-row">
          <div className="w-[230px] min-h-[300px] overflow-hidden flex items-center justify-center">
            <img
              src={"/ticketbg.webp"}
              alt=""
              className="object-center h-full w-full ticketImage"
            />
          </div>
          <div className="flex w-full flex-col py-2 px-4 items-center justify-between relative">
            <div className="flex w-full justify-between items-center">
              <div className="w-[100px] flex mt-[-10px]">
                <Logo />
              </div>
              <Link className="text-sm mt-[-10px]" href="/">
                www.tedxccet.in
              </Link>
            </div>
            <div className="flex w-full items-center justify-center">
              <img
                src={"/infin8.webp"}
                alt=""
                className="object-contain object-center h-[100px] w-[200px] mt-[-30px]"
              />
            </div>
            <div className="flex flex-row items-center justify-between w-full mb-1">
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
        <div className="max-w-[300px] max-h-[300px] min-w-[300px] min-h-[300px] -rotate-90 rounded-[30px] bg-primary-700 p-4 items-center flex-row justify-center gap-[10px] relative">
          <div className="flex flex-col items-start">
            <span className="font-bold text-xl">
              {buyer?.firstName} {buyer?.lastName}
            </span>
            <span className="font-semibold italic">{buyer?.organisation}</span>
            <span className="font-normal text-base italic">
              {buyer?.designation}
            </span>
            <span className="font-sans text-sm">ID: {buyer?.ticketId}</span>
          </div>
          <div className="absolute bottom-0 left-0 w-[180px] flex-wrap flex flex-col items-start justify-start">
            <div className="">
              <span className="text-[12px] ml-[13px] mb-[7px] z-10 leading-none break-words items-start justify-start flex flex-col">
                Be Present At The Seminar
              </span>
              <span className="text-[12px] ml-[13px] mb-[7px] z-10 leading-none break-words items-start justify-start flex flex-col">
                Hall Before 9:00 IST
              </span>
            </div>
            {src ? (
              <img
                src={src}
                alt="QR Code"
                className="w-[140px] rounded-[30px]"
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className=""></div>
          <img
            src={"/alappy.png"}
            alt=""
            className="absolute bottom-4 right-3 w-[150px]"
          />
        </div>
      </div>
    );
  }
);

PurchasedTicket.displayName = "PurchasedTicket";
export default PurchasedTicket;
