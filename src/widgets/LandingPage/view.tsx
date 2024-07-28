import Video from "@core/Video";
import React from "react";
import HeroText from "@widgets/LandingPage/components/HeroText";
import AboutView from "@widgets/About";
import Welcome from "@widgets/LandingPage/components/Welcome";
import ScrollTextView from "@widgets/LandingPage/components/ScrollTextView";
import OurThemeView from "@widgets/OurTheme";

export default function LandingPageView() {
  return (
    <>
      <div className="bg-slk-black-200 relative overflow-hidden w-full min-h-screen">
        {/* <Video url="/home.gif" className="absolute inset-0 w-full h-full object-cover" /> */}
        <div className="absolute inset-0 bg-black-100 opacity-80" />
        <HeroText />
      </div>
      <ScrollTextView/>
      <Welcome/>
      <AboutView />
      <OurThemeView/>
    </>
  );
}
