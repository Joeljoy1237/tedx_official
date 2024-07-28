import React, { forwardRef } from "react";

interface VideoProps {
  className: string;
  url: string;
}

const Video = forwardRef<HTMLVideoElement, VideoProps>(({ className, url }, ref) => (
  <video
    ref={ref}
    width="320"
    height="240"
    controls={false}
    preload="none"
    autoPlay
    muted
    loop
    playsInline
    className={className}
  >
    <source src={url} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
));

export default Video;
