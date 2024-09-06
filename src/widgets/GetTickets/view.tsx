"use client";

import React, { useEffect, useState } from "react";
import Content from "./components/Content";
import HeaderView from "@widgets/Header";
import Footer from "./components/Footer";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PreLoader from "@components/PreLoader";
import Bought from "./components/Bought";
import FooterView from "@widgets/Footer";

export default function GetTickets() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: session, status } = useSession();
  const [visible, setVisible] = useState(true);

  const router = useRouter();
  router.push("/");
  useEffect(() => {
    // Use the double-bang operator to ensure 'visible' is always a boolean
    setVisible(!!session?.user?.isBought);

    if (status === "unauthenticated") {
      // Redirect to login page
      router.push("/login");
    }

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [status, session, router]);

  const handlePassLoadStatus = () => {
    setIsLoaded(false);
  };

  return (
    <main>
      {!isLoaded && <PreLoader />}
      <HeaderView />
      <div className="pt-[100px]">
        {visible ? (
          <Bought />
        ) : (
          <Content handlePassLoadStatus={handlePassLoadStatus} />
        )}
      </div>
      {visible ? <FooterView /> : <Footer />}
    </main>
  );
}
