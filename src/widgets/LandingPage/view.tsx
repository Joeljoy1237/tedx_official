"use client";
import React, { useState, useEffect } from "react";
import AboutView from "@widgets/About";
import Welcome from "@widgets/LandingPage/components/Welcome";
import OurThemeView from "@widgets/OurTheme";
import PreLoader from "@components/PreLoader";
import HeaderView from "@widgets/Header";
import BannerView from "./components/BannerView";
import dynamic from "next/dynamic";
import FooterView from "@widgets/Footer";
import AboutSection from "./components/AboutSection";
import ThemeSection from "./components/Theme";

const LandingPageView: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const ScrollTextView = dynamic(
    () => import("@widgets/LandingPage/components/ScrollTextView"),
    {
      ssr: false,
    }
  );

  return (
    <div className="w-full flex flex-col gap-2">
      {!isLoaded && <PreLoader />}
      <HeaderView />
      <BannerView />
      <ScrollTextView />
      <Welcome />
      <ThemeSection />
      <AboutSection/>
      <FooterView />
    </div>
  );
};

export default LandingPageView;
