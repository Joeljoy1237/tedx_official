"use client"

import PreLoader from "@components/PreLoader";
import AdminHeader from "@widgets/Admin/components/AdminHeader";
import Sidebar from "@widgets/Admin/components/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: session, status } = useSession();
  const [visible, setVisible] = useState(true);

  const router = useRouter();
  useEffect(() => {
  
    if (status === "unauthenticated") {
      // Redirect to home page
      router.replace("/");
    }
    if(session?.user?.isAdmin === false){
      router.replace("/login");
    }else{
      setIsLoaded(true)
    }
  }, [status, session, router]);
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {!isLoaded && <PreLoader/>}
      {/* Header */}
      <header>
        <AdminHeader />
      </header>

      {/* Main content with Sidebar and Children */}
      <div className="flex flex-1 pt-[100px]">
        {/* Sidebar */}
        <aside className="w-64 fixed top-[100px] left-0 h-[calc(100vh-100px)]">
          <Sidebar />
        </aside>

        {/* Main content area */}
        <main className="flex-grow ml-64 p-6 bg-black-200 bg-opacity-50">
          {children ? (
            children
          ) : (
            <p className="text-center text-white">No content provided</p>
          )}
        </main>
      </div>
    </div>
  );
}
