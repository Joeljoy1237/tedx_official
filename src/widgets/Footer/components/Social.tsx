import { socials } from "@utils/constants";
import Link from "next/link";
import React from "react";

export default function Social() {
  return (
    <div className="w-full md:w-auto lg:w-auto flex justify-center md:gap-3 lg:gap-3 gap-5">
      {socials.map((social, index) => {
        const Icon = social.icon; // Dynamically assign the component
        return (
          <Link
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-black-300 text-xl text-gray-600 hover:text-gray-900"
          >
            <Icon className="text-xl text-white hover:text-primary-700"/>
          </Link>
        );
      })}
    </div>
  );
}
