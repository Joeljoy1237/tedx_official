"use client";

import PreLoader from "@components/PreLoader";
import FooterView from "@widgets/Footer";
import HeaderView from "@widgets/Header";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For redirecting
import { useSession } from "next-auth/react"; // Assuming you're using NextAuth for authentication
import showTedxToast from "@components/showTedxToast";

export default function SupportView() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { status, data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobNo, setMobNo] = useState(""); // Correctly defined mobNo
  const [subject, setSubject] = useState(""); // Correctly defined subject
  const [issue, setIssue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to login if not authenticated
    } else {
      setName(session?.user?.firstName + " " + session?.user?.lastName || "");
      setEmail(session?.user?.email || "");
      setMobNo(session?.user?.mobile || "")
    }
  }, [status, router, session]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/support-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          mobNo, // Include mobNo in the request body
          subject, // Include subject in the request body
          issue,
          userId: session?.user?._id, // Include userId in the request body
        }),
      });

      const result = await response.json();

      if (response.ok) {
        showTedxToast({
          type: "success",
          message: result?.message,
          desc: result?.desc,
        });
        setName("");
        setEmail("");
        setMobNo(""); // Clear mobNo
        setSubject(""); // Clear subject
        setIssue("");
        router.push("/profile/support-tickets");
      } else {
        showTedxToast({
          type: "error",
          message: result?.message,
          desc: result?.desc,
        });
      }
    } catch (error) {
      showTedxToast({
        type: "error",
        message: "Something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      {!isLoaded && <PreLoader />}
      <HeaderView />
      <div className="flex pt-[120px] flex-col items-center justify-center gap-5 py-[5vh] min-h-screen px-[5vw] bg-[#000000] text-white">
        <span className="text-2xl font-bold">
          Need Help with Ticket Purchasing?
        </span>
        <span className="text-lg">
          If you encounter any issues or have questions regarding ticket
          purchases for TEDxCCET, our support team is here to assist you. Please
          fill out the form below to submit a support ticket:
        </span>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md rounded-lg"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="p-2 border-[1px] border-primary-700 rounded bg-black-200 text-white"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            className="p-2 border-[1px] border-primary-700 rounded bg-black-200 text-white"
            required
          />
          <input
            type="text"
            value={mobNo}
            onChange={(e) => setMobNo(e.target.value)}
            placeholder="Your Mobile Number"
            className="p-2 border-[1px] border-primary-700 rounded bg-black-200 text-white"
            required
          />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="p-2 border-[1px] border-primary-700 rounded bg-black-200 text-white"
            required
          />
          <textarea
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="Describe your issue"
            className="p-2 border-[1px] border-primary-700 rounded bg-black-200 text-white"
            rows={4}
            required
          />
          <button
            type="submit"
            className={`p-2 rounded text-white ${isSubmitting ? "bg-blue-300" : "bg-primary-700"} ${isSubmitting ? "cursor-not-allowed" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Ticket"}
          </button>
        </form>

        <span className="mt-4">
          If you prefer to reach us directly, please email us at:{" "}
          <Link
            href={"mailto:tedxsupport@carmelcet.in"}
            className="text-primary-700 hover:underline font-semibold"
          >
            tedxsupport@carmelcet.in
          </Link>
        </span>

        <span className="mt-4">
          Our dedicated team is committed to providing you with prompt and
          effective support. We're here to ensure your ticket buying experience
          is smooth and hassle-free.
        </span>

        <span className="mt-4">
          Thank you for your interest in TEDxCCET. We look forward to welcoming
          you to our event!
        </span>
      </div>
      <FooterView />
    </main>
  );
}
