"use client";
import { useEffect, useState, ChangeEvent } from "react";

interface Member {
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  designation: string;
  food: string;
  checkedIn: boolean;
  isStudent: boolean;
  ticketId: string;
}

interface Booking {
  userId: string;
  amount: number;
  count: number;
  group: Member[];
}

const Page = () => {
  const [checkedInUsers, setCheckedInUsers] = useState<Booking[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Booking[]>([]);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"Ascending" | "Descending">(
    "Descending"
  );

  useEffect(() => {
    const fetchCheckedIn = async () => {
      const response = await fetch("/api/admin/purchased-list/checkIn/fetch", {
        method: "GET",
        cache: "no-store", // Ensures the response is not cached
      });
      const data: Booking[] = await response.json();

      setCheckedInUsers(data);
      setFilteredUsers(data);

      // Calculate total count and amount
      setTotalBookings(data.length);
      const totalAmountInPaise = data.reduce(
        (acc, booking) => acc + booking.amount,
        0
      );
      setTotalAmount(totalAmountInPaise / 100); // Convert to rupees
    };
    fetchCheckedIn();
  }, []);

  useEffect(() => {
    // Filter and sort the users based on the search term and sort order
    const filtered = checkedInUsers.filter((booking) =>
      booking.group.some(
        (member) =>
          member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    const sorted = filtered.sort((a, b) => {
      const aTicketId = a.group[0].ticketId;
      const bTicketId = b.group[0].ticketId;
      return sortOrder === "Ascending"
        ? aTicketId.localeCompare(bTicketId)
        : bTicketId.localeCompare(aTicketId);
    });

    setFilteredUsers(sorted);
  }, [searchTerm, sortOrder, checkedInUsers]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "Ascending" | "Descending");
  };

  return (
    <div className="bg-black min-h-screen block p-8 text-white">
      {/* Header with stats */}
      <div className="flex justify-between items-center mb-8">
        <div className="bg-red-600 p-4 rounded text-center w-1/3">
          <h3 className="text-2xl font-bold">Total Check In</h3>
          <p className="text-4xl font-bold">{totalBookings}</p>
        </div>
        <div className="bg-red-600 p-4 rounded text-center w-1/3">
          <h3 className="text-2xl font-bold">Total Amount</h3>
          <p className="text-4xl font-bold">₹{totalAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded placeholder-white bg-black-400 text-white w-full text-black"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          className="ml-4 p-2 rounded bg-black-400 text-white text-black"
          value={sortOrder}
          onChange={handleSortChange}
        >
          <option value="Descending">Descending</option>
          <option value="Ascending">Ascending</option>
        </select>
      </div>

      {/* Bookings List */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Purchased Bookings</h3>
        {filteredUsers.map((booking, index) => (
          <div key={index} className="p-4 rounded mb-4">
            <h3 className="font-bold">By Manual</h3>
            <p>
              <strong>User ID:</strong> {booking.userId}
            </p>
            <p>
              <strong>Amount:</strong> ₹{(booking.amount / 100).toFixed(2)}
            </p>
            <p>
              <strong>Count:</strong> {booking.count}
            </p>
            <h4 className="mt-4 font-bold">Group Details:</h4>
            {booking.group.map((member, index) => (
              <div key={index} className="bg-primary-950 p-4 rounded mt-2">
                <p>
                  <strong>Name:</strong> {member.firstName} {member.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {member.email}
                </p>
                <p>
                  <strong>Organisation:</strong> {member.organisation}
                </p>
                <p>
                  <strong>Designation:</strong> {member.designation}
                </p>
                <p>
                  <strong>Food preference:</strong> {member.food}
                </p>
                <p>
                  <strong>Checked In:</strong> {member.checkedIn ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Student:</strong> {member.isStudent ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Ticket ID:</strong> {member.ticketId}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
