import AdminHeader from "@widgets/Admin/components/AdminHeader";
import Sidebar from "@widgets/Admin/components/Sidebar";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
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
        <main className="flex-grow ml-64 p-6 bg-black-200">
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
