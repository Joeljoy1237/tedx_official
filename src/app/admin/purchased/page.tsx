"use client";

import { useEffect, useState } from "react";

// Define types for your data
interface GroupData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  organisation?: string;
  ticketId: string;
  checkedIn: boolean;
}

interface TicketData {
  group: GroupData[];
}

const Page = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [count, setCount] = useState<number>(0);
  const [checkInCount, setCheckInCount] = useState<number>(0);

  useEffect(() => {
    purchaseData();
  }, []);

  const purchaseData = async () => {
    try {
      const response = await fetch("/api/admin/purchased-list");
      if (!response.ok) {
        throw new Error("Error fetching purchased tickets");
      }
      const data: TicketData[] = await response.json();
      setTickets(data);
      calculateCount(data); // Calculate count after fetching data
    } catch (err) {
      console.log(err);
    }
  };

  const calculateCount = (data: TicketData[]) => {
    const totalCount = data.reduce(
      (acc, ticket) => acc + ticket.group.length,
      0
    );

    const checkedInCount = data.reduce(
      (acc, ticket) =>
        acc + ticket.group.filter((groupData) => groupData.checkedIn).length,
      0
    );

    setCount(totalCount);
    setCheckInCount(checkedInCount);
  };

  return (
    <div>
      <div>Total Tickets: {count}</div>
      <div>Checked In: {checkInCount}</div>
      <div>
        {tickets.map((data) =>
          data.group.map((groupData) => (
            <div
              key={groupData._id}
              className="bg-black-100 text-white p-4 rounded-lg shadow-md"
            >
              <h4 className="text-xl font-bold mb-2">
                {groupData.firstName} {groupData.lastName}
              </h4>
              <p className="mb-1">
                <strong>Email:</strong> {groupData.email}
              </p>
              <p className="mb-1">
                <strong>Organisation:</strong> {groupData.organisation || "N/A"}
              </p>
              <p className="mb-1">
                <strong>Ticket Id:</strong> {groupData.ticketId}
              </p>
              <p className="mb-1">
                <strong>Has Checked In:</strong>{" "}
                {groupData.checkedIn ? "Yes" : "No"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
