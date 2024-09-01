import TitleBar from '@components/TitleBar'
import Image from 'next/image'
import React from 'react'

export default function Content() {
  return (
    <div className="px-[5vw] py-[5vw] w-full flex flex-col items-center justify-center bg-black">
      <TitleBar title="Our" titleSecond="Sponsors" />

      {/* Main Sponsor */}
      <div className="w-full max-w-[600px] flex flex-col items-center justify-center rounded-xl p-8 shadow-2xl text-center transform hover:scale-105 transition-all duration-500 ease-in-out mb-12">
        <span className="text-[#eb0028] text-4xl font-bold uppercase mb-4 tracking-wide drop-shadow-lg">
          Main Sponsor
        </span>
        <Image
          src={'/sponsors/al-muqtadir.png'}
          width={250}
          height={250}
          alt="Al Muqtadir"
          className="rounded-full shadow-lg hover:scale-110 transition-transform transform duration-300 ease-in-out"
        />
      </div>

      {/* Sponsors Section */}
      <div className="w-full flex  items-start justify-center">
        {/* Banking Partner */}
        <div className="flex flex-col items-center justify-center p-8 rounded-xl shadow-2xl text-center transform hover:scale-105 transition-all duration-500 ease-in-out">
          <span className="text-[#eb0028] text-3xl font-semibold mb-6 tracking-wide drop-shadow-lg">
            Banking Partner
          </span>
          <Image
            src={'/sponsors/federalbank.png'}
            width={220}
            height={150}
            alt="Federal Bank"
            className="rounded-lg shadow-md hover:scale-110 transition-transform transform duration-300 ease-in-out"
          />
        </div>

        {/* Co-Sponsors */}
        <div className="flex flex-col items-center justify-center p-8 rounded-xl shadow-2xl text-center transform hover:scale-105 transition-all duration-500 ease-in-out">
          <span className="text-[#eb0028] text-3xl font-semibold mb-6 tracking-wide drop-shadow-lg">
            Co-Sponsored by
          </span>
          <div className="flex">
          <Image
            src={'/sponsors/obcydians.png'}
            width={220}
            height={150}
            alt="Obcydians"
            className="rounded-lg shadow-md hover:scale-110 transition-transform transform duration-300 ease-in-out mb-4"
          />
          <Image
            src={'/sponsors/lichfl.png'}
            width={220}
            height={150}
            alt="LIC HFL"
            className="rounded-lg shadow-md hover:scale-110 transition-transform transform duration-300 ease-in-out"
          />
          </div>
        </div>
      </div>
    </div>
  )
}
