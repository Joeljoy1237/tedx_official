"use client"
import React, { useEffect, useState } from "react";

interface User {
  _id?: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  referal_code?: string | null;
  organisation?: string | null;
  designation?: string | null;
  mobile?: string | null;
  isBought?: boolean | null;
  isAdmin: boolean | null;
  createdAt?: string; // This will still be used for UI display
}

export default function ListUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [isStudent, setIsStudent] = useState<boolean>(false); // New state for isStudent

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/list-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startDate, endDate }),
        cache: "no-store", // Prevent caching
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIssueTicket = (userId: string) => {
    setSelectedUserId(userId);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedUserId(null);
    setAmount("");
    setIsStudent(false); // Reset isStudent state
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedUserId || !amount) {
      return; // Handle invalid form data
    }

    try {
      const response = await fetch("/api/admin/issue-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: selectedUserId, amount, isStudent }), // Include isStudent
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      // Close modal and reset state
      handleModalClose();
      fetchUsers(); // Refresh the user list
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDownloadCSV = () => {
    // CSV download logic here (unchanged)
  };

  if (loading) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  const totalUsers = users.length;
  const boughtUsersCount = users.filter((user) => user.isBought).length;
  const adminUsersCount = users.filter((user) => user.isAdmin).length;

  return (
    <div className="p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">User List</h3>
        <div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded mr-2 bg-black-200"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded mr-2 bg-black-200"
          />
          <button
            onClick={fetchUsers}
            className="bg-gray-500 text-white p-2 rounded mr-2"
          >
            Apply Filter
          </button>
          <button
            onClick={handleDownloadCSV}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Download CSV
          </button>
        </div>
      </div>
      <div className="mb-6">
        <p className="text-lg font-medium">Total Users: {totalUsers}</p>
        <p className="text-lg font-medium">
          Users Who Bought Tickets: {boughtUsersCount}
        </p>
        <p className="text-lg font-medium">Admin Users: {adminUsersCount}</p>
      </div>
      {totalUsers === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-black-100 text-white p-4 rounded-lg shadow-md"
            >
              <h4 className="text-xl font-bold mb-2">
                {user?.firstName} {user?.lastName}
              </h4>
              <p className="mb-1">
                <strong>Email:</strong> {user?.email}
              </p>
              <p className="mb-1">
                <strong>Mobile:</strong> {user?.mobile || "N/A"}
              </p>
              <p className="mb-1">
                <strong>Organisation:</strong> {user?.organisation || "N/A"}
              </p>
              <p className="mb-1">
                <strong>Designation:</strong> {user?.designation || "N/A"}
              </p>
              <p className="mb-1">
                <strong>Referral Code:</strong> {user?.referal_code || "N/A"}
              </p>
              <p className="mb-1">
                <strong>Has Bought Ticket:</strong>{" "}
                {user?.isBought ? "Yes" : "No"}
              </p>
              <p className="mb-1">
                <strong>Admin:</strong> {user?.isAdmin ? "Yes" : "No"}
              </p>
              <p className="mb-1">
                <strong>Created Date:</strong>{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
              {!user.isBought && (
                <button
                  onClick={() => handleIssueTicket(user._id!)}
                  className="bg-red-500 text-white p-2 rounded mt-4"
                >
                  Issue Ticket
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black-200 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Issue Ticket</h3>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">
                Amount:
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border p-2 rounded w-full mt-1 bg-black-300"
                  required
                />
              </label>
              <label className="block mb-2">
                <input
                  type="checkbox"
                  checked={isStudent}
                  onChange={(e) => setIsStudent(e.target.checked)}
                  className="mr-2"
                />
                Is Student
              </label>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded mr-2"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-500 text-white p-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
