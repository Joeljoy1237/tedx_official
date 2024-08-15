"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import PurchasedTicket from "./components/Content";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import HeaderView from "@widgets/Header";
import FooterView from "@widgets/Footer";
import Image from "next/image";
import TitleBar from "@components/TitleBar";
import Button from "@components/Button";
import PreLoader from "@components/PreLoader";

interface UserData {
  person: {
    _id: string;
    firstName: string;
    lastName: string;
    organisation: string;
    designation: string;
    ticketId: string;
  };
}

export default function DownloadTicket() {
  const params = useParams<{ id: string; ticketid: string }>(); // Use useParams to get route parameters
  const [data, setData] = useState<UserData>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetch(
          `/api/ticket/${params?.id}/${params?.ticketid}` // Use the parameters dynamically
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const fetchedData = await response.json();
        console.log(fetchedData);
        setData(fetchedData);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    dataFetch();
  }, [params]); // Re-run effect if params change

  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (ticketRef.current) {
      const canvas = await html2canvas(ticketRef.current, {
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
        pdf.save(`${data?.person?.firstName}_${data?.person?.ticketId}.pdf`);
      }
    }
  };

  return (
    <main className="overflow-x-hidden">
      {!isLoaded && <PreLoader />}
      <HeaderView />
      <div className="">
        <Image
          src={"/forgot.png"}
          width={100}
          height={100}
          className="h-screen w-screen object-cover"
          alt=""
        />
        <div className=" pt-[100px] flex flex-col items-center justify-center w-full h-[100vh] absolute top-0 overflow-x-hidden gap-5">
        <TitleBar title={'Hey👋,  '+data?.person?.firstName+' '+data?.person?.lastName}/>
        <TitleBar title="Your Tickets is" titleSecond="Ready for download"/>
          <Button title="Download" className="bg-primary-700 rounded-[10px] outline-none border-none p-4" onClick={downloadPDF}/>
          {data && (
            <div
              className=""
              style={{
                position: "absolute",
                top: "-1000px",
                left: "-1000px",
                overflowX: "hidden",
              }}
            >
              <PurchasedTicket buyer={data} ref={ticketRef} />
            </div>
          )}
        </div>
      </div>
      <FooterView />
    </main>
  );
}
