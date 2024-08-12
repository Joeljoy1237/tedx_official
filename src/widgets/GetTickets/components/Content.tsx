"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import Logo from "@components/Logo";
import Image from "next/image";
import RightSide from "./RightSide";
import Link from "next/link";
import { IoIosAddCircleOutline, IoMdRemoveCircle } from "react-icons/io";
import { useSession } from "next-auth/react";

interface Member {
  firstname: string;
  lastname: string;
  email: string;
  organisation: string;
}

export default function Content() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<"individual" | "group">(
    "individual"
  );
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [members, setMembers] = useState<Member[]>([
    { firstname: "", lastname: "", email: "", organisation: "" },
  ]);

  const individualPrice = 1200;
  const groupPrice = individualPrice; // Group price is the same as individual price initially

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const initialMember: Member = {
        firstname: (session.user as any).firstName || "",
        lastname: (session.user as any).lastName || "",
        email: (session.user as any).email || "",
        organisation: (session.user as any).organisation || "",
      };

      if (activeTab === "individual") {
        setMembers([initialMember]);
      }
    }
  }, [session, status, activeTab]);

  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], [name]: value };
    setMembers(newMembers);
  };

  const addMember = () => {
    setMembers([
      ...members,
      { firstname: "", lastname: "", email: "", organisation: "" },
    ]);
  };

  const removeMember = (index: number) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };

  // Calculate the subtotal, discount, and total
  const calculatePricing = () => {
    let subtotal = 0;
    let discount = 0;
    let total = 0;

    if (activeTab === "individual") {
      subtotal = individualPrice;
      total = subtotal;
    } else {
      const memberCount = members.length;
      subtotal = memberCount * groupPrice;

      if (memberCount >= 5 && memberCount <= 10) {
        discount = subtotal * 0.1; // 10% discount
      } else if (memberCount > 10) {
        discount = subtotal * 0.15; // 15% discount
      }

      total = subtotal - discount;
    }

    return { subtotal, discount, total };
  };

  const { subtotal, discount, total } = calculatePricing();

  return (
    <div className="px-[5vw] md:py-[5vh] lg:py-[5vh] py-2 flex md:flex-row lg:flex-row flex-col items-start justify-between min-h-[75vh] relative">
      <div className="flex-[2] w-full flex flex-col items-start justify-center gap-8">
        <div className="w-full items-center flex flex-col md:flex-row lg:flex-row justify-end">
          <div className="flex gap-2 items-center justify-center w-auto">
            <span className="text-xs md:text-base lg:text-base">
              powered by
            </span>
            <Image
              src={"/rpay.png"}
              alt=""
              height={1}
              width={100}
              className="w-[4rem] h-full md:w-[7rem] lg:w-[7rem]"
            />
          </div>
        </div>
        <div className="md:w-full lg:w-full flex items-center justify-center gap-8">
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
              <div>
                <div className="flex gap-4 flex-col md:flex-row lg:flex-row">
                  <div className="flex-1">
                    <span className="font-light text-sm italic">
                      First Name
                    </span>
                    <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                      *
                    </span>
                    <input
                      type="text"
                      name="firstname"
                      value={members[0].firstname}
                      onChange={(e) => handleInputChange(0, e)}
                      className="w-full p-3 rounded-md bg-black-300 outline-none border-none"
                      placeholder="John"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="font-light text-sm italic">Last Name</span>
                    <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                      *
                    </span>
                    <input
                      type="text"
                      name="lastname"
                      value={members[0].lastname}
                      onChange={(e) => handleInputChange(0, e)}
                      className="w-full p-3 rounded-md bg-black-300 outline-none border-none"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex gap-4 flex-col md:flex-row lg:flex-row">
                  <div className="flex-1">
                    <span className="font-light text-sm italic">Email</span>
                    <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                      *
                    </span>
                    <input
                      type="text"
                      name="email"
                      value={members[0].email}
                      onChange={(e) => handleInputChange(0, e)}
                      className="w-full p-3 rounded-md bg-black-300 outline-none border-none"
                      placeholder="john@gmail.com"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="font-light text-sm italic">
                      Organisation
                    </span>
                    <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                      *
                    </span>
                    <input
                      type="text"
                      name="organisation"
                      value={members[0].organisation}
                      onChange={(e) => handleInputChange(0, e)}
                      className="w-full p-3 rounded-md bg-black-300 outline-none border-none"
                      placeholder="Google LLC"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "group" && (
            <div className="opacity-100 flex flex-col gap-6">
              {members.map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-6 border-b border-black-300 pb-4"
                >
                  <h3 className="text-lg font-bold">Member {index + 1}</h3>
                  <div className="flex gap-4 flex-col md:flex-row lg:flex-row">
                    <div className="flex-1">
                      <span className="font-light text-sm italic">
                        First Name
                      </span>
                      <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                        *
                      </span>
                      <input
                        type="text"
                        name="firstname"
                        value={member.firstname}
                        onChange={(e) => handleInputChange(index, e)}
                        className="w-full p-3 rounded-md bg-black-300 outline-none border-none"
                        placeholder="John"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="font-light text-sm italic">
                        Last Name
                      </span>
                      <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                        *
                      </span>
                      <input
                        type="text"
                        name="lastname"
                        value={member.lastname}
                        onChange={(e) => handleInputChange(index, e)}
                        className="w-full p-3 rounded-md bg-black-300 outline-none border-none"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 flex-col md:flex-row lg:flex-row">
                    <div className="flex-1">
                      <span className="font-light text-sm italic">Email</span>
                      <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                        *
                      </span>
                      <input
                        type="text"
                        name="email"
                        value={member.email}
                        onChange={(e) => handleInputChange(index, e)}
                        className="w-full p-3 rounded-md bg-black-300 outline-none border-none"
                        placeholder="john@gmail.com"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="font-light text-sm italic">
                        Organisation
                      </span>
                      <span className="text-primary-700 text-2xl mt-[15px] font-semibold">
                        *
                      </span>
                      <input
                        type="text"
                        name="organisation"
                        value={member.organisation}
                        onChange={(e) => handleInputChange(index, e)}
                        className="w-full p-3 rounded-md bg-black-300 outline-none border-none"
                        placeholder="Google LLC"
                      />
                    </div>
                  </div>
                  {index !== 0 && (
                    <button
                      type="button"
                      className="flex items-center text-red-600"
                      onClick={() => removeMember(index)}
                    >
                      <IoMdRemoveCircle size={24} className="mr-2" /> Remove
                      Member
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="flex items-center text-green-600"
                onClick={addMember}
              >
                <IoIosAddCircleOutline size={24} className="mr-2" /> Add Member
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="w-[1px] h-[calc(100%-40px)] bg-gray-300 mx-4"></div>{" "}
      {/* Vertical Separator Line */}
      <RightSide
        activeTab={activeTab}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        subtotal={subtotal}
        discount={discount}
        total={total}
      />
    </div>
  );
}
