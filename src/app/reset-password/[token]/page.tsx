// "use client";
// import { useParams } from "next/navigation";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// const Reset = () => {
//   const router = useRouter();
//   const params = useParams<{ token: string }>();

//   const handleNewPassword = async () => {
//     try {
//       const response = await fetch("/api/reset/new", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           token: params.token,
//           password: "12345678",
//         }),
//       });
//       if (!response.ok) {
//         throw new Error("Token expired");
//       }
//       router.push("/login");
//     } catch (e) {
//       console.error(e);
//       router.push("/");
//     }
//   };

//   useEffect(() => {
//     async function validateToken() {
//       try {
//         const response = await fetch("/api/reset", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             token: params.token,
//           }),
//         });
//         if (!response.ok) {
//           throw new Error("Token expire");
//         }
//       } catch (e) {
//         console.error(e);
//         router.push("/");
//       }
//     }
//     validateToken();
//   }, []);

//   return <button onClick={handleNewPassword}>Click for new</button>;
// };

// export default Reset;

import ResetPasswordView from "@widgets/ResetPassword";
import React from "react";

export default function page() {
  return <ResetPasswordView />;
}
