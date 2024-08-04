"use client"
import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroller() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Controls the duration of the scroll in seconds
      easing: (t) => 1 - Math.pow(1 - t, 3), // Custom easing function for smooth scrolling
      touchMultiplier: 2, // Multiplier for touch scroll speed
    });

    // Event listener for Lenis scroll
    lenis.on('scroll', (e: any) => {
    });

    // Sync Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // GSAP ticker to update Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP lag smoothing
    gsap.ticker.lagSmoothing(0);

    // Cleanup function
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return null;
}
