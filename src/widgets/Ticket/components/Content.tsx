import TitleBar from "@components/TitleBar";
import React, { useEffect, useState } from "react";
import TicketItem from "./TicketItem";
import TicketMobile from "./TicketMobile";
import Button from "@components/Button";
import Link from "next/link";
import { IoRocketOutline } from "react-icons/io5";
import Tariff from "@widgets/LandingPage/components/Tariff";

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

  const offers = [
    "Early Bird Group Tickets Now Available! (Only for the first 20 tickets)",
    "Purchase tickets for a group of 5 to 10 people and receive a 10% discount.",
    "For groups of more than 10 people, enjoy a 15% discount.",
    "Secure your tickets early to take advantage of these special rates.",
    "Experience the event together with friends or colleagues at a reduced price!",
  ];

  return (
    <section id="get-tickets" className=" pt-[20px] md:pt-[100px] lg:pt-[100px]">
      <div className=" md:mb-0 lg:mb-0 pt-12 md:py-[10vh] lg:py-0 h-auto md:h-auto lg:h-auto px-[5vw] flex items-center md:justify-start lg:justify-start justify-center flex-col gap-12">
        <div className="">
          <TitleBar title="Grab Your" titleSecond="Tickets" />
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row gap-8">
          <div className="">
            {isDesktop ? <TicketItem /> : <TicketMobile />}
          </div>
          <div className="w-full flex items-start flex-col justify-start gap-4">
            {/* <div className="flex flex-col gap-2">
              {offers?.map((offer, index) => (
                <div className="flex items-start justify-start gap-2" key={index}>
                  <IoRocketOutline className="text-[20px]" />
                  <span className="text-justify">{offer}</span>
                </div>
              ))}
            </div> */}
            {/* <Tariff/> */}
            {/* <div className="w-full flex items-center justify-center">
              <Link href={"/get-tickets"}>
                <Button
                  title="Get your tickets now"
                  className="bg-primary-700 p-4 rounded-[8px] outline-none border-none font-semibold"
                />
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
