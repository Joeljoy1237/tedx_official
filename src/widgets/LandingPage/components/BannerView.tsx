"use client";
import React, { Suspense, useEffect, useRef } from "react";
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
  return (
    <div className="bg-slk-black-200 flex flex-col relative overflow-hidden w-full h-[100vh] md:min-h-screen lg:min-h-screen">
      <Suspense fallback={<>Loading...</>}>
        <Video
          url="https://res.cloudinary.com/dk5dtphvj/video/upload/v1722613612/WhatsApp_Video_2024-07-27_at_20_sfgihd.mp4"
          className="absolute inset-0 w-full h-full object-cover flex md:flex lg:flex"
        />
      </Suspense>
      <div className="absolute inset-0 bg-black-100 opacity-70 md:opacity-70 lg:opacity-70" />
      <HeroText />
    </div>
  );
}
