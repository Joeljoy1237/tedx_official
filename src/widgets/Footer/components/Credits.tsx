import Link from "next/link";
import React from "react";

export default function Credits() {
  return (
    <div className="flex md:flex-row lg:flex-row flex-col gap-5 items-center justify-between">
      <div className="flex-1 hidden max-h-full md:flex lg:flex items-center justify-start gap-4 text-xs">
        <Link href="/terms-and-conditions">Terms and Conditions</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/refund-policy">Refund Policy</Link>
      </div>
      <div className="flex-1 flex items-center justify-end">
        <span className="text-xs">
          © Copyright 2024 | Crafted by{" "}
          <span className="text-primary-700 font-extrabold">
            TED<sup className="md:top-[-10px] lg:top-[-3px] top-[-3px]">x</sup>
            CCET
          </span>
        </span>
      </div>
    </div>
  );
}
