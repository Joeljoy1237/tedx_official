import React, { useRef } from "react";
import { IoTicket } from "react-icons/io5";
import PurchasedTicket from "./PurchasedTicket";
import { IoMdDownload } from "react-icons/io";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface User {
  _id?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  organisation?: string | null;
}

interface ProfileData {
  session?: {
    user?: User;
  } | null;
}

export default function ProfileRightSide({ session }: ProfileData) {
  const user = session?.user || {};
  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (ticketRef.current) {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2, // Improves quality
        useCORS: true, // Handles cross-origin images
      });

      // Create a new canvas with swapped dimensions to handle rotation
      const rotatedCanvas = document.createElement("canvas");
      const ctx = rotatedCanvas.getContext("2d");

      if (ctx) {
        rotatedCanvas.width = canvas.height;
        rotatedCanvas.height = canvas.width;

        // Fill the new canvas with a black background
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, rotatedCanvas.width, rotatedCanvas.height);

        // Rotate the canvas context by 90 degrees
        ctx.translate(rotatedCanvas.width / 2, rotatedCanvas.height / 2);
        ctx.rotate((90 * Math.PI) / 180);
        ctx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);

        const imgData = rotatedCanvas.toDataURL("image/png");

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [595.28, 841.89],
        });
        const x = (595.28 - 260) / 2;
        const y = (841 - 750) / 2;
        pdf.setFillColor("#000000");
        pdf.rect(0, 0, 595, 841, "F");
        pdf.addImage(imgData, "PNG", x, y, 260, 750);
        pdf.save("purchased_ticket.pdf");
      }
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <span className="text-4xl">
          Welcome 👋,{" "}
          <span className="font-semibold">
            {user.firstName || "User"} {user.lastName || ""}{" "}
            <span className="text-base font-normal">
              ( {user._id || "N/A"} )
            </span>
          </span>
        </span>
        <div className="flex gap-2">
          <span className="text-xl">Email:</span>
          <span className="text-xl">{user.email || "N/A"}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-xl">Organisation:</span>
          <span className="text-xl">{user.organisation || "N/A"}</span>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row items-center justify-between">
          <div className="">
            <span className="flex items-center justify-start gap-3 text-3xl font-semibold">
              <IoTicket className="font-semibold" />
              <div className="flex gap-2">
                <span className="">My</span>
                <span className="text-primary-700 font-semibold">Tickets</span>
              </div>
            </span>
          </div>
          <div className="flex">
            <button
              onClick={downloadPDF}
              className="bg-primary-700 px-3 py-2 rounded-[10px]"
            >
              <span className="flex items-center justify-center gap-2">
                Download <IoMdDownload className="text-white" />
              </span>
            </button>
          </div>
        </div>
        <div className="w-full flex items-center justify-start">
          <PurchasedTicket ref={ticketRef} />
        </div>
      </div>
    </div>
  );
}
