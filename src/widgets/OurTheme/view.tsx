"use client";
import React, { useEffect, useState } from "react";
import Theme from "./components/Theme";
import PreLoader from "@components/PreLoader";

export default function OurThemeView() {
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
    <div className="relative overflow-hidden w-full min-h-screen pt-10">
      <div className="absolute inset-0" />
      <Theme />
    </div>
  );
}
