"use client";
import TitleBar from "@components/TitleBar";
import { aboutDetails } from "@utils/constants";
import React, { useEffect, useState } from "react";
import AboutItemView from "./components/AboutItemView";
import PreLoader from "@components/PreLoader";
import About from "./components/About";
import HeaderView from "@widgets/Header";
import FooterView from "@widgets/Footer";
import dynamic from "next/dynamic";

export default function AboutView() {
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
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-[100px] flex flex-col gap-[10vh]">
      {!isLoaded && <PreLoader />}
      <HeaderView />
      <About />
      <FooterView />
      {isDesktop && <SmoothScrollCustom />}
    </div>
  );
}
