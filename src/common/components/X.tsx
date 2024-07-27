import React from 'react'
import Image from '@components/Image'

interface Xprops{
  className:string;
}

export default function X(props:Xprops) {
  return (
    <Image src={"/xlogo.png"} height={380} width={380} alt='' className={props?.className}/>
  )
}
