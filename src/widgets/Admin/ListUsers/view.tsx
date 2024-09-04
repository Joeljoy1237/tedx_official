"use client";
import React, { useEffect, useState } from "react";
import { ScaleLoader } from 'react-spinners'
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
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // New state for filtered users
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [isStudent, setIsStudent] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const [currentPage, setCurrentPage] = useState<number>(1); // State for pagination

  const usersPerPage = 15; // Number of users per page

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/list-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startDate, endDate }),
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data); // Set both users and filteredUsers with the fetched data
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = users.filter(
      (user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(query) ||
        (user.email && user.email.toLowerCase().includes(query))
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to the first page after searching
  };

  const handleIssueTicket = (userId: string) => {
    setSelectedUserId(userId);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedUserId(null);
    setAmount("");
    setIsStudent(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedUserId || !amount) {
      return;
    }

    try {
      const response = await fetch("/api/admin/issue-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: selectedUserId, amount, isStudent }),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      handleModalClose();
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
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
      "Has Bought Ticket",
    ];

    const minWidths: { [key: string]: number } = {
      _id: 20,
      "First Name": 20,
      "Last Name": 20,
      Email: 30,
      Mobile: 15,
      Organisation: 25,
      Designation: 25,
      "Has Bought Ticket": 15,
    };

    const columnWidths = headers.map((header) =>
      Math.max(
        minWidths[header] || 10,
        ...users.map((user) => {
          return [
            user._id || "",
            user.firstName || "",
            user.lastName || "",
            user.email || "",
            user.mobile || "N/A",
            user.organisation || "N/A",
            user.designation || "N/A",
            user.isBought ? "Yes" : "No",
          ][headers.indexOf(header)].length;
        })
      )
    );

    const csvRows = [];
    csvRows.push(
      headers.map((header, i) => header.padEnd(columnWidths[i])).join(",")
    );

    for (const user of users) {
      const row = [
        user._id || "",
        user.firstName || "",
        user.lastName || "",
        user.email || "",
        user.mobile || "N/A",
        user.organisation || "N/A",
        user.designation || "N/A",
        user.isBought ? "Yes" : "No",
      ].map((field) => String(field));

      csvRows.push(
        row.map((field, i) => field.padEnd(columnWidths[i])).join(",")
      );
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

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex w-full h-full items-center justify-center">
       <ScaleLoader color="#eb0028" />
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

  const totalUsers = filteredUsers.length;
  const boughtUsersCount = users.filter((user) => user.isBought).length;
  const adminUsersCount = users.filter((user) => user.isAdmin).length;

  return (
    <div className="p-6 rounded-lg shadow-lg">
      <div className="flex justify-between bg-black-100 p-3 rounded-[10px] items-center mb-6">
        <h3 className="text-2xl font-semibold font-sans">User List ({" "}{totalUsers}{" Users"})</h3>
        <div>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={handleSearch}
            className="border-black-400 border p-2 rounded mr-2 placeholder-black-300 bg-black-200"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border-black-400 border placeholder-black-300 p-2 rounded mr-2 bg-black-200"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border-black-400 border placeholder-black-300 p-2 rounded mr-2 bg-black-200"
          />
          <button
            onClick={fetchUsers}
            className="bg-black-100 border border-primary-700 text-white p-2 rounded mr-2"
          >
            Apply Filter
          </button>
          <button
            onClick={handleDownloadCSV}
            className="bg-primary-700 text-white p-2 rounded"
          >
            Download CSV
          </button>
        </div>
      </div>
      {/* <div className="mb-6 bg-black-100 p-3 rounded-[10px]">
        <p className="text-lg font-medium">Total Users: {totalUsers}</p>
        <p className="text-lg font-medium">Admin Users: {adminUsersCount}</p>
      </div> */}
      {totalUsers === 0 ? (
        <p>No users found.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentUsers.map((user) => (
              <div
                key={user._id}
                className="bg-black-100 text-white p-4 rounded-lg shadow-md"
              >
                <h4 className="text-xl font-bold mb-2">
                  {user?.firstName} {user?.lastName}
                </h4>
                <p>
                  <span className="font-semibold">Email:</span> {user?.email}
                </p>
                <p>
                  <span className="font-semibold">Referal Code:</span>{" "}
                  {user?.referal_code}
                </p>
                <p>
                  <span className="font-semibold">Organisation:</span>{" "}
                  {user?.organisation}
                </p>
                <p>
                  <span className="font-semibold">Designation:</span>{" "}
                  {user?.designation}
                </p>
                <p className="font-sans">
                  <span className="font-semibold">Mobile:</span>{" "}
                  {user?.mobile || "N/A"}
                </p>
                {!user?.isBought && (
                  <button
                    onClick={() => handleIssueTicket(user._id!)}
                    className="bg-primary-500 text-white p-2 mt-4 rounded"
                  >
                    Issue Ticket
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            {Array.from(
              { length: Math.ceil(filteredUsers.length / usersPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`p-2 px-4 mx-1 ${
                    currentPage === index + 1
                      ? "bg-primary-600 text-white"
                      : "bg-black-300 text-black"
                  } rounded`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      )}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center">
          <div className="bg-black-100 p-6 rounded shadow-lg">
            <h3 className="text-2xl mb-4">Issue Ticket</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="amount" className="block mb-1 font-medium">
                  Amount:
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border p-2 rounded w-full bg-black-200 border-none outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="checkbox"
                  id="isStudent"
                  checked={isStudent}
                  onChange={(e) => setIsStudent(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="isStudent" className="font-medium">
                  Is Student?
                </label>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-black-100 border border-primary-700 text-white p-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary-700 text-white p-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
