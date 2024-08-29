import TitleBar from '@components/TitleBar'
import Image from 'next/image'
import React from 'react'

export default function Content() {
  return (
    <div className='px-[5vw] pb-[5vw] w-full flex flex-col gap-[5vh]'>
      <TitleBar title='Our' titleSecond='Sponsors' />

      <div className="w-full flex flex-col items-center justify-center rounded-xl shadow-lg p-6">
        <div className="w-full flex flex-col items-center justify-center mb-[4vh]">
          <span className="font-semibold text-3xl text-gray-800 mb-2">Sponsored by</span>
          <Image
            src={'/sponsors/al-muqtadir.png'}
            width={200}
            height={200}
            alt='Al Muqtadir'
            className="rounded-lg shadow-md transition-transform transform hover:scale-105"
          />
        </div>
        
        <div className="w-full flex flex-col md:flex-row lg:flex-row items-center justify-center gap-[4vw] mb-[4vh]">
          <div className="flex flex-col items-center justify-center">
            <span className="font-semibold text-2xl text-gray-700 mb-2">Banking Partner</span>
            <Image
              src={'/sponsors/federalbank.png'}
              width={250}
              height={180}
              alt='Federal Bank'
              className="rounded-lg shadow-md transition-transform transform hover:scale-105"
            />
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <span className="font-semibold text-2xl text-gray-700 mb-2">Co-Sponsored by</span>
            <Image
              src={'/sponsors/obcydians.png'}
              width={250}
              height={180}
              alt='Obcydians'
              className="rounded-lg shadow-md transition-transform transform hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
