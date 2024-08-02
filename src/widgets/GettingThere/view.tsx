"use client";

import FooterView from "@widgets/Footer";
import HeaderView from "@widgets/Header";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import GettingThereSection from "./components/GettingThereSection";
import PreLoader from "@components/PreLoader";

export default function GettingThereView() {
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
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <main>
      {!isLoaded && <PreLoader />}
      <HeaderView />
      <GettingThereSection />
      <FooterView />
      {isDesktop && <SmoothScrollCustom />}
    </main>
  );
}
