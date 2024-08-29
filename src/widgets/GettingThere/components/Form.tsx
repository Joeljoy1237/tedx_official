"use client";
import { useState } from "react";
import showTedxToast from "@components/showTedxToast";

export default function Form() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [isSubmitting, setIssubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    setIssubmitting(true);
    e.preventDefault();
    try {
      const response = await fetch("/api/contactus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          message: message,
          email: email,
          phone: phone,
        }),
        cache: "no-store",
      });
      const data = await response.json();

      if (response.ok) {
        showTedxToast({
          type: "success",
          message: data.message, // Show the success message from the response
          desc: data.desc,
        });
        setMessage("");
        setEmail("");
        setPhone("")
        setName('');
      } else {
        showTedxToast({
          type: "error",
          message: data.message,
          desc: data.desc,
        });
      }
    } catch (err) {
      console.error(err);
    }
    setIssubmitting(false);
  };

  return (
    <div className="flex-1 flex-col gap-2 flex rounded-lg p-6 border border-black-300">
      <div className="flex flex-col gap-1">
        <span className="text-2xl capitalize font-bold text-primary">
          Send us a message
        </span>
        <span className="font-medium text-font-secondary">
          Your email address will not be published. Required fields are marked *
        </span>
      </div>
      <div className="">
        <textarea
          name="message"
          className="w-[100%] p-2 rounded-lg outline-none bg-black-200"
          placeholder="Message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          rows={5}
          id=""
        ></textarea>
      </div>
      <div className="flex gap-2 flex-col md:flex-row lg:flex-row">
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name"
          className="flex-1 rounded-lg p-3 w-[100%] outline-none bg-black-200"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="flex-1 rounded-lg p-3 w-[100%] outline-none bg-black-200"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          placeholder="Phone"
          className="flex-1 rounded-lg p-3 w-[100%] outline-none bg-black-200"
        />
      </div>
      <div className="flex gap-2">
        <button
          disabled={isSubmitting}
          onClick={handleSubmit}
          className="flex font-medium bg-primary text-primary-50 bg-primary-600 px-6 py-2 mt-2 items-center justify-center rounded-lg w-full md:w-auto lg:w-auto"
        >
          {!isSubmitting ? "Submit Message" : "Submitting..."}
        </button>
      </div>
    </div>
  );
}
