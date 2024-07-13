import Video from '@core/Video'
import React from 'react'
import HeroText from './components/HeroText'

export default function LandingPageView() {
  return (
    <div className='bg-slk-black-200 relative overflow-hidden w-full min-h-screen pt-10'>
      <Video className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black-100 opacity-30" />
      <HeroText/>
    </div>
  )
}
