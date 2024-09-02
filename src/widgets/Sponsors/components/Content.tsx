import TitleBar from '@components/TitleBar'
import Image from 'next/image'
import React from 'react'

export default function Content() {
  return (
    <div className="px-[5vw] py-[5vw] w-full flex flex-col items-center justify-center bg-black">
      <TitleBar title="Our" titleSecond="Sponsors" />

      {/* Main Sponsor */}
      <div className="w-full flex flex-col items-center justify-center rounded-xl p-8 shadow-2xl text-center transform hover:scale-105 transition-all duration-500 ease-in-out mb-12">
        <span className="text-[#eb0028] text-3xl font-bold uppercase mb-4 tracking-wide drop-shadow-lg">
          Sponsored by
        </span>
        <Image
          src={'/sponsors/al-muqtadir.png'}
          width={230}
          height={230}
          alt="Al Muqtadir"
          className="rounded-full"
        />
      </div>

      {/* Sponsors Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
        
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
          <span className="text-[#eb0028] text-2xl font-semibold mb-6 tracking-wide drop-shadow-lg">
            Co-Sponsored by
          </span>
          <div className="flex flex-wrap gap-5 justify-center">
            <Image
              src={'/sponsors/obcydians.png'}
              width={220}
              height={150}
              alt="Obcydians"
              className="rounded-lg"
            />
            <Image
              src={'/sponsors/lichfl.png'}
              width={220}
              height={150}
              alt="LIC HFL"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
