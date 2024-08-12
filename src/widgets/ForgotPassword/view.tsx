"use client"

import FooterView from '@widgets/Footer'
import HeaderView from '@widgets/Header'
import React, { useEffect, useState } from 'react'
import Forgot from './components/Forgot'
import dynamic from 'next/dynamic';
import PreLoader from '@components/PreLoader'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordView() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();
  
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
  
    const SmoothScrollCustom = dynamic(
      () => import("@components/ScrollSmoother"),
      {
        ssr: false,
      }
    );
    useEffect(() => {
      if (status === "authenticated") {
        // Redirect to home page
        router.push("/");
      }
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 1300);
  
      return () => clearTimeout(timer);
    }, [status, session, router]);
  return (
    <main>
        {!isLoaded && <PreLoader />}
        <Forgot/>
        {/* {isDesktop && <SmoothScrollCustom />} */}
    </main>
  )
}
