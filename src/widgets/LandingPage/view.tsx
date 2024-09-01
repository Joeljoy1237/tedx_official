"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import AboutView from "@widgets/About";
import Welcome from "@widgets/LandingPage/components/Welcome";
import OurThemeView from "@widgets/OurTheme";
import PreLoader from "@components/PreLoader";
import HeaderView from "@widgets/Header";
import BannerView from "./components/BannerView";
import FooterView from "@widgets/Footer";
import AboutSection from "./components/AboutSection";
import ThemeSection from "./components/Theme";
import TicketView from "@widgets/Ticket";
import { animateScroll } from "react-scroll";
import Reasons from "./components/Reasons";
import SpeakerSection from "@widgets/Speakers/components/SpeakerSection";
import BannerRed from "./components/BannerRed";
import Tariff from "./components/Tariff";
import Content from "@widgets/Sponsors/components/Content";

// Dynamically import the SmoothScrollCustom component without SSR
const SmoothScrollCustom = dynamic(() => import("@components/ScrollSmoother"), {
  ssr: false,
});

// Dynamically import the ScrollTextView component without SSR
const Flicker = dynamic(
  () => import("@widgets/LandingPage/components/Flicker"),
  {
    ssr: false,
  }
);

const LandingPageView: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if the window object is available and set the isDesktop state
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Set initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Set a timeout to simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    animateScroll.scrollToTop();
  }, []);

  return (
    <div className="w-full flex flex-col gap-2">
      {!isLoaded && <PreLoader />}
      <HeaderView />
      <BannerView />
      {/* <ScrollTextView /> */}
      <Flicker />
      <Welcome />
      <Reasons />
      <ThemeSection />
      <BannerRed/>
      <div className="pt-[50px]">
      <SpeakerSection/>
      </div>
      <TicketView />
      <Tariff/>
      <AboutSection />
      {/* <Content/> */}
      <FooterView />
      {/* {isDesktop && <SmoothScrollCustom />} */}
    </div>
  );
};

export default LandingPageView;
