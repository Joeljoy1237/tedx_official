"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import showTedxToast from "@components/showTedxToast";
import TitleBar from "@components/TitleBar";
import Button from "@components/Button";
import Link from "next/link";

// Add Modal Component
const ReplyModal: React.FC<{
  isOpen: boolean;
  ticketId: string;
  onClose: () => void;
  onSubmit: (reply: string) => void;
}> = ({ isOpen, ticketId, onClose, onSubmit }) => {
  const [reply, setReply] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/support-ticket/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticketId, content: reply, sender: "user" }),
        cache: "no-store",
      });

      const result = await response.json();

      if (response.ok) {
        onSubmit(reply);
        setReply("");
        onClose();
        showTedxToast({
          type: "success",
          message: result?.message,
          desc: result?.desc,
        });
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
        desc: "An error occurred while submitting the reply.",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-black-200 text-black p-4 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <h3 className="text-lg font-semibold mb-3">Reply to Ticket</h3>
        <textarea
          className="w-full h-24 p-2 border bg-black-200 border-black-300 rounded-lg mb-4"
          value={reply}
          placeholder="Reply"
          onChange={(e) => setReply(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button
            title="Cancel"
            onClick={onClose}
            className="bg-gray-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-gray-600 transition-colors"
          />
          <Button
            title="Submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

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
  messages: {
    sender: string;
    content: string;
    timestamp: string;
  }[];
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
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (session?.user?._id) {
      const fetchTickets = async () => {
        try {
          const response = await fetch("/api/support-ticket/show-support-ticket", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: session.user._id }),
            cache: "no-store",
          });

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

  const openReplyModal = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setReplyModalOpen(true);
  };

  const closeReplyModal = () => {
    setReplyModalOpen(false);
    setSelectedTicketId(null);
  };

  const handleReplySubmit = (reply: string) => {
    if (selectedTicketId) {
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === selectedTicketId
            ? {
                ...ticket,
                messages: [
                  ...ticket.messages,
                  {
                    sender: "user",
                    content: reply,
                    timestamp: new Date().toISOString(),
                  },
                ],
              }
            : ticket
        )
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="pt-16 px-4 md:px-8 lg:px-16 min-h-screen bg-[#000000] text-white flex flex-col gap-8">
      <TitleBar title="Your Support" titleSecond="Tickets" />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <li
              key={ticket._id}
              className="bg-black-200 p-3 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">{ticket.subject}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    statusColors[ticket.status]
                  }`}
                >
                  {ticket.status.charAt(0).toUpperCase() +
                    ticket.status.slice(1)}
                </span>
              </div>
              <p className="text-xs mb-1">
                Name: <span className="text-sm capitalize">{ticket.name}</span>
              </p>
              <p className="text-xs mb-1">
                Email: <span className="text-sm">{ticket.email}</span>
              </p>
              <p className="text-xs mb-1">
                Issue: <span className="text-sm capitalize">{ticket.issue}</span>
              </p>
              {ticket.messages.length > 0 && (
                <div className="text-xs mb-2 font-semibold">
                  Replies:
                  <div className="max-h-36 overflow-y-auto mt-2">
                    <ul className="list-disc pl-4 space-y-2">
                      {ticket.messages.map((message, index) => (
                        <li
                          key={index}
                          className={`p-2 rounded-lg ${
                            message.sender === 'user' ? 'bg-primary-600' : 'bg-green-600'
                          }`}
                        >
                          <p className="font-semibold text-xs">
                            {message.sender.charAt(0).toUpperCase() + message.sender.slice(1)}
                            {message.sender === 'user' ? " (You)" : ""}
                          </p>
                          <p className="text-sm max-h-16 overflow-y-auto capitalize">{message.content}</p>
                          <p className="text-[10px] mt-1 text-gray-300 font-sans">
                            {new Date(message.timestamp).toLocaleString()}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {ticket.status !== 'closed' && (
                <Button
                  title="Reply"
                  onClick={() => openReplyModal(ticket._id)}
                  className="bg-blue-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors mt-3"
                />
              )}
              <p className="text-xs mb-1 mt-3">
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
          <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
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
      {replyModalOpen && (
        <ReplyModal
          isOpen={replyModalOpen}
          ticketId={selectedTicketId || ""}
          onClose={closeReplyModal}
          onSubmit={handleReplySubmit}
        />
      )}
    </div>
  );
};

export default SupportTicketList;
