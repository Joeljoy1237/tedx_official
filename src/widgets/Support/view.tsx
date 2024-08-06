"use client"
import FooterView from "@widgets/Footer";
import HeaderView from "@widgets/Header";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function SuportView() {
    const [isLoaded, setIsLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoaded(true);
        }, 2000);
    
        return () => clearTimeout(timer);
      }, []);
      const SmoothScrollCustom = dynamic(
        () => import("@components/ScrollSmoother"),
        {
          ssr: false,
        }
      );
  return (
    <main>
        <HeaderView/>
        <div className="flex flex-col items-center justify-center gap-5 min-h-screen px-[5vw]">
      <span className=""> Need Help with Ticket Purchasing?</span>
      <span className="">
        If you encounter any issues or have questions regarding ticket purchases
        for TEDxCCET, our support team is here to assist you. Please reach out
        to us at: Email: <Link href={'mailto:tedxsupport@carmelcet.in'} className="text-primary-700"> tedxsupport@carmelcet.in</Link>
      </span>
      <span className="">
        Our dedicated team is committed to providing you with prompt and
        effective support. We're here to ensure your ticket buying experience is
        smooth and hassle-free.
      </span>
      <span className="">
        Thank you for your interest in TEDxCCET. We look forward to welcoming
        you to our event!
      </span>
    </div>
    <FooterView/>
    <SmoothScrollCustom/>
    </main>
  );
}
