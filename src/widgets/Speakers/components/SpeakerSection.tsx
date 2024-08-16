import React from "react";
import TitleBar from "@components/TitleBar";
import { speakersList } from "@utils/constants";

export default function SpeakerSection() {
  return (
    <div className="min-h-screen px-[5vw] pb-0 md:pb-[10vh] lg:pb-[10vh] pt-10 md:pt-[3vh] lg:pt-[3vh] speaker bg-black text-white">
      {/* Title Bar */}
      <div className="text-center mb-16">
        <TitleBar title="Our" titleSecond="Speakers" />
      </div>

      {/* Introduction Section */}
      <div className="flex flex-col md:flex-row mb-16">
        <div className="flex-1 mb-8 md:mb-0 md:pr-12 flex flex-col">
          <span className="text-5xl md:text-7xl lg:text-7xl font-bold mb-4">
            Unveiling the Voices:
          </span>
          <span className="text-5xl md:text-7xl lg:text-7xl font-extrabold mb-8 sptitle">
            Introducing Our Speakers
          </span>
          <p className="text-lg leading-relaxed text-justify">
            Get ready to be captivated by the extraordinary speaker line-up at
            TEDxCCET 2024. This year, we are proud to present an eclectic mix of
            visionaries, innovators, and thought leaders from diverse fields
            such as arts, science, technology, and social impact. Each speaker
            brings a unique narrative, offering profound insights into their
            groundbreaking work and heartwarming stories that will touch your
            soul. These remarkable individuals are not just speakers; they are
            storytellers who will share their journeys, inspire you with their
            experiences, and challenge your perspectives. Prepare to have your
            passion for creating a better world reignited, as they unveil ideas
            that will spark your imagination and motivate you to reach for
            greater heights. TEDxCCET 2024 promises to be an unforgettable
            experience that will leave you empowered, enlightened, and eager to
            take action.
          </p>
        </div>

        {/* Speaker Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
          {speakersList?.map((speaker, index) => (
            <div
              key={index}
              className="flex items-center bg-black-200 rounded-lg p-4 shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={speaker.image}
                alt={speaker.name}
                className="w-24 h-24 rounded-full object-cover mr-4 border-2 border-[#eb0028]"
              />
              <div>
                <h4 className="text-xl font-semibold text-[#eb0028]">
                  {speaker.name}
                </h4>
                <p className="text-gray-400">{speaker.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
