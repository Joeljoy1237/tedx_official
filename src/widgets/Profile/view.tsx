"use client";

import React, { useEffect, useState } from "react";
import ProfilePage from "./components/ProfilePage";
import HeaderView from "@widgets/Header";
import FooterView from "@widgets/Footer";
import PreLoader from "@components/PreLoader";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import showTedxToast from "@components/showTedxToast";

interface User {
  resetTokenUsed: boolean;
  isAdmin: boolean;
  resetCount: Number;
  tokenUsed: boolean;
  _id: string;
  firstName:string;
  lastName:string;
  email:string;
  organisation:string;
  designation:string;
}

interface Group {
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  ticketId: string;
  _id: string;
}

interface Profile {
  user: User;
  group: Group[];
  bookingId:string;
}

export default function ProfileView() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect to home page
      router.push("/login");
    }
  }, [status, session, router]);

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
    const fetchProfile = async () => {
      try {
        if (!session?.user?._id) return;
        // showTedxToast({
        //   type: "info",
        //   message: "Please wait",
        //   desc: "We're fetching your details",
        // });
        const response = await fetch("/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: session.user._id }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching profile:", errorData.message);
          showTedxToast({
            type: "error",
            message: "Profile fetch failed",
            desc:
              errorData.desc ||
              "An error occurred while fetching the profile.",
          });
          return;
        }

        const data: Profile = await response.json();
        setProfile(data);
      } catch (err) {
        console.error("Unexpected error:", err);
        showTedxToast({
          type: "error",
          message: "Unexpected Error",
          desc: "An unexpected error occurred. Please try again later.",
        });
      } finally {
        setIsLoaded(true);
      }
    };

    fetchProfile();
  }, [session?.user?._id]);

  return (
    <main>
      {!isLoaded && <PreLoader />}
      <HeaderView />
      <ProfilePage profile={profile}/>
      <FooterView />
    </main>
  );
}
