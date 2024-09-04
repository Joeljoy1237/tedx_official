"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa"; // Import mail icon
import showTedxToast from "@components/showTedxToast";
import Button from "@components/Button";

interface BookingGroup {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  designation: string;
  checkedIn: boolean;
  isStudent: boolean;
  ticketId: string;
}

interface Booking {
  _id: string;
  userId: string;
  orderId: string;
  paymentId: string;
  referal_code?: string;
  count: number;
  amount: number;
  confirmationMailSent: boolean;
  group: BookingGroup[];
  createdAt: string;
  updatedAt: string;
}

const Purchased: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]); // State for filtered bookings
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [ticketStatus, setTicketStatus] = useState<{ ticketSold?: number }[]>(
    []
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // Default sort order
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/admin/purchased-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        body: JSON.stringify({ sortOrder }), // Pass sortOrder in the request body
        cache: "no-store",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data?.bookings);
        setBookings(data.bookings || []);
        setFilteredBookings(data.bookings || []); // Initialize filtered bookings
        setTicketStatus(data.ticketStatus || []);
      } else {
        const result = await response.json();
        setError(result.message || "Failed to fetch bookings");
      }
    } catch (err) {
      setError("An error occurred while fetching the bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [sortOrder]); // Re-fetch data when sortOrder changes

  // Filter bookings based on search query
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter(
        (booking) =>
          booking.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.group.some(
            (person) =>
              person.firstName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              person.lastName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              person.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
              person.ticketId
                .slice(14, person.ticketId.length)
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
      );
      setFilteredBookings(filtered);
    }
  }, [searchQuery, bookings]);

  const totalBookings =
    ticketStatus.length > 0 ? ticketStatus[0]?.ticketSold : 0;
  const totalAmount = filteredBookings.reduce(
    (sum, booking) => sum + booking.amount,
    0
  );

  const formatAmount = (amount: number) => {
    const adjustedAmount = Math.floor(amount / 100);
    return `₹${adjustedAmount.toLocaleString("en-IN")}`;
  };

  const sendMail = async (
    email: string,
    firstName: string,
    lastName: string,
    bookingId: string,
    personId: string
  ) => {
    try {
      const response = await fetch("/api/admin/newTicket/sentMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          bookingId,
          personId,
        }),
      });
      if (response.ok) {
        showTedxToast({
          type: "success",
          message: "Mail sent Successfully",
        });
      } else {
        showTedxToast({
          type: "error",
          message: "Mail sending failed",
        });
      }
    } catch (error) {
      showTedxToast({
        type: "error",
        message: "An error occurred while sending the mail",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-black-100 text-white">
      <div className="mb-6 bg-black-200 text-white rounded-lg shadow-lg p-4">
        <h1 className="text-2xl font-bold mb-4">Statistics</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-primary-700 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Total Bookings</h3>
            <p className="text-3xl font-bold">{totalBookings || 0}</p>
          </div>
          <div className="bg-primary-700 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Total Amount Received</h3>
            <p className="text-3xl font-bold font-sans">
              {formatAmount(totalAmount)}.00
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-5">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 bg-black-300 text-white rounded w-full md:w-1/3 outline-none border-none"
        />
        <div>
          <label htmlFor="sortOrder" className="mr-2">
            Sort Order:
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="p-2 bg-black-300 text-white rounded outline-none border-none"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-4">Purchased Bookings</h1>
      {filteredBookings.length > 0 ? (
        <ul>
          {filteredBookings.map((booking) => (
            <li
              key={booking._id}
              className="mb-4 border-b border-gray-600 pb-2"
            >
              <h3 className="text-xl font-semibold">{booking.orderId}</h3>
              <p>
                <strong>User ID:</strong> {booking.userId}
              </p>
              <p className="font-sans">
                <strong>Amount:</strong> {formatAmount(booking.amount)}
              </p>
              <p>
                <strong>Count:</strong> {booking.count}
              </p>
              <h3 className="text-lg font-semibold mt-2">Group Details:</h3>
              <ul>
                {booking.group.map((person) => (
                  <li
                    key={person.ticketId}
                    className="border border-gray-700 p-2 mb-2 rounded flex justify-between items-center"
                  >
                    <div>
                      <p>
                        <strong>Name:</strong> {person.firstName}{" "}
                        {person.lastName}
                      </p>
                      <p>
                        <strong>Email:</strong> {person.email}
                      </p>
                      <p>
                        <strong>Organisation:</strong> {person.organisation}
                      </p>
                      <p>
                        <strong>Designation:</strong> {person.designation}
                      </p>
                      <p>
                        <strong>Checked In:</strong>{" "}
                        {person.checkedIn ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Student:</strong>{" "}
                        {person.isStudent ? "Yes" : "No"}
                      </p>
                      <p className="font-sans">
                        <strong>Ticket ID:</strong> {person.ticketId}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Link
                        className="bg-[#eb0028] font-semibold text-xl text-white w-[10vw] p-3 rounded-[10px] flex flex-row items-center justify-center gap-2"
                        target="_blank"
                        href={`/tickets/${booking._id}/${person._id}`}
                      >
                        <IoMdDownload className="font-semibold text-xl" />{" "}
                        Download
                      </Link>
                      {!booking?.confirmationMailSent && (
                        <button
                          onClick={() =>
                            sendMail(
                              person.email,
                              person?.firstName,
                              person?.lastName,
                              booking._id,
                              person._id
                            )
                          }
                          className="bg-blue-500 font-semibold text-xl text-white w-[10vw] p-3 rounded-[10px] flex flex-row items-center justify-center gap-2"
                        >
                          <FaEnvelope className="font-semibold text-xl" /> Send
                          Mail
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default Purchased;
