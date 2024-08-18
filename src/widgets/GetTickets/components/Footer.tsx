import React from "react";
import Link from "next/link";
import { IoBugOutline } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="text-white px-[5vw] py-[4vh] border-t border-black-300">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex space-x-4">
          <Link href="/privacy-policy">
            <span className="hover:underline text-xs">Privacy Policy</span>
          </Link>
          <Link href="/refund-policy">
            <span className="hover:underline text-xs">Refund Policy</span>
          </Link>
          <Link href="/terms-and-conditions">
            <span className="hover:underline text-xs">
              Terms and Conditions
            </span>
          </Link>
        </div>
        <div className="">
          <Link href={"/support-ticket"}>
            <button className="w-full border border-primary-700 text-white p-3 rounded-[10px] flex items-center justify-center gap-2">
              <IoBugOutline />
              Raise a Support Ticket
            </button>
          </Link>
        </div>
      </div>
    </footer>
  );
}
