import Video from '@core/Video'
import React from 'react'

export default function LandingPageView() {
  return (
    <div className='bg-slk-black-200 relative overflow-hidden w-full min-h-screen'>
      <Video className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black-100 opacity-70" />
    </div>
  )
}
