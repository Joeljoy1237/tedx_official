"use client"
import React, { useEffect, useState } from 'react';

interface BookingGroup {
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
  group: BookingGroup[];
  createdAt: string;
  updatedAt: string;
}

const Purchased: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/admin/purchased-list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          },
          cache: "no-store",
        });
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          const result = await response.json();
          setError(result.message || "Failed to fetch bookings");
        }
      } catch (err) {
        setError('An error occurred while fetching the bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const totalBookings = bookings.length;
  const totalAmount = bookings.reduce((sum, booking) => sum + booking.amount, 0);

  // Format amount to Indian Rupees with the last 4 digits removed
  const formatAmount = (amount: number) => {
    // Remove the last 4 digits by dividing by 10,000
    const adjustedAmount = Math.floor(amount / 100);
    // Format amount as Indian Rupees
    return `₹${adjustedAmount.toLocaleString('en-IN')}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-black-100">
      <div className="mb-6 bg-black-200 text-white p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Statistics</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-blue-500 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Total Bookings</h3>
            <p className="text-3xl font-bold">{totalBookings}</p>
          </div>
          <div className="bg-green-500 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Total Amount Received</h3>
            <p className="text-3xl font-bold font-sans">{formatAmount(totalAmount)}.00</p>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-4">Purchased Bookings</h1>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map(booking => (
            <li key={booking._id} className="mb-4 border-b pb-2">
              <h3 className="text-xl font-semibold">{booking.orderId}</h3>
              <p><strong>User ID:</strong> {booking.userId}</p>
              <p className='font-sans'><strong>Amount:</strong> {formatAmount(booking.amount)}</p>
              <p><strong>Count:</strong> {booking.count}</p>
              <h3 className="text-lg font-semibold mt-2">Group Details:</h3>
              <ul>
                {booking.group.map((person, index) => (
                  <li key={index} className="border p-2 mb-2 rounded">
                    <p><strong>Name:</strong> {person.firstName} {person.lastName}</p>
                    <p><strong>Email:</strong> {person.email}</p>
                    <p><strong>Organisation:</strong> {person.organisation}</p>
                    <p><strong>Designation:</strong> {person.designation}</p>
                    <p><strong>Checked In:</strong> {person.checkedIn ? "Yes" : "No"}</p>
                    <p><strong>Student:</strong> {person.isStudent ? "Yes" : "No"}</p>
                    <p className='font-sans'><strong>Ticket ID:</strong> {person.ticketId}</p>
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
