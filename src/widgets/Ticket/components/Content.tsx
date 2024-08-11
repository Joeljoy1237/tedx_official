import TitleBar from "@components/TitleBar";
import React, { useEffect, useState } from "react";
import TicketItem from "./TicketItem";
import TicketMobile from "./TicketMobile";
import Button from "@components/Button";
import Link from "next/link";

export default function Content() {
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if the window object is available and set the isDesktop state
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Set initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <section id="get-tickets" className=" pt-[100px]">
      <div className=" md:mb-0 lg:mb-0 pt-12 md:py-[10vh] lg:py-0 h-auto md:h-auto lg:h-auto px-[5vw] flex items-center md:justify-start lg:justify-start justify-center flex-col gap-12">
        <div className="">
          <TitleBar title="Grab Your" titleSecond="Tickets" />
        </div>
        {isDesktop ? <TicketItem /> : <TicketMobile />}
        <div className="">
          <Link href={"/get-tickets"}>
            <Button
              title="Get your tickets now"
              className="bg-primary-700 p-4 rounded-[8px] outline-none border-none font-semibold"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
