"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import showTedxToast from "@components/showTedxToast";
import TitleBar from "@components/TitleBar";
import Button from "@components/Button";
import Link from "next/link";

type Status = "open" | "in-progress" | "resolved" | "closed";

interface SupportTicket {
  _id: string;
  name: string;
  email: string;
  subject: string;
  issue: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  reply: string;
}

const statusColors: Record<Status, string> = {
  open: "bg-blue-500 text-white",
  "in-progress": "bg-yellow-500 text-white",
  resolved: "bg-green-500 text-white",
  closed: "bg-primary-700 text-white",
};

const SupportTicketList: React.FC = () => {
  const { data: session } = useSession();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (session?.user?._id) {
      const fetchTickets = async () => {
        try {
          const response = await fetch(
            `/api/support-ticket/show-support-ticket?userId=${session.user._id}`
          );
          const result = await response.json();

          if (response.ok) {
            setTickets(result);
          } else {
            showTedxToast({
              type: "error",
              message: result.message,
              desc: result.desc,
            });
          }
        } catch (error) {
          showTedxToast({
            type: "error",
            message: "Error",
            desc: "An error occurred while fetching support tickets.",
          });
        } finally {
          setLoading(false);
        }
      };

      fetchTickets();
    }
  }, [session?.user?._id]);

  const handleRaiseTicket = () => {
    router.push("/support/raise-ticket");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="pt-[100px] px-[5vw] min-h-screen bg-[#000000] text-white flex flex-col gap-12">
      <TitleBar title="Your Support" titleSecond="Tickets" />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <li
              key={ticket._id}
              className="bg-black-200 p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{ticket.subject}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    statusColors[ticket.status]
                  }`}
                >
                  {ticket.status.charAt(0).toUpperCase() +
                    ticket.status.slice(1)}
                </span>
              </div>
              <p className="text-xs mb-1">
                Name: <span className="text-sm">{ticket.name}</span>
              </p>
              <p className="text-xs mb-1">
                Email: <span className="text-sm">{ticket.email}</span>
              </p>
              <p className="text-xs mb-1">
                Issue: <span className="text-sm">{ticket.issue}</span>
              </p>
              {ticket?.reply && (
                <p className="text-xs mb-1 font-semibold">
                  Reply:{" "}
                  <span className="text-sm bg-primary-600">{ticket.reply}</span>
                </p>
              )}
              <p className="text-xs mb-1">
                Created At:{" "}
                <span className="font-sans">
                  {new Date(ticket.createdAt).toLocaleString()}
                </span>
              </p>
              <p className="text-xs">
                Updated At:{" "}
                <span className="font-sans">
                  {new Date(ticket.updatedAt).toLocaleString()}
                </span>
              </p>
            </li>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[50vh] w-[88vw]">
            <p className="text-center text-gray-400 mb-4">
              No support tickets found.
            </p>
            <Link href={"/support-ticket"}>
              <Button
                title="Raise a Support Ticket"
                onClick={handleRaiseTicket}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
              />
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
};

export default SupportTicketList;
