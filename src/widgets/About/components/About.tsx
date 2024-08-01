import TitleBar from "@components/TitleBar";
import React from "react";
import AboutItemView from "./AboutItemView";
import { aboutDetails } from "@utils/constants";

export default function About() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 px-[5vw]">
      <TitleBar title="About" />
      <div className="flex flex-col md:flex-row lg:flex-row gap-8">
        {aboutDetails?.map((about, index) => (
          <AboutItemView
            title={about?.title}
            desc={about?.desc}
            key={`${about?.title}_${index}`}
          />
        ))}
      </div>
    </div>
  );
}
