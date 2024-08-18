"use client";
import PreLoader from "@components/PreLoader";
import FooterView from "@widgets/Footer";
import HeaderView from "@widgets/Header";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function SupportView() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      {!isLoaded && <PreLoader />}
      <HeaderView />
      <div className="flex flex-col items-center justify-center gap-5 min-h-screen px-[5vw] pt-[50px]">
        <span className="text-xl font-bold">Need Help with Ticket Purchasing?</span>
        <span className="text-lg">
          If you encounter any issues or have questions regarding ticket
          purchases for TEDxCCET, our support team is here to assist you. Please
          reach out to us at: Email:{" "}
          <Link
            href={"mailto:tedxsupport@carmelcet.in"}
            className="text-primary-700"
          >
            tedxsupport@carmelcet.in
          </Link>
        </span>
        <span className="text-lg">
          You can also contact us directly via WhatsApp:{" "}
          <a
            href="https://wa.me/9190747909?text=I'm%20facing%20trouble%20in%20tedxccet.in"
            className="text-primary-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            7907247909
          </a>
        </span>
        <span className="text-lg">
          Our dedicated team is committed to providing you with prompt and
          effective support. We're here to ensure your ticket buying experience
          is smooth and hassle-free.
        </span>
        <span className="text-lg">
          Thank you for your interest in TEDxCCET. We look forward to welcoming
          you to our event!
        </span>
      </div>
      <FooterView />
    </main>
  );
}
