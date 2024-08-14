"use client";

import React, { useEffect, useState } from "react";
import ProfilePage from "./components/ProfilePage";
import HeaderView from "@widgets/Header";
import FooterView from "@widgets/Footer";
import PreLoader from "@components/PreLoader";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfileView() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect to home page
      router.push("/login");
    }
  }, [status, session, router]);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      {!isLoaded && <PreLoader />}
      <HeaderView />
      <ProfilePage />;
      <FooterView />
      {/* <SmoothScrollCustom /> */}
    </main>
  );
}
