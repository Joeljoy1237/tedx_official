"use client";

import React, { useState, useEffect } from "react";
import Image from "@components/Image";
import Logo from "@components/Logo";
import { navLinks } from "@utils/constants";
import Button from "@components/Button";
import Link from "@components/Link";
import IconArrow from "@icons/IconArrow";
import { HiMenuAlt2 } from "react-icons/hi";
import TLogo from "@components/TLogo";
import { usePathname } from "next/navigation";
import { MdClose } from "react-icons/md";
import Drawer from "./components/Drawer";

export default function HeaderView() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClose = () => {
      setDrawerOpen(false);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div
      className={`${
        drawerOpen && "bg-black-100"
      } fixed w-full flex-col items-center justify-center px-[5vw] md:py-[1.5rem] py-7 lg:py-[1.5rem] top-0 z-50 flex ${
        isScrolled ? "backdrop-blur-md" : ""
      }`}
    >
      <div className="flex w-full">
        <Link href="/">
          <div className="flex-1 hidden md:flex lg:flex">
            <Logo />
          </div>
          <div className="flex-1 flex md:hidden lg:hidden">
            <TLogo />
          </div>
        </Link>
        <div className="flex-2 md:flex lg:flex hidden items-center justify-center gap-[3vw] w-full">
          {navLinks?.map((navLink, index) => (
            <div className="" key={`${navLink?.title}_${index}`}>
              <Link
                href={navLink?.url}
                className={`capitalize font-semibold ${
                  location === navLink?.url && "text-primary-700"
                }`}
              >
                {navLink?.title}
              </Link>
            </div>
          ))}
        </div>
        <div className="flex-1 flex items-center justify-end">
          {!drawerOpen ? (
            <HiMenuAlt2
              className="flex md:hidden lg:hidden text-2xl cursor-pointer"
              onClick={() => {
                setDrawerOpen(true);
              }}
            />
          ) : (
            <MdClose
              className="flex md:hidden lg:hidden text-2xl cursor-pointer"
              onClick={handleClose}
            />
          )}

          <Button
            className="px-4 py-2 rounded-[10px] md:flex lg:flex hidden items-center justify-center font-bold text-primary-700 gap-2"
            title="Register"
            icon={<IconArrow className="size-6" />}
          />
        </div>
      </div>
      {drawerOpen && <Drawer handleClose={handleClose} />}
    </div>
  );
}
