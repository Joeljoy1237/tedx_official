// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { useRouter } from "next/navigation";

// interface Data {
//   firstName?: string;
//   lastName?: string;
//   checkedIn?: boolean;
//   // Add other fields based on your API response structure
// }

// const QrCode = () => {
//   const router = useRouter();
//   const params = useParams();
//   const [data, setData] = useState<Data>({});
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const handleValidation = async () => {
//       try {

//         const response = await fetch(
//           `/api/admin/qr/validate/${params.ticketId}`
//         );

//         if (!response.ok) {
//           throw new Error("Validation failed");
//         }

//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error("Error during validation:", error);
//         setError("Validation failed. Please try again.");
//       }
//     };

//     if (params.ticketId) {
//       handleValidation();
//     }
//   }, [params.ticketId]);

//   const handleCheckIn = async () => {
//     try {
//       const response = await fetch(`/api/admin/qr/checkIn/${params.ticketId}`);

//       if (!response.ok) {
//         throw new Error("Check-In failed");
//       }

//       const res = await response.json();
//       router.refresh();
//     } catch (error) {
//       console.error("Error during check-in:", error);
//       setError("Check-In failed. Please try again.");
//     }
//   };

//   return (
//     <div>
//       {error && <div style={{ color: "red" }}>{error}</div>}
//       <div>
//         Name: {data.firstName} {data.lastName}
//       </div>
//       <div>Checked In: {"" + data.checkedIn}</div>
//       {!data.checkedIn && <button onClick={handleCheckIn}>Check In</button>}
//     </div>
//   );
// };

// export default QrCode;


import CheckIn from '@widgets/Admin/CheckIn'
import React from 'react'

export default function page() {
  return (
    <CheckIn/>
  )
}
