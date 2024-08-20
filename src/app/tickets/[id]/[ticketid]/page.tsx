"use client";
import DownloadTicket from "@widgets/DownloadTicket";
import React, { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetch(
          "/api/ticket/66bdbcf71575e7e161165027/66bdbcf71575e7e161165029"
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    dataFetch();
  }, []); // Empty dependency array means this effect runs once on mount

  return <DownloadTicket/>
};

export default Page;
