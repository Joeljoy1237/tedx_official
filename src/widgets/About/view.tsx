import TitleBar from "@components/TitleBar";
import { aboutDetails } from "@utils/constants";
import React from "react";
import AboutItemView from "./components/AboutItemView";

export default async function AboutView() {
  return (
    <div className="px-[5vw] py-[1rem] pb-14">
      <div className="w-full flex flex-col items-center justify-center gap-8">
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
    </div>
  );
}
