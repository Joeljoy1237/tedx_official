"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import HeroText from "./HeroText";
import Image from "next/image";

export default function BannerView() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imgUrls = [
    "/images/bg1.gif",
    "/images/bg2.jpg",
    "/images/bg3.jpg",
    "/images/bg4.jpg",
    "/images/bg5.jpg",
    "/images/bg6.jpg",
    "/images/bg7.jpg",
    "/images/bg8.jpg",
    "/images/bg.jpeg",
    "/images/bg.png",
    "/images/bg.webp",
    "/images/bg1.webp",
  ];

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imgUrls.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId);
  }, [imgUrls.length]);

  return (
    <div className="bg-slk-black-200 flex flex-col relative overflow-hidden w-full h-[100vh] md:min-h-screen lg:min-h-screen">
      <Suspense fallback={<>Loading...</>}>
        {imgUrls.map((url, index) => (
          <Image
            key={index}
            className={`absolute inset-0 w-full h-full object-cover ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            } transition-opacity duration-1000 ease-in-out`}
            src={url}
            height={1000}
            width={1000}
            alt=""
            priority
          />
        ))}
      </Suspense>
      <div className="absolute inset-0 blur-overlay" />
      <HeroText />
    </div>
  );
}
