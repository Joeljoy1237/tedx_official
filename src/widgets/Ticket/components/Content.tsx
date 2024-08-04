import TitleBar from "@components/TitleBar";
import React from "react";
import TicketItem from "./TicketItem";

export default function Content() {
  return (
    <div className="mb-[-22vh] md:mb-0 lg:mb-0 py-[10vh] md:py-[10vh] lg:py-0 h-[1300px] md:h-auto lg:h-auto  px-[5vw] flex items-center md:justify-start lg:justify-start justify-center flex-col gap-[6rem] relative">
      <div className="absolute md:relative lg:relative top-[10vh]">
        <TitleBar title="Grab Your" titleSecond="Tickets"/>
      </div>
      <TicketItem/>
    </div>
  );
}
