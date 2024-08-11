import Link from "next/link";
import React from "react";

export default function RelatedLinks() {
  const links = [
    {
      title: "privacy policy",
      url: "/privacy-policy",
    },
    {
      title: "refund policy",
      url: "/refund-policy",
    },
    {
      title: "terms & conditions",
      url: "/terms-and-condtions",
    },
  ];
  return (
    <div className="flex flex-row gap-4 capitalize text-[0.7rem] text-gray-500">
      {links?.map((link) => (
        <Link href={link?.url}>{link?.title}</Link>
      ))}
    </div>
  );
}
