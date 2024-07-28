"use client";
import Video from "@core/Video";
import React, { useEffect } from "react";
import HeroText from "@widgets/LandingPage/components/HeroText";
import AboutView from "@widgets/About";
import Welcome from "@widgets/LandingPage/components/Welcome";
import ScrollTextView from "@widgets/LandingPage/components/ScrollTextView";
import OurThemeView from "@widgets/OurTheme";
import gsap from "gsap";
import Image from "next/image";
// import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function LandingPageView() {
  gsap.registerPlugin();
  // useEffect(() => {
  //   ScrollSmoother.create({
  //     smooth: 1,
  //     effects: true,
  //     smoothTouch: 0.1,
  //   });
  // }, []);
  return (
    <>
      <div className="bg-slk-black-200 relative overflow-hidden w-full min-h-screen py-14">
        <Video
          url="https://firebasestorage.googleapis.com/v0/b/tedxccet.appspot.com/o/assets%2FWhatsApp%20Video%202024-07-27%20at%2016.09.00.mp4?alt=media&token=b0813adc-5864-4830-9830-454be63a8ec6"
          className="absolute inset-0 w-full h-full object-cover hidden md:flex lg:flex"
        />
        <Image loading="lazy" src={"https://firebasestorage.googleapis.com/v0/b/tedxccet.appspot.com/o/assets%2FScreenshot%202024-07-28%20120618.png?alt=media&token=cf069e18-85d2-4938-9a5a-b045cec4e028"} alt="" width={1000} height={1000} className="absolute inset-0 w-full h-full object-cover flex md:hidden lg:hidden"/>
        {/* <div className="circlePosition bg-primary-700 h-[15rem] items-center justify-center flex w-[15rem] absolute top-[50%] left-[10%] translate-x-[-50%] translate-y-[-50%] blur-[130px]"></div> */}
        {/* <div className="circlePosition bg-primary-700 h-[50vh] w-[55vw] absolute top-[50%] left-[30%] translate-x-[-50%] translate-y-[-50%] blur-[50px]"></div> */}
        {/* <div className="circlePosition bg-primary-700 bg-opacity-50 h-[15rem] w-[15rem] absolute top-[10%] left-[93%] translate-x-[-50%] translte-y-[-50%] blur-[90px]"></div> */}
        <div className="absolute inset-0 bg-black-100 opacity-80 md:opacity-70 lg:opacity-70" />
        <HeroText />
      </div>
      <ScrollTextView />
      <Welcome />
      <AboutView />
      <OurThemeView />
    </>
  );
}
