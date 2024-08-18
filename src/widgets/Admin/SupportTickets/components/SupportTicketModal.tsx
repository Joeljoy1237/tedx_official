// components/SupportTicketModal.tsx
"use client"
import React, { useState } from 'react';
import showTedxToast from '@components/showTedxToast'; // Import showTedxToast

interface SupportTicket {
  _id: string;
  name: string;
  email: string;
  subject: string;
  issue: string;
  status: string;
  createdAt: string;
  updatedAt: string;
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
      const response = await fetch('/api/admin/support-tickets/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: ticket._id, status, reply }),
      });
      
      if (response.ok) {
        const updatedTicket = await response.json();
        // Update the parent component
        showTedxToast({
          type: 'success',
          message: 'Ticket updated successfully',
        });
      } else {
        const result = await response.json();
        showTedxToast({
          type: 'error',
          message: result.message,
          desc: result.desc,
        });
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      showTedxToast({
        type: 'error',
        message: 'Error',
        desc: 'An error occurred while updating the support ticket.',
      });
    } finally {
      setReply('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black-200 text-black p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Ticket Details</h2>
        <p><strong>Subject:</strong> {ticket.subject}</p>
        <p><strong>Issue:</strong> {ticket.issue}</p>
        <p><strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(ticket.updatedAt).toLocaleString()}</p>
        <div className="mt-4">
          <label className="block mb-2">Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded p-2 w-full bg-black-100">
            {statusOptions.map(option => (
              <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label className="block mb-2">Reply:</label>
          <textarea value={reply} onChange={(e) => setReply(e.target.value)} className="border rounded p-2 w-full bg-black-100" rows={4}></textarea>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">Update</button>
          <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default SupportTicketModal;
