"use client";
import React, { useEffect, useState } from "react";

interface GroupMember {
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  designation: string;
}

const TicketComponent: React.FC = () => {
  const [soldTicketCount, setSoldTicketCount] = useState<number>(0);
  const [group, setGroup] = useState<GroupMember[]>([
    {
      firstName: "",
      lastName: "",
      email: "",
      organisation: "",
      designation: "",
    },
  ]);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    async function checkStatus() {
      try {
        const response = await fetch("/api/ticket/status");
        if (!response.ok) {
          throw new Error("Failed to fetch ticket status");
        }
        const data = await response.json();
        setSoldTicketCount(data?.value || 0);
      } catch (error) {
        console.error("Error fetching ticket status:", error);
      }
    }
    checkStatus();
  }, []);

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newGroup = [...group];
    newGroup[index][name as keyof GroupMember] = value;
    setGroup(newGroup);
  };

  const addMember = () => {
    setGroup([
      ...group,
      {
        firstName: "",
        lastName: "",
        email: "",
        organisation: "",
        designation: "",
      },
    ]);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/admin/newTicket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "adminId",
          count: group.length,
          amount: amount,
          group: group,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit ticket");
      }

      const data = await response.json();
      console.log("Ticket submitted successfully:", data);
    } catch (err) {
      console.error("Error submitting ticket:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center text-white">
        Ticket Management
      </h2>
      <p className="text-lg mb-4 text-white">
        Total Sold: <span className="font-bold">{soldTicketCount}</span>
      </p>

      {group.map((member, index) => (
        <div key={index} className="mb-6 p-4 rounded-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">
              First Name:
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={member.firstName}
              onChange={(e) => handleInputChange(index, e)}
              className="w-full p-2 border text-black-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">
              Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={member.lastName}
              onChange={(e) => handleInputChange(index, e)}
              className="w-full p-2 border text-black-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">
              Email:
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={member.email}
              onChange={(e) => handleInputChange(index, e)}
              className="w-full p-2 border text-black-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">
              Organisation:
            </label>
            <input
              type="text"
              name="organisation"
              placeholder="Organisation"
              value={member.organisation}
              onChange={(e) => handleInputChange(index, e)}
              className="w-full p-2 border text-black-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">
              Designation:
            </label>
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={member.designation}
              onChange={(e) => handleInputChange(index, e)}
              className="w-full p-2 border text-black-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-black"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addMember}
        className="w-full mb-4 p-3 bg-primary-500 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Member
      </button>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 text-white">
          Amount:
        </label>
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-2 border text-black-100 border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-black"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full p-3 bg-primary-500 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Submit
      </button>
    </div>
  );
};

export default TicketComponent;
