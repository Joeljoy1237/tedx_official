"use client"

import React, { useEffect, useState } from "react";
import ResetPassword from "./components/ResetPassword";
import { useParams, useRouter } from "next/navigation";
import PreLoader from "@components/PreLoader";
import showTedxToast from "@components/showTedxToast";
import { useSession } from "next-auth/react";

export default function ResetPasswordView() {
  const router = useRouter();
  const [password, setNewPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const params = useParams<{ token: string }>();

  const { data: session, status } = useSession();

  useEffect(() => {
    async function validateToken() {
      if (status === "authenticated") {
        // Redirect to home page
        router.push("/");
      }
      try {
        const response = await fetch("/api/reset/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: params.token,
          }),
        });
  
        // Check if the response is OK (status code 200)
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Token validation failed", {
            cause: errorData.desc,
          });
        }
        setIsLoaded(true)
      } catch (e:any) {
        console.error("Token validation error:", e);
        showTedxToast({
          type: "error",
          message: e.message,
          desc: e.cause,
        });
        router.push("/"); // Redirect to home or a relevant page on error
      }
    }
  
    validateToken();
  }, [params?.token,status, session, router]);
  return (
    <main>
      {!isLoaded && <PreLoader />}
      <ResetPassword />
    </main>
  );
}
