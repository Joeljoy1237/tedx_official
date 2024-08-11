"use client";
import React, { useEffect, useState } from "react";
import RegisterForm from "./RegisterForm";
import RegisterContent from "./RegisterContent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PreLoader from "@components/PreLoader";

export default function Content() {
  const { data: session, status } = useSession();
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
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
    <main className="w-screen h-screen bg-black-100 flex items-center justify-center overflow-x-hidden">
      {!isLoaded && <PreLoader />}
      <RegisterForm />
      <RegisterContent />
    </main>
  );
}
