import Button from "@components/Button";
import X from "@components/X";
import IconArrow from "@icons/IconArrow";
import IconDate from "@icons/IconDate";
import IconLocation from "@icons/IconLocation";
import Link from "next/link";
import React from "react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import gsap from "gsap";

export default function HeroText() {

// Register the ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const scrollToSection = (sectionId:any) => {
  gsap.to(window, { duration: 1, scrollTo: sectionId });
};
  return (
    <div className="relative isolate min-h-[100vh] px-[5vw] flex items-center justify-center mt-2 md:mt-[5vh] lg:mt-[5vh]">
      <div className="flex items-center justify-center md:flex-row lg:flex-row flex-col-reverse md:gap-3 lg:gap-3 gap-3">
        <div className="">
          <div className="flex">
            <div className="text-start w-full">
              <span className="text-[10vw] md:text-[90px] lg:text-[90px] inline-block line leading-[1em] font-extrabold">
                AN <span className="blankRedScroll">INDEPENDENTLY</span>{" "}
                <span className="blankWhite"> ORGANIZED</span> <br />
                <span className="text-primary-700">TED</span> EVENT
              </span>
            </div>
          </div>
          <div className="w-full flex-col flex items-start gap-6 justify-center mt-4">
            <div className="bg-primary-700 px-3 py-2 md:rounded-[50px] lg:rounded-[50px] w-full md:w-auto lg:w-auto rounded-[10px] bg-opacity-10 flex md:flex-row lg:flex-row flex-col gap-4">
              <div className="flex gap-2 flex-row items-center justify-start">
                <IconDate className="size-5" />
                <span className="text-sm  md:text-base lg:text-base">
                  <span className="sans">7</span> September 2024
                </span>
              </div>
              <div className="hidden md:flex lg:flex">|</div>
              <div className="flex flex-row items-center justify-start gap-2">
                <IconLocation className="size-6" />
                <span className="text-sm md:text-base lg:text-base">
                  Carmel College of Engineering & Technology
                </span>
              </div>
            </div>
            <div className="flex flex-row w-full items-center justify-start md:justify-start lg:justify-start gap-2">
              <Button
                className="px-4 py-2 rounded-lg bg-primary-700 font-semibold w-auto md:w-auto lg:w-auto outline-none border-none"
                title="Get Tickets"
                onClick={()=>{
                  scrollToSection('#get-tickets')
                }}
              />
              <Link href={'/about'}>
              <Button
                className="px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 w-auto md:w-auto lg:w-auto"
                title="Learn more"
                icon={<IconArrow className="size-6" />}
              />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-[70vw] md:w-[38vw] lg:w-[38vw] mt-[10px] md:mt-0 lg:mt-0">
          <X className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}
