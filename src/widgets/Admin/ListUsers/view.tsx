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
}

export default function ListUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the user details from the API
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/list-users");
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

    fetchUsers();
  }, []);

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
  const boughtUsersCount = users.filter(user => user.isBought).length;
  const adminUsersCount = users.filter(user => user.isAdmin).length;

  return (
    <div className="p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-4">User List</h3>
      <div className="mb-6">
        <p className="text-lg font-medium">Total Users: {totalUsers}</p>
        <p className="text-lg font-medium">Users Who Bought Tickets: {boughtUsersCount}</p>
        <p className="text-lg font-medium">Admin Users: {adminUsersCount}</p>
      </div>
      {totalUsers === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user._id} className="bg-black-100 text-white p-4 rounded-lg shadow-md">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
