// components/TedxToast.tsx
import React, { useEffect } from "react";

interface ToastProps {
  type: "success" | "error";
  message: string;
  desc?: string;
  toastId: string;
}

const TedxToast: React.FC<ToastProps> = ({ type, message, toastId, desc }) => {
  const backgroundColor = type === "success" ? "bg-green-700" : "bg-red-700";
  const textColor = type === "success" ? "text-white" : "text-white";

  return (
    <div
      className={`${
        toastId ? "animate-enter" : "animate-leave"
      } max-w-xs w-full ${backgroundColor} shadow-lg rounded-lg pointer-events-auto flex`}
    >
      <div className="flex-1 w-0 p-3">
        <div className="flex items-center">
          <div className="ml-3 flex-1">
            <p className={`text-base font-medium ${textColor}`}>{message}</p>
            <p className={`mt-1 text-sm ${textColor}`}>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TedxToast;
