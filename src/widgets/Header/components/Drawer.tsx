"use client";
import Button from "@components/Button";
import { navLinks } from "@utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import IconArrow from "@icons/IconArrow";

interface DrawerProps {
    handleClose: () => void;
  }
  
  const Drawer: React.FC<DrawerProps> = ({ handleClose }) => {
  const location = usePathname();
  return (
    <div className="h-[92vh] items-center justify-start mt-[3vh] bg-black-100 w-[100vw] px-[5vw] flex flex-col pt-[10vh] gap-8 relative">
      <div className="flex-2 md:hidden lg:hidden flex flex-col items-center justify-center gap-[5vw] w-full">
        {navLinks?.map((navLink, index) => (
          <div
            className="w-full flex items-center justify-between"
            key={`${navLink?.title}_${index}`}
            onClick={handleClose}
          >
            <Link
              href={navLink?.url}
              className={`capitalize font-semibold ${
                location === navLink?.url && "text-primary-700"
              }`}
            >
              {navLink?.title}
            </Link>
            <IoIosArrowForward
              className={`capitalize font-semibold ${
                location === navLink?.url && "text-primary-700"
              }`}
            />
          </div>
        ))}
      </div>
      <div className="w-full flex">
        <Button
          className="px-4 py-2 rounded-[10px] md:flex lg:flex w-full bg-primary-700 flex items-center justify-center font-bold gap-2"
          title="Register"
          icon={<IconArrow className="size-6" />}
        />
      </div>
      <div className="flex items-center justify-center w-full absolute bottom-8">
        <span className="text-xs">
          © Copyright 2024 | Crafted by{" "}
          <span className="text-primary-700 font-extrabold">
            TED
            <sup className="md:top-[-10px] lg:top-[-3px] top-[-3px]">x</sup>
            CCET
          </span>
        </span>
      </div>
    </div>
  );
}


export default Drawer