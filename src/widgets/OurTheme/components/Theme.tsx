import TitleBar from "@components/TitleBar";
import Video from "@core/Video";
import React from "react";

export default function Theme() {
  return (
    <div className="relative isolate min-h-[100vh] px-[5vw] flex items-center justify-center">
      <div className="flex flex-col gap-8 w-full">
        <TitleBar titleSecond="Theme" title="OUR" />
        <div className="w-full flex items-center justify-center flex-col gap-5">
        <span className="text-5xl font-bold">“Infin8”</span>
        <span className="text-5xl font-bold">From 8 to Infinity: Embracing Limitless Growth</span>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row">
          <div className="flex-1 flex flex-col items-center justify-center">
            <Video url="/theme.webm" className="w-full h-full" />
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
              frustrations. Given below is a list of expert speakers each
              renowned in their respective fields, to gather under one umbrella
              for this event. Together, they are capable of dispersing their
              ideas and insights to our audience, enriching collective knowledge
              and understanding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
