import Logo from "@components/Logo";
import IconMail from "@icons/IconMail";
import IconPhone from "@icons/IconPhone";
import { navLinks } from "@utils/constants";
import Link from "next/link";
import React from "react";
import Social from "./components/Social";
import { CiLink } from "react-icons/ci";
import Credits from "./components/Credits";
import Image from "@components/Image";

export default function FooterView() {
  return (
    <div className="bg-black-100 rounded-lg px-[5vw] py-[2rem] flex flex-col gap-5 md:gap-10 lg:gap-10">
      <div className="flex flex-col md:flex-row lg:flex-row gap-8">
        <div className="flex flex-col items-start justify-start flex-1">
          <Image src={"/Logo.svg"} height={200} width={240} alt="" />
        </div>
        <div className="flex flex-col items-start justify-start flex-1 gap-4">
          <div className="">
            <h3 className="font-semibold text-gray-600">Usefull links</h3>
          </div>
          <div className="flex flex-col gap-2">
          {navLinks?.map((link, index) => (
        <div
          className="relative flex items-center justify-start gap-2 group w-auto"
          key={`${link?.title}_${index}`}
        >
          <CiLink />
          <div className="relative link-container">
            <Link
              className="capitalize font-medium group-hover:text-blue-500 transition-all duration-300 inline-block"
              href={link?.url}
            >
              {link?.title}
            </Link>
            <span className="underline"></span>
          </div>
        </div>
      ))}
          </div>
        </div>
        <div className="flex flex-1.5 flex-col gap-4 items-start justify-start">
          <div className="">
            <h3 className="font-semibold text-gray-600">Contact Info</h3>
          </div>
          <div className="flex flex-row w-full">
            <div className="flex flex-col items-start justify-center gap-4 w-full">
              <div className="flex gap-3 flex-row items-start justify-center">
                <IconPhone className="size-5 mt-[5px] md:mt-0 lg:mt-0" />
                <div className="flex gap-2 flex-col md:flex-row lg:flex-row">
                  <Link
                    href={"tel:+918075512624"}
                    className="text-lg font-medium"
                  >
                    +91 80755 12624
                  </Link>
                  <div className="px-2 py-1 rounded-[50px] bg-primary-700 opacity-80">
                    <h4 className="">Organizer - <span className="font-semibold">Justin James</span></h4>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 flex-row items-center justify-center">
                <IconMail className="size-6" />
                <div className="flex gap-2">
                  <Link
                    href={"mailto:tedxccet@carmelcet.in"}
                    className="text-lg font-medium"
                  >
                    tedxccet@carmelcet.in
                  </Link>
                </div>
              </div>
              <Social />
            </div>
            <div className=""></div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex-col flex md:hidden lg:hidden items-center justify-start gap-2 text-xs">
        <Link href="/">Terms and Conditions</Link>
        <Link href="/">Privacy Policy</Link>
        <Link href="/">Refund Policy</Link>
      </div>
      <div className="w-full h-[1px] bg-black-300"></div>
      <Credits />
    </div>
  );
}
