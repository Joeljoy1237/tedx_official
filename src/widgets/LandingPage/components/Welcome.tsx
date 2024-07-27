import React from "react";

export default function Welcome() {
  return (
    <div className="px-[5vw] py-[6vh] md:pb-[10vh] lg:pb-[10vh] pb-[6vh]">
      <div className="flex flex-col items-center justify-center gap-4">
        <span className="text-2xl md:text-4xl lg:text-4xl font-bold">
          HELLO <span className="text-primary-700">EXPLORER !!!</span>
        </span>
        <p className="text-lg md:text-center lg:text-center text-justify">
          Welcome to{" "}
          <span className="font-bold text-primary-700">
            TED<sup className="top-[-5px]">x</sup>
          </span>{" "}
          CCET, where brilliant minds ignite ideas worth spreading! Join us at
          Carmel College of Engineering & Technology for an exhilarating event
          showcasing Kerala's innovators and inspiring speakers. Immerse
          yourself in thought-provoking talks, engaging workshops, and
          networking opportunities that promise to inspire, educate, and
          empower. Don't miss this chance to be part of a transformative
          experience shaping the future of technology and innovation in our
          community.
        </p>
      </div>
    </div>
  );
}
