"use client"
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
import Button from "@components/Button";
import { IoBugOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export default function FooterView() {
  const { data: session, status } = useSession();
  return (
    <div className="rounded-lg px-[5vw] py-[2rem] flex flex-col gap-5 md:gap-10 lg:gap-10 border-t-[1px] border-t-gray-900">
      <div className="flex flex-col md:flex-row lg:flex-row gap-8">
        <div className="flex flex-col items-start justify-start flex-1 w-[50vw] md:w-full lg:w-full">
          <Image src={"/Logo.svg"} height={200} width={240} alt="" />
        </div>
        <div className="flex flex-col items-start justify-start flex-1 gap-4">
          <div className="">
            <h3 className="font-semibold text-gray-600">Useful links</h3>
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
                    className="capitalize font-medium transition-all duration-300 inline-block"
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
              <div className="px-2 py-1 rounded-[50px] bg-primary-700 opacity-80">
                <h4 className="">
                  Organizer -{" "}
                  <span className="font-semibold">Justin James</span>
                </h4>
              </div>
              <div className="flex gap-3 flex-row items-start justify-center">
                <IconPhone className="size-5 mt-[5px] md:mt-0 lg:mt-0" />
                <div className="flex gap-2 flex-col md:flex-row lg:flex-row">
                  <Link
                    href={"tel:+918075512624"}
                    className="text-lg font-medium font-sans"
                  >
                    +91 80755 12624
                  </Link>
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
              {status === "authenticated" && (
                <div className="w-full">
                  <Link href={"/support-ticket"}>
                    <Button
                      position="left"
                      className="flex w-full md:justify-start lg:justify-start items-center justify-center font-semibold text-primary-700 gap-2 rounded-[8px] py-2"
                      title="Raise a support ticket"
                      icon={<IoBugOutline className="font-semibold" />}
                    />
                  </Link>
                </div>
              )}
              {status === "authenticated" && session.user.isAdmin === true && (
                <div className="w-full">
                  <Link href={"/admin/list-users"}>
                    <Button
                      position="left"
                      className="flex w-full md:justify-start lg:justify-start items-center justify-center font-semibold text-primary-700 gap-2 rounded-[8px] py-2"
                      title="Admin Panel"
                      icon={<MdOutlineAdminPanelSettings className="font-semibold" />}
                    />
                  </Link>
                </div>
              )}
            </div>
            <div className=""></div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex-col flex md:hidden lg:hidden items-center justify-start gap-2 text-xs">
        <Link href="/terms-and-conditions">Terms and Conditions</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/refund-policy">Refund Policy</Link>
      </div>
      <div className="w-full h-[1px] bg-black-300"></div>
      <Credits />
    </div>
  );
}
