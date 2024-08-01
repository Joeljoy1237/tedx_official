import React from "react";
import type { Metadata } from "next";
import "@styles/scss/main.scss";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "TEDˣCCET",
  description:
    "Join us at Carmel College of Engineering & Technology for TEDxCCET, showcasing Kerala's innovators and inspiring speakers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Join us at Carmel College of Engineering & Technology for TEDxCCET, showcasing Kerala's innovators and inspiring speakers."
        />
        <meta
          name="keywords"
          content="TEDx, tedx, tedxccet, tedx ccet, carmel ,ted, alappuzha, Alappuzha, carmel cet, Carmel CET ccet, carmelcet, TEDxCCET, Carmel College of Engineering & Technology, Kerala, innovators, speakers, workshops, networking, technology, innovation"
        />
        <meta property="og:title" content="TEDˣCCET" />
        <meta
          property="og:description"
          content="Join us at Carmel College of Engineering & Technology for TEDxCCET, showcasing Kerala's innovators and inspiring speakers."
        />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:url" content="https://tedxccet.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TEDˣCCET" />
        <meta
          name="twitter:description"
          content="Join us at Carmel College of Engineering & Technology for TEDxCCET, showcasing Kerala's innovators and inspiring speakers."
        />
        <meta name="twitter:image" content="/favicon.png" />
        <link rel="canonical" href="https://tedxccet.in" />
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
