import React from 'react';
import Image from 'next/image'; // Assuming you're using Next.js

export default function LuckyDraw() {
  return (
    <div className="bg-black text-white  py-[5vh] flex items-center justify-center px-[5vw]">
      <div className="bg-black text-left w-full max-w-6xl p-8 border border-[#eb0028] rounded-lg shadow-xl flex flex-col md:flex-row">
        {/* Left Column - Content */}
        <div className="flex-1 w-full pr-2">
          {/* Title */}
          <h1 className="text-4xl font-bold mb-6">
            <span className="text-[#eb0028]">TEDxCCET</span> presents: 
            <span className="text-white"> Exclusive </span>
            <span className="text-[#eb0028]">Lucky Draw</span> Contest!
          </h1>

          {/* Description */}
          <p className="text-lg leading-relaxed">
            As part of <span className="text-[#eb0028]">TEDxCCET</span>, we’re thrilled to host a special contest where 3 lucky winners will each receive a <span className="font-bold">1-gram</span> gold coin!
            <br />
            With only <span className="font-bold">100</span> participants, your odds of striking gold are looking golden!
            <br />
            Join us for a day filled with inspiration and excitement, and you might just take home a golden surprise!
          </p>
        </div>

        {/* Right Column - Image */}
        <div className="md:w-1/3 w-full flex items-center justify-center mt-8 md:mt-0">
          <Image
            src="/goldcoin.png" // Replace with actual path to the gold coin image
            alt="Gold Coin"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
