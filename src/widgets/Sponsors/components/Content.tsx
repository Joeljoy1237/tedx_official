import TitleBar from "@components/TitleBar";
import { sponsors } from "@utils/constants";
import Image from "next/image";
import React from "react";

export default function Content() {
  return (
    <div className="px-4 py-8 md:px-[5vw] w-full flex flex-col items-center justify-center bg-black">
      <TitleBar title="Our" titleSecond="Sponsors" />
      <div className="w-full flex flex-col items-center mt-8 md:mt-[8vh]">
        <div className="flex flex-col md:flex-row w-full md:w-[50vw]">
          {/* Title Sponsor Section */}
          <div className="flex-1 flex flex-col items-center justify-center gap-5">
            <div className="w-full flex items-center justify-center">
              <span className="text-lg md:text-2xl font-semibold">
                Title Sponsor
              </span>
            </div>
            <div className="h-[65vw] w-[90vw] md:h-[16vw] lg:h-[16vw] md:w-[20vw] lg:w-[20vw] flex items-center justify-center border-[2px] border-red-700 rounded-[8px]">
              <Image
                src={sponsors?.titleSponsors[0].imgUrl}
                alt={sponsors?.titleSponsors[0].name}
                height={180}
                width={240}
                className=""
              />
            </div>
          </div>
          {/* Banking Partner Section */}
          <div className="flex-1 flex flex-col items-center justify-center gap-5 mt-8 md:mt-0">
            <div className="w-full flex items-center justify-center">
              <span className="text-lg md:text-2xl font-semibold">
                Banking Partner
              </span>
            </div>
            <div className="h-[65vw] w-[90vw] md:h-[16vw] lg:h-[16vw] md:w-[20vw] lg:w-[20vw] flex items-center justify-center border-[2px] border-red-700 rounded-[8px]">
              <Image
                src={sponsors?.titleSponsors[1].imgUrl}
                alt={sponsors?.titleSponsors[1].name}
                height={180}
                width={240}
              />
            </div>
          </div>
        </div>
        {/* Co-Sponsors Section */}
        <div className="w-full flex flex-col px-4 py-8 md:px-[5vw] md:py-[5vw] gap-8 md:gap-[5vh]">
          <div className="w-full flex items-center justify-center">
            <span className="text-lg md:text-2xl font-semibold capitalize">
              Co-Sponsored by
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-[4vw] items-center justify-center">
            {sponsors?.coSponsors.map((data, index) => (
              <div
                className="h-[55vw] w-full md:h-[16vw] md:w-[20vw] flex items-center justify-center border-[2px] border-red-700 rounded-[8px]"
                key={index}
              >
                <Image
                  src={data.imgUrl}
                  alt={data.name}
                  height={150}
                  width={220}
                  className="px-[1vw] rounded-[8px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
