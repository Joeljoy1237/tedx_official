"use client";

import PreLoader from "@components/PreLoader";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";

export default function ErrorPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: session, status } = useSession();

  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect to home page
      router.push("/login");
    }
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [status, session, router]);

  return (
    <main>
      {!isLoaded && <PreLoader />}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
        <Image
          src={"/forgot.png"}
          className="w-full h-[100vh] object-cover bg-center"
          width={1000}
          height={1000}
          alt=""
        />
        <div className="bg-black-100 bg-opacity-60 p-10 rounded-xl shadow-xl max-w-lg text-center absolute">
          <div className="flex justify-center items-center mb-8">
            <div className="bg-red-100 text-red-600 p-4 rounded-full">
              <IoWarningOutline className="text-6xl" />
            </div>
          </div>
          <h3 className="text-4xl font-semibold text-red-600 mb-5">
            Payment Failed
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Unfortunately, your transaction could not be processed. Please try
            again or contact support.
          </p>
          <button
            onClick={() => (window.location.href = "/get-tickets")}
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-6 rounded-lg hover:from-red-600 hover:to-orange-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Try Again
          </button>
          <div className="mt-8">
            <a href="/" className="text-indigo-600 hover:underline">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
