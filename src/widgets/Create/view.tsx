"use client"
import React from 'react'
import dynamic from 'next/dynamic';
const CreatePage = dynamic(() => import("./components/CreatePage"), {
    ssr: false,
  });
export default function CreateView() {
  return (
    <CreatePage/>
  )
}
