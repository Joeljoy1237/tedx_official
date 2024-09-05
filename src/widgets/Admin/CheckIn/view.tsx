"use client"
import PreLoader from '@components/PreLoader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader';
import FooterView from '@widgets/Footer';
import Content from './components/Content';

export default function CheckIn() {
    const [isLoaded, setIsLoaded] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();
    useEffect(() => {
      if (status === "unauthenticated") {
        // Redirect to home page
        router.replace("/");
      }
      if(session?.user?.isAdmin === false){
        router.replace("/login");
      }else{
        setIsLoaded(true)
      }
    }, [status, session, router]);
  return (
    <main className='w-full h-full flex items-center justify-center'>
        {!isLoaded && <PreLoader/>}
        <Content/>
    </main>
  )
}
