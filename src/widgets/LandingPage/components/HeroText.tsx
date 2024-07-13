import Button from "@components/Button";
import X from "@components/X";
import IconArrow from "@icons/IconArrow";
import IconDate from "@icons/IconDate";
import IconLocation from "@icons/IconLocation";
import React from "react";

export default function HeroText() {
  return (
    <div className="relative isolate min-h-[100vh] px-[5vw] flex items-center justify-center">
      <div className="flex items-center justify-center flex-row gap-3">
        <div className="">
          <div className="flex">
            <div className="text-start w-full">
              <span className="text-[90px] inline-block line leading-[1em] font-extrabold">
                AN <span className="blankRed">INDEPENDENTLY</span>{" "}
                <span className="blankWhite"> ORGANIZED</span> <br />
                <span className="text-primary-700">TEDx</span> EVENT
              </span>
            </div>
          </div>
          <div className="w-full flex-col flex items-start gap-6 justify-center mt-4">
            <div className="bg-primary-700 px-3 py-2 rounded-[50px] bg-opacity-15 flex gap-4">
              <div className="flex gap-2 items-center justify-center">
                <IconDate className="size-5" />
                <span className="">
                  <span className="sans">7</span> September 2024
                </span>
              </div>
              <div className="">|</div>
              <div className="flex items-center justify-center gap-2">
                <IconLocation className="size-6" />
                <span className="">
                  Carmel College of Engineering & Technology
                </span>
              </div>
            </div>
            <div className="flex w-full items-center justify-start gap-6">
              <Button
                className="px-4 py-2 rounded-lg bg-primary-700 font-semibold"
                title="Get Tickets"
              />
              <Button
                className="px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                title="Learn more"
                icon={<IconArrow className="size-6" />}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-[38vw]">
          <X />
        </div>
      </div>
    </div>
  );
}
