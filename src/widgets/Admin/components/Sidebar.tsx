"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Sidebar() {
  const pathname = usePathname(); // Get the current path
  const currentLocation = pathname.split("/")[2]; // Extract the relevant part of the path

  const menu = [
    {
      title: "List Users",
      link: "/admin/list-users",
    },
    {
      title: "Purchased",
      link: "/admin/purchased",
    },
  ];

  return (
    <div className="px-[2vw] w-[250px] bg-black-100 min-h-screen">
      <div className="py-5 flex flex-col gap-2">
        {menu.map((item) => {
          const isActive = pathname === item.link;
          return (
            <Link key={item.link} href={item.link}>
              <div
                className={`w-full px-4 py-2 rounded ${
                  isActive ? "bg-primary-400 text-white" : "bg-black-100 text-gray-400"
                } hover:bg-primary-300 hover:text-white transition-all duration-200`}
              >
                {item.title}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
