import React from "react";
import Image from "@components/Image";
import Logo from "@components/Logo";
import { navLinks } from "@utils/constants";
import Button from "@components/Button";
import Link from '@components/Link'

export default function HeaderView() {
  return (
    <div className="fixed w-screen items-center justify-center px-[5vw] py-[1.3rem] top-0 z-50 flex">
      <div className="flex-1">
        <Logo />
      </div>
      <div className="flex-2 flex items-center justify-center gap-[2vw]">
        {navLinks?.map((navLink, index) => (
          <div className="" key={`${navLink?.title}_${index}`}>
            <Link href={navLink?.url} className="capitalize font-semibold">{navLink?.title}</Link>
          </div>
        ))}
      </div>
      <div className="flex-1 flex items-center justify-end">
        <Button className="bg-primary-700 px-4 py-2 rounded-[30px] flex items-center justify-center font-semibold" title="BUY TICKET"/>
      </div>
    </div>
  );
}
