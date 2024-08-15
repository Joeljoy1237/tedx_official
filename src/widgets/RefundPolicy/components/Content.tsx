import TitleBar from "@components/TitleBar";
import Link from "next/link";
import React from "react";

export default function Content() {
  return (
    <div className="pt-[100px] px-[5vw] flex flex-col gap-5 pb-8">
      <TitleBar title="Refund" titleSecond="Policy" />
     <span className="font-bold text-2xl"> No Refunds</span> <br /> All ticket purchases are final and non-refundable. Once a
      payment is processed, we do not offer refunds for any reason, including
      but not limited to changes in personal circumstances or inability to
      attend the event. Transfer of Tickets If you are unable to attend the
      event, you may transfer your ticket to a friend or colleague. To transfer
      your ticket, please follow these steps:
      <span className="">
        1. Contact Us: Email us at{" "}
        <Link
          href={"https://tedxccet.in/"}
          className="text-primary-700 font-semibold"
        >
          {" "}
          https://tedxccet.in/
        </Link>{" "}
        with your request to transfer the ticket. Please include your name, the
        email address used for the purchase, and the name and email address of
        the person to whom you wish to transfer the ticket.
      </span>
      <span className="">
        2. Confirmation: Once we receive your request, we will update our
        records and send a confirmation email to the new ticket holder.
      </span>
      <span className="">
        3. Deadline: Ticket transfer requests must be made at least 48 hours
        prior to the event.
      </span>
      <span className="text-xl font-semibold">Event Changes</span>
      TEDxCCET reserves the right to make changes to the event schedule, venue,
      or speakers. In the unlikely event of a cancellation, we will notify
      ticket holders via email and provide information about rescheduled dates
      or alternative arrangements.
      <span className="text-xl font-semibold">Contact Information</span>
      <span className="">
        If you have any questions about these Terms, please contact us at
        <Link
          href="mailto:tedxsupport@carmelcet.in"
          className="text-primary-700 font-semibold"
        >
          {" "}
          tedxsupport@carmelcet.in
        </Link>
      </span>{" "}
    </div>
  );
}
