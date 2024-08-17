import React from "react";
import TitleBar from "@components/TitleBar";
import { speakersList } from "@utils/constants";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

export default function SpeakerSection() {
  return (
    <div className="min-h-screen px-[5vw] pb-0 md:pb-[10vh] lg:pb-0 pt-10 md:pt-[3vh] lg:pt-0 speaker bg-black text-white">
      {/* Title Bar */}
      <div className="text-center mb-16">
        <TitleBar title="Our" titleSecond="Speakers" />
      </div>

      {/* Introduction Section */}
      <div className="flex flex-col md:flex-row mb-16">
        <div className="flex-[1] mb-8 md:mb-0 md:pr-12 flex flex-col">
          <span className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            Unveiling the Voices:
          </span>
          <span className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 sptitle">
            Introducing Our Speakers
          </span>
          <p className="text-base md:text-lg leading-relaxed text-justify">
            Get ready to be amazed by the wonderful speaker line-up for TEDxCCET
            2024. Our line-up has a wonderful list of speakers who are from
            various fields like arts, science, technology and social impact.
            These exceptional individuals will talk about their various
            innovations and heartwarming stories, and they will convey their
            unique perspectives. This will ignite the fire in your passion for
            creating a wonderful world.
          </p>
        </div>

        {/* Speaker Grid */}
        <div className="flex-[1.5] grid grid-cols-1 sm:grid-cols-2 gap-8">
          {speakersList?.map((speaker, index) => (
            <div
              onClick={() =>
                window.open(
                  `https://www.google.com/search?q=Who+is+${encodeURIComponent(
                    speaker?.name
                  )}+${encodeURIComponent(speaker?.designation)}`,
                  "_blank"
                )
              }
              key={index}
              className="flex flex-col md:flex-row items-center bg-black-200 rounded-lg p-4 shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                <Image
                  src={speaker?.image}
                  alt={speaker?.name}
                  width={1000}
                  height={1000}
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#eb0028]"
                />
              </div>
              <div className="flex-1 w-full flex flex-col gap-3 items-center md:items-start">
                <div className="text-center md:text-left">
                  <h4 className="text-xl font-semibold text-[#eb0028]">
                    {speaker.name}
                  </h4>
                  <p className="text-gray-400 text-sm">{speaker.designation}</p>
                </div>
                <div className="w-full flex items-center justify-center md:justify-end">
                  <div
                    className="p-2 rounded-[8px] bg-black-300 hover:text-primary-700 cursor-pointer"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/search?q=Who+is+${encodeURIComponent(
                          speaker.name
                        )}+${encodeURIComponent(speaker.designation)}`,
                        "_blank"
                      )
                    }
                  >
                    <FcGoogle className="cursor-pointer text-2xl" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
