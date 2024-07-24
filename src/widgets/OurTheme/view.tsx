import Video from "@core/Video";
import React from "react";
import Theme from "./components/Theme";

export default function OurThemeView() {
  return (
    <div className="bg-slk-black-200 relative overflow-hidden w-full min-h-screen pt-10">
      <Video
        url="theme.mp4"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black-100 opacity-90" />
      <Theme/>
    </div>
  );
}