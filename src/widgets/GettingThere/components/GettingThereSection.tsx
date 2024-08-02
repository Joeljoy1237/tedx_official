import TitleBar from "@components/TitleBar";
import React from "react";
import ContactDetails from "./ContactDetails";
import Form from "./Form";
import dynamic from "next/dynamic";

export default function GettingThereSection() {
  const Map = dynamic(() => import("./Map"), {
    ssr: false,
  });
  return (
    <div className="min-h-[100vh] mt-[100px] px-[5vw] flex flex-col w-full gap-8 md:gap-14 lg:gap-14 pb-[5vh] md:pb-[5vh] lg:pb-[5vh]">
      <div className="items-center justify-center flex">
        <TitleBar title="Getting" titleSecond="There" />
      </div>
      <div className="flex flex-col md:flex-row lg:flex-row gap-10 md:gap-5 lg:gap-5">
        <ContactDetails />
        <Form />
      </div>
      <div className="w-full">
        <Map />
      </div>
    </div>
  );
}
