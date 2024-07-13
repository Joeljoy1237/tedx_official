import Button from "@components/Button";
import React from "react";

interface aboutData {
  title: String;
  desc: String;
}
export default function AboutItemView(props: aboutData) {
  return (
    <div className="w-full box h-full rounded-[10px] flex flex-col p-8 gap-4">
      <div className="w-full flex items-center justify-center">
        <span className="text-4xl font-bold text-primary-700">
          {props?.title}
        </span>
      </div>
      <div className="">
        <p className="text-justify">{props.desc}</p>
      </div>
      <div className="w-full flex items-center justify-center">
        <Button title="READ MORE" className="rounded-full px-4 font-semibold text-sm py-2 bg-primary-700" />
      </div>
    </div>
  );
}
