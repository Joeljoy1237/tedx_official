"use client";
import React, { useEffect, useState } from "react";
import Theme from "./components/Theme";
import PreLoader from "@components/PreLoader";
import HeaderView from "@widgets/Header";
import FooterView from "@widgets/Footer";

export default function OurThemeView() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {!isLoaded && <PreLoader />}
      <HeaderView />
      <div className="pt-[100px] pb-[5vh]">
        <Theme />
      </div>
      <FooterView />
    </div>
  );
}
