"use client";
import React, { useState, useEffect } from "react";
import Video from "@core/Video";
import HeroText from "@widgets/LandingPage/components/HeroText";
import AboutView from "@widgets/About";
import Welcome from "@widgets/LandingPage/components/Welcome";
import ScrollTextView from "@widgets/LandingPage/components/ScrollTextView";
import OurThemeView from "@widgets/OurTheme";
import Image from "next/image";
import PreLoader from "@components/PreLoader";

const LandingPageView: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const minimumLoadTime = 1000; // Minimum load time in milliseconds (1 second)
    const loadStartTime = Date.now();

    const handleLoad = () => {
      const loadEndTime = Date.now();
      const elapsedTime = loadEndTime - loadStartTime;
      const remainingTime = minimumLoadTime - elapsedTime;

      if (remainingTime > 0) {
        setTimeout(() => {
          setLoading(false);
        }, remainingTime);
      } else {
        setLoading(false);
      }
    };

    const images = Array.from(document.images) as HTMLImageElement[];
    const videos = Array.from(
      document.getElementsByTagName("video")
    ) as HTMLVideoElement[];

    const checkIfMediaLoaded = () => {
      const allLoaded =
        images.every((img) => img.complete) &&
        videos.every((video) => video.readyState >= 3);
      if (allLoaded) {
        handleLoad();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        handleLoad();
      } else {
        img.addEventListener("load", handleLoad);
      }
    });

    videos.forEach((video) => {
      if (video.readyState >= 3) {
        handleLoad();
      } else {
        video.addEventListener("loadeddata", handleLoad);
      }
    });

    checkIfMediaLoaded();

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleLoad);
      });
      videos.forEach((video) => {
        video.removeEventListener("loadeddata", handleLoad);
      });
    };
  }, []);

  if (loading) {
    return <PreLoader />;
  }

  return (
    <>
      <div className="bg-slk-black-200 relative overflow-hidden w-full h-[97vh] md:min-h-screen lg:min-h-screen py-14">
        <Video
          url="https://firebasestorage.googleapis.com/v0/b/tedxccet.appspot.com/o/assets%2FWhatsApp%20Video%202024-07-27%20at%2016.09.00.mp4?alt=media&token=b0813adc-5864-4830-9830-454be63a8ec6"
          className="absolute inset-0 w-full h-full object-cover hidden md:flex lg:flex"
        />
        <Image
          loading="lazy"
          src="https://firebasestorage.googleapis.com/v0/b/tedxccet.appspot.com/o/assets%2FScreenshot%202024-07-28%20120618.png?alt=media&token=cf069e18-85d2-4938-9a5a-b045cec4e028"
          alt="TEDxCCET Event"
          width={1000}
          height={1000}
          className="absolute inset-0 w-full h-full object-cover flex md:hidden lg:hidden"
        />
        <div className="absolute inset-0 bg-black-100 opacity-80 md:opacity-70 lg:opacity-70" />
        <HeroText />
      </div>
      <ScrollTextView />
      <Welcome />
      <AboutView />
      <OurThemeView />
    </>
  );
};

export default LandingPageView;
