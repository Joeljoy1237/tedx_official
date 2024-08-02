import React from "react";

export default function Form() {
  return (
    <div className="flex-1 flex-col gap-2 flex rounded-lg p-6 border border-black-300">
      <div className="flex flex-col gap-1">
        <span className="text-2xl capitalize font-bold text-primary">
          Give us a message
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
          rows={5}
          id=""
        ></textarea>
      </div>
      <div className="flex gap-2 flex-col md:flex-row lg:flex-row">
        <input
          type="text"
          placeholder="Name"
          className="flex-1 rounded-lg p-3 w-[100%] outline-none bg-black-200"
        />
        <input
          type="text"
          placeholder="Email"
          className="flex-1 rounded-lg p-3 w-[100%] outline-none bg-black-200"
        />
        <input
          type="text"
          placeholder="Phone"
          className="flex-1 rounded-lg p-3 w-[100%] outline-none bg-black-200"
        />
      </div>
      <div className="flex gap-2">
        <button className="flex font-medium bg-primary text-primary-50 bg-primary-600 px-6 py-2 mt-2 items-center justify-center rounded-lg w-full md:w-auto lg:w-auto">
          Submit Message
        </button>
      </div>
    </div>
  );
}
