import TitleBar from "@components/TitleBar";
import Video from "@core/Video";
import React from "react";

export default function Theme() {
  return (
    <div className="relative isolate min-h-[100vh] px-[5vw] flex items-center justify-center">
      <div className="flex flex-col gap-8 w-full">
        <TitleBar titleSecond="Theme" title="OUR" />
        <div className="w-full flex items-center justify-center flex-col gap-5">
          <div className="">
            <span className="text-7xl md:text-[100px] lg:text-[100px] font-bold theme">
              I
            </span>
            <span className="text-7xl md:text-[100px] lg:text-[100px] font-bold themew">
              n
            </span>
            <span className="text-7xl md:text-[100px] lg:text-[100px] font-bold theme">
              f
            </span>
            <span className="text-7xl md:text-[100px] lg:text-[100px] font-bold themew">
              i
            </span>
            <span className="text-7xl md:text-[100px] lg:text-[100px] font-bold theme">
              n
            </span>
            <span className="text-7xl md:text-[100px] lg:text-[100px] font-bold themew">
              8
            </span>
          </div>
          <span className="text-2xl text-center md:text-5xl lg:text-5xl font-boldl tagline">
            From 8 to Infinity: A Journey Beyond Limit
          </span>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row">
          <div className="flex-1 flex flex-col items-center justify-center">
            <Video
              url="https://res.cloudinary.com/dk5dtphvj/video/upload/v1722618041/OOO_mj6zto.mp4"
              className="w-full h-full themevideo"
            />
          </div>
          <div className="flex-1 flex text-lg text-justify">
            <p className="">
              The theme for this year’s TEDx CCET is “Infin8”, which serves as a
              transition from 8 to infinity, representing the transformation of
              an entity from an amateur phase to a phase of being limitless
              without a defined beginning or end. ‘8’ reflects the concept of an
              endless loop in which anyone can start from any point at any time.
              The theme highlights the assurance that a solution awaits as we
              navigate through the loop of hardship with determination. <br />
              <br />
              The true nature of the theme also encourages us to travel through
              wide ranging perspectives. One such perspective is shifting 8
              horizontally, symbolizing growth is iterative despite the
              frustrations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
