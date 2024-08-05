"use client";

import React, { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "@components/Image";
import Logo from "@components/Logo";
import { navLinks } from "@utils/constants";
import Button from "@components/Button";
import Link from "@components/Link";
import IconArrow from "@icons/IconArrow";
import { HiMenuAlt2 } from "react-icons/hi";
import TLogo from "@components/TLogo";
import { usePathname, useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";
import Drawer from "./components/Drawer";
import PreLoader from "@components/PreLoader";
import showTedxToast from "@components/showTedxToast";
import { BsGrid3X3Gap } from "react-icons/bs";

export default function HeaderView() {
  const { data: session, status } = useSession();
  const [isLoaded, setIsLoaded] = useState(true);
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
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

  const handleSession = () => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    router.replace("/login");

    return () => clearTimeout(timer);
  };
  const handleSignout = async () => {
    // Show toast before sign out
    handleSession()
    showTedxToast({
      type: "success",
      message: "Logout successful", // Updated message
      desc: "We look forward to seeing you again.", // Updated description
    });

    // Sign out the user
    await signOut({ redirect: false });

    // Set a timeout to allow the toast to be visible before redirecting
    setTimeout(() => {
      router.replace("/login");
    }, 1000); // Adjust the timeout duration if needed
  };
  return (
    <>
      <div
        className={`${
          drawerOpen && "bg-black-100"
        } fixed w-full flex-col items-center justify-center px-[5vw] md:py-[1.5rem] py-7 lg:py-[1.5rem] top-0 z-50 flex ${
          isScrolled ? "backdrop-blur-lg" : ""
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
              <BsGrid3X3Gap
                className="flex md:hidden lg:hidden text-2xl cursor-pointer text-primary-700"
                onClick={() => {
                  setDrawerOpen(true);
                }}
              />
            ) : (
              <MdClose
                className="flex md:hidden lg:hidden text-2xl cursor-pointer text-primary-700"
                onClick={handleClose}
              />
            )}

            {location === "/profile" ? (
              <Link
                href={""}
                onClick={() => {
                  handleSignout();
                }}
              >
                <Button
                  className="px-4 py-2 rounded-[10px] md:flex lg:flex hidden items-center justify-center font-bold text-primary-700 gap-2"
                  title={"Logout"}
                  icon={<IconArrow className="size-6" />}
                />
              </Link>
            ) : (
              <Link href={session?.user ? "/profile" : "/register"}>
                <Button
                  className="px-4 py-2 rounded-[10px] md:flex lg:flex hidden items-center justify-center font-bold text-primary-700 gap-2"
                  title={session?.user ? "Profile" : "Register"}
                  icon={<IconArrow className="size-6" />}
                />
              </Link>
            )}
          </div>
        </div>
        {drawerOpen && <Drawer handleClose={handleClose} handlesignout={handleSignout}/>}
      </div>
      {!isLoaded && <PreLoader />}
    </>
  );
}
