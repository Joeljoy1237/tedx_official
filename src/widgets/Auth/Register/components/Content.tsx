import React from "react";
import RegisterForm from "./RegisterForm";
import RegisterContent from "./RegisterContent";

export default function Content() {
  return (
    <div className="w-screen h-screen bg-black-100 flex items-center justify-center overflow-x-hidden">
        <RegisterForm />
        <RegisterContent />
    </div>
  );
}
