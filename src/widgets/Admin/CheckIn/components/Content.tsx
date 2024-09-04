"use client";
import showTedxToast from "@components/showTedxToast";
import TedxToast from "@components/TedxToast";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface GroupMember {
  firstName: string;
  lastName: string;
  ticketId: string;
  checkedIn: boolean;
  [key: string]: any; // Additional fields, if any
}

interface TicketData {
  amount: number;
  groupMember: GroupMember;
}

export default function Content() {
  const pathname = usePathname();
  const ticketId = pathname.slice(16);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [data, setData] = useState<TicketData | null>(null); // Define state with a type

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/admin/qr/validate/${ticketId}`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleCheckIn = async () => {
    try {
      const response = await fetch(`/api/admin/qr/checkIn/${ticketId}`);
      if (response.ok) {
        setData((prevData) => {
          if (!prevData) return null; // Handle case where prevData is null

          return {
            ...prevData, // Spread the previous state
            groupMember: {
              ...prevData.groupMember, // Spread the existing groupMember properties
              checkedIn: true, // Update the checkedIn property
            },
          };
        });

        showTedxToast({
          type: "success",
          message: "Sucessfully checked In",
        });
      } else {
        showTedxToast({
          type: "error",
          message: "Failed to checked In",
        });
        console.error("Failed to check in");
      }
    } catch (err) {
      console.error("Error checking in:", err);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-black">
      {data ? (
        <div className="w-full max-w-xl p-6 bg-black rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-center text-white mb-4">
            Ticket Information
          </h3>
          <p className="text-lg text-white mb-2 pt-6">
            <span className="font-semibold">Name: </span>
            {`${data.groupMember.firstName} ${data.groupMember.lastName}`}
          </p>
          <p className="text-lg text-white mb-4">
            <span className="font-semibold">Designation: </span>
            {data.groupMember.designation}
          </p>
          <p className="text-lg text-white mb-4">
            <span className="font-semibold">Email: </span>
            {data.groupMember.email}
          </p>
          <p className="text-lg text-white mb-4">
            <span className="font-semibold">Organisation: </span>
            {data.groupMember.organisation}
          </p>
          <p className="text-lg text-white mb-4">
            <span className="font-semibold">Is Student: </span>
            {data.groupMember.isStudent ? "Yes" : "No"}
          </p>
          <p className="text-lg text-white mb-4">
            <span className="font-semibold">Amount: </span>
            {data.amount}
          </p>
          <p className="text-lg text-white mb-4">
            <span className="font-semibold">Ticket Id: </span>
            {data.groupMember.ticketId}
          </p>
          <p className="text-lg text-white mb-4">
            <span className="font-semibold">Check In: </span>
            {data.groupMember.checkedIn ? "Yes" : "No"}
          </p>
          <button
            onClick={() => {
              setIsSubmitting(true);
              handleCheckIn();
            }}
            className="w-full py-2 px-4 bg-[#eb0028] text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-[#eb0028] focus:ring-offset-2"
          >
            {isSubmitting ? "Submitting..." : "Check In"}
          </button>
        </div>
      ) : (
        <p className="text-lg text-white">Loading ticket data...</p>
      )}
    </div>
  );
}
