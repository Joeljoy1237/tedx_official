"use client"

// import Video from "@core/Video";
import React, { useEffect } from "react";
import HeroText from "@widgets/LandingPage/components/HeroText";
import AboutView from "@widgets/About";
import Welcome from "@widgets/LandingPage/components/Welcome";
// import ScrollTextView from "@widgets/LandingPage/components/ScrollTextView";
import OurThemeView from "@widgets/OurTheme";
import dynamic from "next/dynamic";

const ScrollTextView = dynamic(() => import("@widgets/LandingPage/components/ScrollTextView"), {
  ssr: false,
});

const Video = dynamic(() => import("@core/Video"), {
  ssr: false,
});

export default function LandingPageView() {
  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, [])
  return (
    <>
      <div className="bg-slk-black-200 relative overflow-hidden w-full min-h-screen pt-10">
        <Video url="home.mp4" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black-100 opacity-30" />
        <HeroText />
      </div>
      <ScrollTextView/>
      <Welcome/>
      <AboutView />
      <OurThemeView/>
    </>
  );
}
