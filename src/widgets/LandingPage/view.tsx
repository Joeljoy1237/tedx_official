import Video from "@core/Video";
import React from "react";
import HeroText from "@widgets/LandingPage/components/HeroText";
import AboutView from "@widgets/About";
import Welcome from "@widgets/LandingPage/components/Welcome";
import ScrollTextView from "@widgets/LandingPage/components/ScrollTextView";
import OurThemeView from "@widgets/OurTheme";
import { LiaInfinitySolid } from "react-icons/lia";

export default function LandingPageView() {
  return (
    <>
      <div className="bg-slk-black-200 relative overflow-hidden w-full min-h-screen py-14">
        <Video url="https://firebasestorage.googleapis.com/v0/b/tedxccet.appspot.com/o/assets%2FWhatsApp%20Video%202024-07-27%20at%2020.webm?alt=media&token=90e5f7b0-cb06-4ac4-9129-7f75e6a61336" className="absolute inset-0 w-full h-full object-cover" />
        {/* <div className="circlePosition bg-primary-700 h-[15rem] items-center justify-center flex w-[15rem] absolute top-[50%] left-[10%] translate-x-[-50%] translate-y-[-50%] blur-[130px]"></div>
        <div className="circlePosition bg-primary-700 h-[10rem] w-[10rem] absolute top-[50%] left-[70%] translate-x-[-50%] translate-y-[-50%] blur-[110px]"></div> */}
        {/* <div className="circlePosition bg-primary-700 bg-opacity-50 h-[15rem] w-[15rem] absolute top-[10%] left-[93%] translate-x-[-50%] translate-y-[-50%] blur-[90px]"></div> */}
        <div className="absolute inset-0 bg-black-100 opacity-70" />
        <HeroText />
      </div>
      <ScrollTextView />
      <Welcome />
      <AboutView />
      <OurThemeView />
    </>
  );
}
