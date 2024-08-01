import React from "react";

export default function ScrollTextView() {
  return (
    <div className="relative hidden md:flex lg:flex overflow-x-hidden">
      <div className="md:py-[12vh] lg:py-[12vh] py-[5vh] animate-marquee whitespace-nowrap gap-4 md:gap-8 lg:gap-8 flex items-center justify-center">
        <span className="text-3xl md:text-6xl lg:text-6xl font-bold ml-6 text-primary-700">
          {" "}
          TED<sup className="md:top-[-16px] lg:top-[-16px] top-[-8px]">x</sup> CCET
        </span>
        <div className="w-[2rem] md:w-[4rem] lg:w-[4rem]  h-[3px] md:h-[5px] lg:h-[5px] bg-primary-700 self-center"></div>
        <span className="text-3xl md:text-6xl lg:text-6xl font-bold blank">FIRST TIME IN</span>
        <span className="text-primary-700 text-3xl md:text-6xl lg:text-6xl font-bold stroke-none ml-[-10px]">
          ALAPPUZHA
        </span>
        <div className="w-[4rem] h-[3px] md:h-[5px] lg:h-[5px] bg-primary-700 self-center"></div>
        <span className="text-3xl md:text-6xl lg:text-6xl font-bold blank">
          AN INDEPENDENTLY ORGANIZED{" "}
          <span className="blankRed">
            TED<sup className="md:top-[-16px] lg:top-[-16px] top-[-8px]">x</sup>
          </span>{" "}
          EVENT
        </span>
        <div className="w-[2rem] md:w-[4rem] lg:w-[4rem] h-[3px] md:h-[5px] lg:h-[5px] bg-primary-700 self-center"></div>
      </div>

      <div className="absolute top-0 md:py-[12vh] lg:py-[12vh] py-[5vh] animate-marquee2 whitespace-nowrap flex gap-8">
        <span className="text-3xl md:text-6xl lg:text-6xl font-bold ml-6 text-primary-700">
          {" "}
          TED<sup className="md:top-[-16px] lg:top-[-16px] top-[-8px]">x</sup> CCET
        </span>
        <div className="w-[2rem] md:w-[4rem] lg:w-[4rem] h-[3px] md:h-[5px] lg:h-[5px] bg-primary-700 self-center"></div>

        <span className="text-3xl md:text-6xl lg:text-6xl font-bold blank">FIRST TIME IN</span>
        <span className="text-primary-700 text-3xl md:text-6xl lg:text-6xl font-bold stroke-none ml-[-10px]">
          ALAPPUZHA
        </span>
        <div className="w-[2rem] md:w-[4rem] lg:w-[4rem]  h-[3px] md:h-[5px] lg:h-[5px] bg-primary-700 self-center"></div>

        <span className="text-3xl md:text-6xl lg:text-6xl font-bold blank">
          AN INDEPENDENTLY ORGANIZED TED<sup className="md:top-[-16px] lg:top-[-16px] top-[-8px]">x</sup>{" "}
          EVENT
        </span>
        <div className="w-[2rem] md:w-[4rem] lg:w-[4rem]h-[3px] md:h-[5px] lg:h-[5px] bg-primary-700 self-center"></div>
      </div>
    </div>
  );
}
