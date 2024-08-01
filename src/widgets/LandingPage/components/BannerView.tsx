import Video from "@core/Video";
import React from "react";
import HeroText from "./HeroText";

export default function BannerView() {
  return (
    <div className="bg-slk-black-200 flex flex-col relative overflow-hidden w-full h-[100vh] md:min-h-screen lg:min-h-screen">
      <Video
        url={"https://firebasestorage.googleapis.com/v0/b/tedxccet.appspot.com/o/assets%2F3130182-uhd_3840_2160_30fps.mp4?alt=media&token=ef12cfda-42cd-4486-9117-1efddd9698b7"}
        className="absolute inset-0 w-full h-full object-cover flex md:flex lg:flex"
      />
      <div className="absolute inset-0 bg-black-100 opacity-70 md:opacity-70 lg:opacity-70" />
      <HeroText />
    </div>
  );
}
