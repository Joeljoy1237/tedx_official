import Link from "next/link";
import React from "react";

export default function Credits() {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex-1 flex items-center justify-start gap-4">
        <Link href="/">Terms and Conditions</Link>
        <Link href="/">Privacy Policy</Link>
        <Link href="/">Refund Policy</Link>
      </div>
      <div className="flex-1 flex items-center justify-end">
        <span className="">
          © Copyright 2024 | Crafted by{" "}
          <span className="text-primary-700 font-semibold">
            TED<sup className="top-[-5px]">x</sup>CCET
          </span>
        </span>
      </div>
    </div>
  );
}
