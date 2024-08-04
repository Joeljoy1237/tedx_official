"use client"

import React, { useEffect, useState } from "react";
import ProfilePage from "./components/ProfilePage";
import HeaderView from "@widgets/Header";
import FooterView from "@widgets/Footer";
import PreLoader from "@components/PreLoader";
import dynamic from "next/dynamic";

export default function ProfileView() {
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
      <ProfilePage />;
      <FooterView />
      <SmoothScrollCustom/>
    </main>
  );
}
