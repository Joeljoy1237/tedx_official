"use client";
import TitleBar from "@components/TitleBar";
import { aboutDetails } from "@utils/constants";
import React, { useEffect, useState } from "react";
import AboutItemView from "./components/AboutItemView";
import PreLoader from "@components/PreLoader";
import About from "./components/About";
import HeaderView from "@widgets/Header";
import FooterView from "@widgets/Footer";

export default function AboutView() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-[100px] flex flex-col gap-[10vh]">
      {!isLoaded && <PreLoader />}
      <HeaderView/>
      <About />
      <FooterView/>
    </div>
  );
}
