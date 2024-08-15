import React from "react";

interface titlebarProps {
  title: string | undefined;
  titleSecond?:string
}

export default function TitleBar(props: titlebarProps) {
  return (
    <div className="w-full flex items-center justify-center">
      <span className="text-2xl md:text-3xl lg:text-3xl font-bold uppercase">{props?.title}{" "}<span className="text-primary-700">{props?.titleSecond}</span> </span>
    </div>
  );
}
