"use client"

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Define your types
interface TicketProps {
  data: any; // Use the appropriate type instead of `any`
}

interface GroupMember {
  firstName: string;
  lastName: string;
  organisation: string;
  email: string;
}

// Function to generate PDF
export const generatePDF = async ({ data }: TicketProps) => {
  const input = document.getElementById('ticket'); // ID of the ticket component

  if (!input) {
    console.error('Ticket component not found!');
    return;
  }

  const canvas = await html2canvas(input, {
    useCORS: true,
  });
  const imgData = canvas.toDataURL('image/png');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height],
  });

  doc.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);

  return doc.output('blob'); // Return PDF as Blob
};

// Usage example
const ticketData = { /* your ticket data here */ };
const pdfBlob = await generatePDF({ data: ticketData });

// Example function to handle GroupMember
const handleGroupMember = (member: GroupMember) => {
  // Do something with the group member data
};
