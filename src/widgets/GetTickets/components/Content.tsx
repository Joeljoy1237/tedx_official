"use client";

import React, { useState } from "react";
import Logo from "@components/Logo";
import Image from "next/image";
import RelatedLinks from "./RelatedLinks";
import RightSide from "./RightSide";
import Link from "next/link";

export default function Content() {
  const [activeTab, setActiveTab] = useState("individual");
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="px-[5vw] md:py-[5vh] lg:py-[5vh] py-2 flex md:flex-row lg:flex-row flex-col items-start justify-between h-screen relative">
      <div className="flex-[2] w-full flex flex-col items-start justify-center gap-8 ">
        <div className="w-full items-center flex justify-between">
          <div className="w-[5rem] md:w-auto lg:w-auto flex">
            <Link href={'/'}>
              <Logo />
            </Link>
          </div>
          <div className="flex gap-2 items-center justify-center w-auto">
            <span className="text-xs md:text-base lg:text-base">
              powered by
            </span>
            <Image
              src={"/rpay.png"}
              alt=""
              height={1}
              width={100}
              className="w-[4.7rem] h-full md:w-[7rem] lg:w-[7rem]"
            />
          </div>
        </div>
        <div className="md:w-full lg:w-full flex items-center justify-center gap-8">
          {/* Tab */}
          <div
            className={`text-xs md:text-base lg:text-base relative cursor-pointer py-2 px-4 ${
              activeTab === "individual" ? "text-primary-700" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("individual")}
          >
            Individual Ticket
            {activeTab === "individual" && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-700"></div>
            )}
          </div>
          <div
            className={`relative text-xs md:text-base lg:text-base cursor-pointer py-2 px-4 ${
              activeTab === "group" ? "text-primary-700" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("group")}
          >
            Group Tickets
            {activeTab === "group" && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-700"></div>
            )}
          </div>
        </div>
        <div className="w-full mt-4 transition-opacity duration-300 ease-in-out">
          {activeTab === "individual" && (
            <div className="opacity-100 flex flex-col gap-6">
              <div className="">
                <div className="flex gap-4 flex-col md:flex-row lg:flex-row">
                  <div className="flex-1">
                    <span className="font-light text-sm italic">
                      First Name{" "}
                    </span>
                    <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                      *
                    </span>
                    <input
                      type="text"
                      className="w-full p-3 rounded-md bg-black-300 outline-none border-none"
                      placeholder="John"
                      onChange={(e) => {}}
                    />
                  </div>
                  <div className="flex-1">
                    <span className="font-light text-sm italic">
                      Last Name{" "}
                    </span>
                    <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                      *
                    </span>
                    <input
                      type="text"
                      className="w-full p-3 rounded-md bg-black-300 outline-none border-none"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>

              <div className="">
                <div className="flex gap-4 flex-col md:flex-row lg:flex-row">
                  <div className="flex-1">
                    <span className="font-light text-sm italic">
                      First Name{" "}
                    </span>
                    <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                      *
                    </span>
                    <input
                      type="text"
                      className="w-full p-3 rounded-md bg-black-300 outline-none border-none"
                      placeholder="John"
                      onChange={(e) => {}}
                    />
                  </div>
                  <div className="flex-1">
                    <span className="font-light text-sm italic">
                      Last Name{" "}
                    </span>
                    <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                      *
                    </span>
                    <input
                      type="text"
                      className="w-full p-3 rounded-md bg-black-300 outline-none border-none"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>

              {/* Checkbox and Checkout Button */}
              <div className="flex flex-col gap-4 mt-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    className="form-checkbox"
                  />
                  <span className="text-sm text-gray-600">
                    I confirm that all information is correct.
                  </span>
                </label>
                <button
                  disabled={!isChecked}
                  className={`py-2 px-4 rounded-md font-semibold ${
                    isChecked
                      ? "bg-primary-700 text-white"
                      : "bg-black-400 cursor-not-allowed text-primary-700 "
                  }`}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
          {activeTab === "group" && (
            <div className="opacity-100">Content for Group Tickets</div>
          )}
        </div>
        {/* <div className="absolute bottom-8">
          <RelatedLinks />
        </div> */}
      </div>
      {/* Divider line */}
      <div className="w-[0.5px] rounded-md h-full bg-black-300 mx-8"></div>
      <div className="flex-[1] w-full  mt-10 md:mt-0 lg:mt-0">
        <RightSide />
      </div>
    </div>
  );
}
