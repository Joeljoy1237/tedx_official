import React from "react";

export default function Reasons() {
  const eventHighlights = [
    {
      title: "Inspiration",
      description:
        "Hear empowering stories by remarkable individuals that will inspire you to reach greater heights in life.",
    },
    {
      title: "Creative and Diverse",
      description:
        "Explore a rich blend of creative and diverse talks and performances that will expand your perspectives.",
    },
    {
      title: "Networking",
      description:
        "Engage with passionate, like-minded individuals to grow your network through meaningful connections.",
    },
    {
      title: "Learning",
      description:
        "Gain new insights and valuable lessons from each talk, fueling your growth and expanding your knowledge.",
    },
    {
      title: "Transformation",
      description:
        "Spark your imagination, discover groundbreaking ideas, and unlock new paths to personal brilliance.",
    },
    {
      title: "Unforgettable Experience",
      description:
        "Enjoy a day of unique, entertaining, and memorable segments that will leave a lasting impression on you.",
    },
  ];

  return (
    <div className="px-[5vw] py-[10vh] bg-black text-white flex flex-col gap-14 reasons">
      <div className="w-full items-center justify-center flex flex-col md:flex-row lg:flex-row">
        <span className="text-xl md:text-3xl lg:text-3xl font-bold uppercase">
          Six Reasons to Attend
        </span>
        <div className="flex flex-row">
          <span className="text-primary-700 font-extrabold text-2xl md:text-3xl lg:text-3xl ml-4">
            TEDx
          </span>{" "}
          <span className="text-2xl md:text-3xl lg:text-3xl font-bold uppercase">
            CCET
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventHighlights.map((highlight, index) => (
          <div
            key={index}
            className="cursor-pointer p-6 bg-black-100 rounded-[10px] h-[200px] border-l-[6px] border-primary-700 shadow-lg hover:bg-black-200 transition duration-300"
          >
            <h3 className="text-xl font-bold mb-4">{highlight.title}</h3>
            <p className="text-base">{highlight.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
