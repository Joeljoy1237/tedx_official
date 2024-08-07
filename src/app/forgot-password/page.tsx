// "use client";
// import React from "react";
// import { useRouter } from "next/navigation";

// const Reset = () => {
//   const router = useRouter();
//   const handleReset = async () => {
//     try {
//       const response = await fetch("/api/forgot", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: "joeljoy1237@gmail.com",
//         }),
//       });
//       if (response.ok) {
//         alert("Check your mail");
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   return <button onClick={handleReset}>Click to reset</button>;
// };

// export default Reset;

import ForgotPasswordView from '@widgets/ForgotPassword'
import React from 'react'

export default function page() {
  return (
    <ForgotPasswordView/>
  )
}
