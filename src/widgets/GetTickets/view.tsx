"use client";

import React, { useEffect, useState } from "react";
import Content from "./components/Content";
import HeaderView from "@widgets/Header";
import Footer from "./components/Footer";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PreLoader from "@components/PreLoader";

export default function GetTickets() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: session, status } = useSession();

  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect to home page
      router.push("/");
    }
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [status, session, router]);

  return (
    <main>
      {!isLoaded && <PreLoader />}
      <HeaderView />
      <div className="pt-[100px]">
        <Content />
      </div>
      <Footer />
    </main>
  );
}
