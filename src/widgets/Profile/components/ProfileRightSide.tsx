import React, { useRef, useState } from "react";
import { IoTicket } from "react-icons/io5";
import PurchasedTicket from "./PurchasedTicket";
import { IoMdDownload } from "react-icons/io";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useSession } from "next-auth/react";
import Button from "@components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  resetTokenUsed: boolean;
  isAdmin: boolean;
  resetCount: Number;
  tokenUsed: boolean;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  designation: string;
}

interface Group {
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  ticketId: string;
  _id: string;
}

interface Profile {
  user: User;
  group: Group[];
}

interface ProfilePageProps {
  profile: Profile | null;
}

export default function ProfileRightSide({ profile }: ProfilePageProps) {
  const { data: session, status } = useSession();
  const user = session?.user || {};
  const router = useRouter();
  const [currentTicketId, setCurrentTicketId] = useState<string | null>(null);
  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async (buyer: Group) => {
    setCurrentTicketId(buyer.ticketId);

    // Reset the ticket reference after setting the current ticket ID
    const currentTicket = ticketRef.current;

    if (currentTicket) {
      const canvas = await html2canvas(currentTicket, {
        scale: 2,
        useCORS: true,
      });

      const rotatedCanvas = document.createElement("canvas");
      const ctx = rotatedCanvas.getContext("2d");

      if (ctx) {
        rotatedCanvas.width = canvas.height;
        rotatedCanvas.height = canvas.width;

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, rotatedCanvas.width, rotatedCanvas.height);

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
        pdf.save(`${buyer?.firstName}_${buyer.ticketId}.pdf`);
      }
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5 w-full">
        <span className="text-xl md:text-4xl lg:text-4xl break-words">
          Welcome 👋,{" "}
          <span className="font-semibold">
            {profile?.user?.firstName || "User"} {profile?.user?.lastName || ""}
          </span>
        </span>

        <div className="flex gap-2">
          <span className="text-xl">Email:</span>
          <span className="text-xl">{profile?.user?.email || "N/A"}</span>
        </div>
        <div className="flex gap-2 flex-col text-xl md:text-4xl lg:text-4xl break-words">
          <span className="text-xl">Organisation:</span>
          <p className="text-xl">{profile?.user.organisation || "N/A"}</p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center justify-between md:flex-row lg:flex-col gap-5">
          <div className="flex w-full items-center justify-start gap-3 text-3xl font-semibold">
            <span className="flex items-start justify-start gap-3 text-3xl font-semibold">
              <IoTicket className="font-semibold" />
              <div className="flex gap-2">
                <span className="">My</span>
                <span className="text-primary-700 font-semibold">Tickets</span>
              </div>
            </span>
          </div>
          {profile && profile.group.length === 0 ? (
            <div className="flex w-full items-center justify-start">
              <Link href="/get-tickets">
                <Button
                  title="Get your tickets now!"
                  className="bg-primary-700 rounded-[10px] outline-none border-none p-3"
                />
              </Link>
            </div>
          ) : (
            <div className="flex w-full flex-col items-center justify-start md:flex-row lg:flex-row gap-3">
              {profile?.group && (
                <>
                  {profile?.group?.map((buyer, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        downloadPDF(buyer);
                      }}
                      className="bg-primary-700 px-3 py-2 rounded-[10px] w-full md:w-auto lg:w-auto relative"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {buyer?.firstName}{" "}
                        <span className="font-sans">{buyer?.ticketId}</span>
                        <IoMdDownload className="text-white" />
                      </span>
                      {/* Render the ticket off-screen for the current buyer */}
                      {currentTicketId === buyer.ticketId && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-10000px",
                            left: "-10000px",
                            overflow: "hidden",
                          }}
                        >
                          <PurchasedTicket buyer={buyer} ref={ticketRef} />
                        </div>
                      )}
                    </button>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
