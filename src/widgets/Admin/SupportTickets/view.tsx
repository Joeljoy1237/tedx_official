"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import showTedxToast from '@components/showTedxToast';
import TitleBar from '@components/TitleBar';
import SupportTicketModal from './components/SupportTicketModal';
import { ScaleLoader } from 'react-spinners'
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

const statusColors: Record<string, string> = {
  open: 'bg-blue-500 text-white',
  'in-progress': 'bg-yellow-500 text-white',
  resolved: 'bg-green-500 text-white',
  closed: 'bg-gray-500 text-white',
};

const SupportTickets: React.FC = () => {
  const { data: session } = useSession();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('/api/admin/support-tickets');
        if (response.ok) {
          const data = await response.json();
          setTickets(data);
        } else {
          const result = await response.json();
          showTedxToast({
            type: 'error',
            message: result.message,
            desc: result.desc,
          });
          setError(result.message);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
        showTedxToast({
          type: 'error',
          message: 'Error',
          desc: 'An error occurred while fetching support tickets.',
        });
        setError('An error occurred while fetching support tickets.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleTicketClick = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTicket(null);
  };

  if (loading) {
    return (
      <div className="w-full h-full items-center justify-center flex">
        <ScaleLoader color="#eb0028" />
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="py-10 rounded-[8px] px-[5vw] bg-[#000000] text-white flex flex-col gap-12">
      <TitleBar title="All Support" titleSecond="Tickets" />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tickets.length > 0 ? (
          tickets.map(ticket => (
            <li
              key={ticket._id}
              className="bg-black-200 p-4 rounded-lg shadow-md cursor-pointer"
              onClick={() => handleTicketClick(ticket)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{ticket.subject}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${statusColors[ticket.status]}`}>
                  {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                </span>
              </div>
              <p className="text-sm mb-1">Name: {ticket.name}</p>
              <p className="text-sm mb-1">Email: {ticket.email}</p>
              <p className="text-sm mb-1">Issue: {ticket.issue}</p>
              <p className="text-sm mb-1">Created At: {new Date(ticket.createdAt).toLocaleString()}</p>
              <p className="text-sm">Updated At: {new Date(ticket.updatedAt).toLocaleString()}</p>
            </li>
          ))
        ) : (
          <div className="flex items-center justify-center w-full">
            <p className="text-center text-gray-400">No support tickets found.</p>
          </div>
        )}
      </ul>

      {/* Modal */}
      <SupportTicketModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        ticket={selectedTicket}
      />
    </div>
  );
};

export default SupportTickets;
