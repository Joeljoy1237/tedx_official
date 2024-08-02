"use client";
import React, { Suspense, useEffect, useRef } from "react";
import HeroText from "./HeroText";

export default function BannerView() {
  return (
    <div className="bg-slk-black-200 flex flex-col relative overflow-hidden w-full h-[100vh] md:min-h-screen lg:min-h-screen">
      <Suspense fallback={<>Loading...</>}>
        <video
          width="320"
          height="240"
          controls={false}
          preload="none"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover flex md:flex lg:flex"
        >
          <source
            src={
              "https://firebasestorage.googleapis.com/v0/b/tedxccet.appspot.com/o/assets%2Flow_bit%20(1).mp4?alt=media&token=517c6e35-d681-4018-ba79-310d29b89c73"
            }
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </Suspense>
      <div className="absolute inset-0 bg-black-100 opacity-70 md:opacity-70 lg:opacity-70" />
      <HeroText />
    </div>
  );
}
