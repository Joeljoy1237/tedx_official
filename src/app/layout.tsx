import React from "react";
import type { Metadata } from "next";
import "@styles/scss/main.scss";
import { Toaster } from "react-hot-toast";
import Provider from "@components/Provider";
import Script from "next/script";

export const metadata: Metadata = {
  title: "TEDx CCET",
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
        <link rel="icon" type="image/png" href="favicon.ico" />
        <link rel="canonical" href="https://tedxccet.in" />
      </head>
      <body>
        <Provider>
          {children}
          <Toaster
            position="bottom-center"
            reverseOrder={false}
            toastOptions={{
              duration: 3000,
            }}
          />
        </Provider>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
      />
      </body>
    </html>
  );
}
