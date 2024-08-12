"use client";
import React, { useEffect ,useState} from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {

  const { data: session,status} = useSession();
  const [profile, setProfile] = useState({});

  useEffect(() => {

    const fetchProfile = async () => {
      try {
        
        const response = await fetch("/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: session?.user._id,
          }),
        });
        const data = await response.json();
        setProfile(data);
      
        
      } catch (err) {
        console.error(err);
      }
    };



    if (session?.user._id) {
      fetchProfile();
    }
  }, [session?.user._id])

  return (
    <div className="min-h-[100vh] pt-[100px] flex flex-col items-center justify-center px-[5vw] gap-3">
      <div className="flex w-full">
        <div className="flex-["></div>
        <div className=""></div>
      </div>
    </div>
  );
}
