"use client";
import React, { useEffect, useState } from "react";
import Theme from "./components/Theme";
import PreLoader from "@components/PreLoader";
import HeaderView from "@widgets/Header";
import FooterView from "@widgets/Footer";
import dynamic from "next/dynamic";

export default function OurThemeView() {
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
  
  const SmoothScrollCustom = dynamic(
    () => import("@components/ScrollSmoother"),
    {
      ssr: false,
    }
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      {!isLoaded && <PreLoader />}
      <HeaderView />
      <div className="pt-[100px] pb-[5vh]">
        <Theme />
      </div>
      <FooterView />
      {/* {isDesktop && <SmoothScrollCustom />} */}
    </main>
  );
}
