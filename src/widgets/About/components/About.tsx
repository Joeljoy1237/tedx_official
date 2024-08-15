import React, { useState } from "react";
import TitleBar from "@components/TitleBar";
import { aboutDetails } from "@utils/constants";

export default function About() {
  const [activeTab, setActiveTab] = useState(aboutDetails[0].id);

  const renderTabContent = () => {
    const activeTabContent = aboutDetails.find((tab) => tab.id === activeTab);

    if (!activeTabContent) {
      return <div className="p-4">Content not found.</div>;
    }

    return <div className="p-4">{activeTabContent.desc}</div>;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 px-[5vw]">
      <TitleBar title="About" />
      <div className="flex flex-col md:flex-row lg:flex-row gap-8 w-full">
        {/* Left Side - Tabs */}
        <div className="flex flex-col w-full md:w-1/3 lg:w-1/3">
          <div className="flex flex-col gap-4">
            {aboutDetails.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-left text-xl rounded-[10px] ${
                  activeTab === tab.id
                    ? "bg-primary-700 font-bold"
                    : "bg-black-100"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <span className="text-justify">{renderTabContent()}</span>
          </div>
        </div>

        {/* Right Side - YouTube Video */}
        <div className="flex-grow">
          <iframe
            className="w-full h-[300px] md:h-full lg:h-full"
            src="https://www.youtube.com/embed/d0NHOpeczUU?si=4M35PeDjDS5ppmdm&autoplay=1"
            // Remove the allow attribute if no actions are required
            referrerPolicy="strict-origin-when-cross-origin"
            allow="autoplay; encrypted-media"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
