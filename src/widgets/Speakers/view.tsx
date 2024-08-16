"use client"
import FooterView from "@widgets/Footer";
import HeaderView from "@widgets/Header";
import React, { useEffect, useState } from "react";
import SpeakerSection from "./components/SpeakerSection";
import PreLoader from "@components/PreLoader";

export default function Speakers() {
  const [isLoaded, setIsLoaded] = useState(false);
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
      <div className="pt-[100px]">
      <SpeakerSection />
      </div>
      <FooterView />
    </main>
  );
}
