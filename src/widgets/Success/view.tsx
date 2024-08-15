"use client";
import Image from "next/image";
import React, { Suspense, useState } from "react";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import jsPDF from "jspdf";
import autoTable, { UserOptions } from "jspdf-autotable"; // Import autoTable
import Link from "next/link";

export default function SuccessPage() {
  // const searchParams = useSearchParams();
  // const paymentId = searchParams.get("paymentId") || "";
  // const orderId = searchParams.get("orderId") || "";

  const [paymentId, setPaymentId] = useState<String>("");
  const [orderId, setOrderId] = useState<String>("");

  const PaymentDetails: React.FC = () => {
    const searchParams = useSearchParams();
    setPaymentId(searchParams.get("paymentId") || "");
    setOrderId(searchParams.get("orderId") || "");

    return (
      <>
        <p className="text-lg text-gray-600 mb-3">Payment ID: {paymentId}</p>
        <p className="text-lg text-gray-600 mb-8">Order ID: {orderId}</p>
      </>
    );
  };

  const handleDownloadReceipt = () => {
    const doc = new jsPDF();

    // Add header
    doc.setFontSize(24);

    // Text for TEDx
    doc.setTextColor("#eb0028"); // Red color for TEDx
    doc.setFont("Helvetica", "bold");
    const textTEDx = "TEDx";
    const textCCET = "CCET";
    const textTEDxWidth = doc.getTextWidth(textTEDx);
    const textCCETWidth = doc.getTextWidth(textCCET);

    // Combine the widths of both texts and add some space in between
    const totalWidth = textTEDxWidth + textCCETWidth; // 5 units of space between TEDx and CCET
    const pageWidth = doc.internal.pageSize.getWidth();
    const headerX = (pageWidth - totalWidth) / 2;

    // Add TEDx
    doc.text(textTEDx, headerX, 40);

    // Add CCET
    doc.setTextColor("#000000"); // Color for CCET
    doc.setFont("Helvetica", "normal");
    doc.text(textCCET, headerX + textTEDxWidth, 40); // Adjust X position for CCET

    // Add title
    doc.setFontSize(22);
    doc.setTextColor("#000000"); // Set title color to black
    const title = "Payment Receipt";
    const titleWidth = doc.getTextWidth(title);
    const titleX = (pageWidth - titleWidth) / 2;
    doc.text(title, titleX, 60);

    // Define the table options
    const options: UserOptions = {
      startY: 80,
      head: [["Payment ID", "Order ID"]],
      body: [["" + paymentId, "" + orderId]],
      styles: {
        cellPadding: 5,
        fontSize: 12,
        halign: "center" as "center", // Center align text in table
        valign: "middle" as "middle",
        textColor: [0, 0, 0] as [number, number, number], // Black text color for body rows
        fillColor: [255, 255, 255] as [number, number, number], // White background for body rows
      },
      headStyles: {
        fillColor: [235, 0, 40] as [number, number, number], // TEDx red background for header
        textColor: [255, 255, 255] as [number, number, number], // White text color for header
        fontSize: 14,
        halign: "center" as "center",
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240] as [number, number, number], // Light gray for alternate rows
      },
    };

    // Add table to the PDF
    autoTable(doc, options);

    // Get the final Y position after the table
    const finalY = (doc as any).lastAutoTable.finalY;

    // Add a thank you message
    doc.setFontSize(14);
    doc.setTextColor("#333333"); // Set message color to dark gray
    doc.text(
      "Thank you for your purchase! Your transaction was successful.",
      15,
      finalY + 10
    );

    // Add the date, time, and IP address
    const generatedDate = new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });

    const ipAddress = "123.456.789.012"; // Replace with dynamic IP if available
    doc.setFontSize(12);
    doc.setTextColor("#555555"); // Set color to gray
    doc.text(`Generated on: ${generatedDate}`, 15, finalY + 25);

    const creditsText =
      "www.tedxccet.in | For support contact: tedxsupport@carmelcet.in";
    const creditsWidth = doc.getTextWidth(creditsText);
    const creditsX = (pageWidth - creditsWidth) / 1.5;
    const creditsY = doc.internal.pageSize.height - 20; // 20 units from the bottom
    doc.setFontSize(10);
    doc.setTextColor("#555555"); // Set color to gray for credits
    doc.text(creditsText, creditsX, creditsY);
    // Save the PDF
    doc.save(`TEDxCCET_Payment_Receipt_${orderId}.pdf`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Image
        src="/forgot.png"
        className="w-full h-[100vh] object-cover bg-center"
        width={1000}
        height={1000}
        alt="Background Image"
      />
      <div className="bg-black-100 bg-opacity-60 p-10 rounded-xl shadow-xl max-w-lg text-center absolute">
        <div className="flex justify-center items-center mb-8">
          <div className="bg-green-100 text-green-600 p-4 rounded-full">
            <IoCheckmarkDoneCircle className="text-6xl" />
          </div>
        </div>
        <h3 className="text-4xl font-semibold text-green-600 mb-5">
          Payment Successful
        </h3>
        <Suspense>
          <PaymentDetails />
        </Suspense>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase. Your transaction was successful, and your
          order is being processed.
        </p>
        <Link href={"/profile"}>
          <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-teal-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300">
            Go to profile
          </button>
        </Link>
        <div className="mt-8">
          <Link href="/" className="text-indigo-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
