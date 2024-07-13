import Logo from "@components/Logo";
import IconMail from "@icons/IconMail";
import IconPhone from "@icons/IconPhone";
import { navLinks } from "@utils/constants";
import Link from "next/link";
import React from "react";
import Social from "./components/Social";
import { CiLink } from "react-icons/ci";
import Credits from "./components/Credits";
import Image from '@components/Image'

export default function FooterView() {
  return (
    <div className="bg-black-100 rounded-lg px-[5vw] py-[2rem] flex flex-col gap-10">
      <div className="flex flex-row gap-8">
        <div className="flex flex-col items-start justify-start flex-1">
          <Image src={'/Logo.svg'} height={200} width={240} alt=""/>
        </div>
        <div className="flex flex-col items-start justify-start flex-1 gap-4">
          <div className="">
            <h3 className="font-semibold text-gray-600">Usefull links</h3>
          </div>
          <div className="flex flex-col">
            {navLinks?.map((link, index) => (
              <div
                className="flex items-center justify-start gap-2"
                key={`${link?.title}_${index}`}
              >
                <CiLink />
                <Link className="capitalize font-medium" href={link?.url}>
                  {link?.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-1.5 flex-col gap-4 items-start justify-start">
          <div className="">
            <h3 className="font-semibold text-gray-600">Contact Info</h3>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col items-start justify-center gap-4">
              <div className="flex gap-3 flex-row items-center justify-center">
                <IconPhone className="size-5" />
                <div className="flex gap-2">
                  <Link
                    href={"tel:+918075512624"}
                    className="text-lg font-medium"
                  >
                    +91 80755 12624
                  </Link>
                  <div className="px-2 py-1 rounded-[50px] bg-primary-700 opacity-80">
                    <h4 className="">Organizer - Justin James</h4>
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
      <div className="w-full h-[1px] bg-gray-600"></div>
      <Credits/>
    </div>
  );
}
