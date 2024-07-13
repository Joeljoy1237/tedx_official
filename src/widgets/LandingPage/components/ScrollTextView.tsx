import React from "react";

export default function ScrollTextView() {
  return (
    <div className="relative flex overflow-x-hidden">
      <div className="py-12 animate-marquee whitespace-nowrap gap-8 flex items-center justify-center">
        <span className="text-6xl font-bold ml-6 text-primary-700">
          {" "}
          TED<sup className="top-[-16px]">x</sup> CCET
        </span>
        <div className="w-[4rem] h-[5px] bg-primary-700 self-center"></div>
        <span className="text-6xl font-bold blank">FIRST TIME IN</span>
        <span className="text-primary-700 text-6xl font-bold stroke-none">
          ALAPPUZHA
        </span>
        <div className="w-[4rem] h-[5px] bg-primary-700 self-center"></div>
        <span className="text-6xl font-bold blank">
          AN INDEPENDENTLY ORGANIZED{" "}
          <span className="blankRed">
            TED<sup className="top-[-16.5px]">x</sup>
          </span>{" "}
          EVENT
        </span>
        <div className="w-[4rem] h-[5px] bg-primary-700 self-center"></div>
      </div>

      <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap flex gap-8">
        <span className="text-6xl font-bold ml-6 text-primary-700"> CCET</span>
        <div className="w-[4rem] h-[5px] bg-primary-700 self-center"></div>

        <span className="text-6xl font-bold blank">FIRST TIME IN</span>
        <span className="text-primary-700 text-6xl font-bold stroke-none">
          ALAPPUZHA
        </span>
        <div className="w-[4rem] h-[5px] bg-primary-700 self-center"></div>

        <span className="text-6xl font-bold blank">
          AN INDEPENDENTLY ORGANIZED TED<sup className="top-[-16.5px]">x</sup>{" "}
          EVENT
        </span>
        <div className="w-[4rem] h-[5px] bg-primary-700 self-center"></div>
      </div>
    </div>
  );
}
