"use client"
import React, { useEffect, useState } from 'react'
import Content from './components/Content'
import HeaderView from '@widgets/Header'
import FooterView from '@widgets/Footer'
import PreLoader from '@components/PreLoader';

export default function SponsorsWidget() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <main>
    {!isLoaded && <PreLoader />}
    <HeaderView/>
    <div className="pt-[80px]">
    <Content/>
    </div>
    <FooterView/>
    </main>
  )
}
