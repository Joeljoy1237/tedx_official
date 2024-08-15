"use client";
import React, { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetch(
          "/api/ticket/66bdc42baaed4152efdeace1/66bdc42baaed4152efdeace2"
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    dataFetch();
  }, []); // Empty dependency array means this effect runs once on mount

  return <div>page</div>;
};

export default Page;
