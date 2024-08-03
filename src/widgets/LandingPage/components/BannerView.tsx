"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import HeroText from "./HeroText";

type VideoProps = {
  url: string;
  className?: string;
};

function Video({ url, className }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const handleCanPlay = () => {
        videoElement.play().catch((error) => {
          console.error("Video play error:", error);
        });
      };

      videoElement.addEventListener("canplay", handleCanPlay);

      return () => {
        videoElement.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      src={url}
      playsInline
      muted
      autoPlay
      loop
      preload="auto"
    />
  );
}

export default function BannerView() {
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
  return (
    <div className="bg-slk-black-200 flex flex-col relative overflow-hidden w-full h-[100vh] md:min-h-screen lg:min-h-screen">
      <Suspense fallback={<>Loading...</>}>
        {/* {!isDesktop ? (
          <Video
            url="/bg.mp4"
            className="absolute inset-0 w-full h-full object-cover flex md:flex lg:flex"
          />
        ) : ( */}
          <Video
            url="https://res.cloudinary.com/dk5dtphvj/video/upload/v1722621977/WhatsApp_Video_2024-07-27_at_20.46.45_zf9xdt.webm"
            className="absolute inset-0 w-full h-full object-cover flex md:flex lg:flex"
          />
        
      </Suspense>
      <div className="absolute inset-0 bg-black-100 opacity-70 md:opacity-70 lg:opacity-70" />
      <HeroText />
    </div>
  );
}
