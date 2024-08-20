"use client";
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

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/list-users`, {
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

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDownloadCSV = () => {
    const headers = [
      "_id",
      "First Name",
      "Last Name",
      "Email",
      "Mobile",
      "Organisation",
      "Designation",
    ];

    // Define minimum widths for each column
    const minWidths: { [key: string]: number } = {
      "_id": 20,
      "First Name": 20,
      "Last Name": 20,
      "Email": 30,
      "Mobile": 15,
      "Organisation": 25,
      "Designation": 25,
    };

    // Calculate maximum width for each column, ensuring minimum width
    const columnWidths = headers.map((header) =>
      Math.max(
        minWidths[header] || 10, // Default to 10 if min width is not defined
        ...users.map((user) => {
          return [
            user._id || "",
            user.firstName || "",
            user.lastName || "",
            user.email || "",
            user.mobile || "N/A",
            user.organisation || "N/A",
            user.designation || "N/A",
          ][headers.indexOf(header)].length;
        })
      )
    );

    // Create CSV rows
    const csvRows = [];
    csvRows.push(headers.map((header, i) => header.padEnd(columnWidths[i])).join(","));

    for (const user of users) {
      const row = [
        user._id || "",
        user.firstName || "",
        user.lastName || "",
        user.email || "",
        user.mobile || "N/A",
        user.organisation || "N/A",
        user.designation || "N/A",
      ].map((field) => String(field)); // Convert to string

      csvRows.push(row.map((field, i) => field.padEnd(columnWidths[i])).join(","));
    }

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    URL.revokeObjectURL(url);
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
            onClick={fetchUsers} // Fetch users based on date range
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
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
