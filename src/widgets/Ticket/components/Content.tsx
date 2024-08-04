import TitleBar from "@components/TitleBar";
import React, { useEffect, useState } from "react";
import TicketItem from "./TicketItem";
import TicketMobile from "./TicketMobile";

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
    <div className=" md:mb-0 lg:mb-0 pt-12 md:py-[10vh] lg:py-0 h-auto md:h-auto lg:h-auto px-[5vw] flex items-center md:justify-start lg:justify-start justify-center flex-col gap-12">
      <div className="">
        <TitleBar title="Grab Your" titleSecond="Tickets" />
      </div>
      {isDesktop ? <TicketItem /> : <TicketMobile />}
    </div>
  );
}
