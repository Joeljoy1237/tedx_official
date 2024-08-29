"use client";
import React, { useState } from 'react';
import showTedxToast from '@components/showTedxToast'; // Import showTedxToast

interface SupportTicket {
  _id: string;
  userId: string;
  name: string;
  email: string;
  subject: string;
  issue: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  messages: {
    sender: string;
    content: string;
    timestamp: string;
  }[];
}

interface SupportTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: SupportTicket | null;
  // onUpdate: (updatedTicket: SupportTicket) => void;
}

const statusOptions = ["open", "in-progress", "resolved", "closed"];

const SupportTicketModal: React.FC<SupportTicketModalProps> = ({ isOpen, onClose, ticket }) => {
  const [status, setStatus] = useState(ticket?.status || '');
  const [reply, setReply] = useState('');

  if (!isOpen || !ticket) return null;

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/support-ticket/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId:ticket?.userId,ticketId: ticket._id, content: reply, sender: "support", status }),
      });

      if (response.ok) {
        const updatedTicket = await response.json();
        // Optionally update the UI or inform the parent component
        showTedxToast({
          type: 'success',
          message: 'Reply added successfully',
        });
        // Optionally, update the ticket messages in the UI
      } else {
        const result = await response.json();
        showTedxToast({
          type: 'error',
          message: result.message,
          desc: result.desc,
        });
      }
    } catch (error) {
      console.error("Error adding reply:", error);
      showTedxToast({
        type: 'error',
        message: 'Error',
        desc: 'An error occurred while adding the reply.',
      });
    } finally {
      setReply('');
      onClose();
    }
  };

  return (
    <div className="fixed overflow-auto pt-[10vh] inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black-200 text-black p-6 w-[90vw] md:w-[50vw] lg:w-[50vw] rounded-lg flex-col md:flex-row gap-[4vw] lg:flex-row flex">
        <div className="">
          <h3 className="text-xl font-semibold mb-4">Ticket Details</h3>
          <div className="mb-4">
            <p><strong>Subject:</strong> {ticket.subject}</p>
            <p><strong>Issue:</strong> {ticket.issue}</p>
            <p><strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(ticket.updatedAt).toLocaleString()}</p>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded p-2 w-full bg-black-100"
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Reply:</label>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="border rounded p-2 w-full bg-black-100"
              rows={4}
            ></textarea>
          </div>
        </div>

        <div className="min-w-[20vw]">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Messages</h3>
            <div className="h-48 overflow-y-auto border rounded p-2 bg-black-100">
              {ticket.messages.length > 0 ? (
                ticket.messages.map((message, index) => (
                  <div key={index} className={`mb-2 p-2 rounded ${message.sender === 'user' ? 'bg-primary-700' : 'bg-green-600'}`}>
                    <p className="font-semibold text-sm">{message.sender.charAt(0).toUpperCase() + message.sender.slice(1)}</p>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs text-black-100">{new Date(message.timestamp).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No messages yet.</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            >
              Update
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTicketModal;
