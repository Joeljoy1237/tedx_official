import Button from "@components/Button";
import Link from "next/link";
import React from "react";

export default function Tariff() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center bg-black text-white p-6">
      <div className="w-full max-w-5xl p-8 bg-black-100 rounded-lg shadow-lg border border-black-300">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-semibold text-white underline">
            Ticket Tariff
          </h3>
        </div>

        {/* Tariff Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Individual Ticket */}
          <div className="space-y-2">
            <h4 className="text-2xl font-semibold text-white">
              Individual Ticket
            </h4>
            <div className="text-lg space-y-1">
              <p className="flex justify-between">
                <span>Ticket Price</span>
                <span className="font-bold">1200/-</span>
              </p>
              <p className="flex justify-between">
                <span>*Early Bird</span>
                <span className="font-bold font-sans">1050/-</span>
              </p>
              <p className="text-sm italic text-gray-400">
                *Early Bird is only for the first 20 tickets
              </p>
              <p className="flex justify-between">
                <span>School Student</span>
                <span className="font-bold font-sans">750/-</span>
              </p>
              <p className="text-sm italic text-gray-400">
                *ID Card is mandatory
              </p>
            </div>
          </div>

          {/* Group Ticket */}
          <div className="space-y-2">
            <h4 className="text-2xl font-semibold text-white">Group Ticket</h4>
            <div className="text-lg space-y-1">
              <p className="flex justify-between">
                <span>For 5 - 10 members</span>
                <span className="font-bold font-sans">1100 / Ticket</span>
              </p>
              <p className="flex justify-between">
                <span>For more than 10 members</span>
                <span className="font-bold font-sans">1050 / Ticket</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <Link href={"/get-tickets"}>
          <Button
            title="Get your tickets now"
            className="bg-primary-700 p-4 w-full md:w-full lg:w-full rounded-[8px] outline-none border-none font-semibold"
          />
        </Link>
      </div>
    </div>
  );
}
