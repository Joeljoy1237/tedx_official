"use client"

import React, { useState, useEffect } from "react";
import Image from "@components/Image";
import Logo from "@components/Logo";
import { navLinks } from "@utils/constants";
import Button from "@components/Button";
import Link from "@components/Link";
import IconArrow from "@icons/IconArrow";
import { HiMenuAlt2 } from "react-icons/hi";
import TLogo from "@components/TLogo";

export default function HeaderView() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`fixed w-full items-center justify-center px-[5vw] md:py-[1.5rem] py-4 lg:py-[1.5rem] top-0 z-50 flex ${isScrolled ? 'backdrop-blur-md' : ''}`}>
      <div className="flex-1 hidden md:flex lg:flex">
        <Logo />
      </div>
      <div className="flex-1 flex md:hidden lg:hidden">
        <TLogo/>
      </div>
      <div className="flex-2 md:flex lg:flex hidden items-center justify-center gap-[3vw] w-full">
        {navLinks?.map((navLink, index) => (
          <div className="" key={`${navLink?.title}_${index}`}>
            <Link href={navLink?.url} className="capitalize font-semibold">{navLink?.title}</Link>
          </div>
        ))}
      </div>
      <div className="flex-1 flex items-center justify-end">
      <HiMenuAlt2 className="flex md:hidden lg:hidden text-3xl cursor-pointer"/>
        <Button className="px-4 py-2 rounded-[10px] md:flex lg:flex hidden items-center justify-center font-bold text-primary-700 gap-2" title="Register" icon={<IconArrow className="size-6"/>}/>
      </div>
    </div>
  );
}
