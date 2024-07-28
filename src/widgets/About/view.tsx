"use client"
import TitleBar from "@components/TitleBar";
import { aboutDetails } from "@utils/constants";
import React, { useEffect, useState } from "react";
import AboutItemView from "./components/AboutItemView";
import PreLoader from "@components/PreLoader";

export default async function AboutView() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const minimumLoadTime = 0; // Minimum load time in milliseconds (1 second)
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
    <div className="px-[5vw] py-[1rem] pb-14">
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <TitleBar title="About" />
        <div className="flex flex-col md:flex-row lg:flex-row gap-8">
          {aboutDetails?.map((about, index) => (
            <AboutItemView
              title={about?.title}
              desc={about?.desc}
              key={`${about?.title}_${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
