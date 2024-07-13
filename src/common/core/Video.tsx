import { url } from "inspector";
import React from "react";
interface videoProps {
  className: string;
  url: string ;
}
export default function Video(props: videoProps) {
  return (
    <video
      width="320"
      height="240"
      controls={false}
      preload="none"
      autoPlay
      muted
      loop
      playsInline
      className={props?.className}
    >
      <source src={props?.url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
