"use client";

import { useEffect, useState } from "react";

const page = () => {
  useEffect(() => {
    purchaseData();
  }, []);

  const purchaseData = async () => {
    try {
      const response = await fetch("/api/admin/purchased-list");
      if (!response.ok) {
        throw new Error("Error fetching purchased tickets");
      }
      const data = await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  return <div></div>;
};

export default page;
