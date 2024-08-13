import Image from "next/image";
import React from "react";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

export default function SuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Image
        src={"/forgot.png"}
        className="w-full h-[100vh] object-cover bg-center"
        width={1000}
        height={1000}
        alt=""
      />
      <div className="bg-black-100 bg-opacity-60 p-10 rounded-xl shadow-xl max-w-lg text-center absolute">
        <div className="flex justify-center items-center mb-8">
          <div className="bg-green-100 text-green-600 p-4 rounded-full">
            <IoCheckmarkDoneCircle className="text-6xl"/>
          </div>
        </div>
        <h3 className="text-4xl font-semibold text-green-600 mb-5">
          Payment Successful
        </h3>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase. Your transaction was successful, and your
          order is being processed.
        </p>
        <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-teal-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300">
          Download Receipt
        </button>
        <div className="mt-8">
          <a href="/" className="text-indigo-600 hover:underline">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
