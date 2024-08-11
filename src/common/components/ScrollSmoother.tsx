"use client";
import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroller(): JSX.Element {
  useEffect(() => {
    // Initialize Lenis with type safety
    const lenis = new Lenis({
      duration: 1.2, // Adjust duration for smoother scroll
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Performance-friendly easing
      // smooth: true,
      // smoothTouch: false, // Disable smooth scrolling for touch devices
    });

    // Sync Lenis with GSAP's ScrollTrigger
    lenis.on("scroll", () => ScrollTrigger.update());

    // RAF loop using GSAP's ticker
    const rafCallback = (time: number) => {
      lenis.raf(time);
    };

    gsap.ticker.add(rafCallback);

    // Clean up on component unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
    };
  }, []);

  return <></>;
}
