"use client";
import TitleBar from "@components/TitleBar";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../Firebase/firebaseConfig";

interface EventData {
  name: string;
  role: string;
  team: string;
  linkedinUrl: string;
  profileImg: string;
}

export default function CreatePage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [data, setData] = useState<EventData>({
    name: "",
    role: "",
    team: "",
    linkedinUrl: "",
    profileImg: ""
  });

  const [toast, setToast] = useState<any>(null);

  useEffect(() => {
    // Dynamically import react-hot-toast
    import("react-hot-toast").then((module) => setToast(() => module.toast));
  }, []);

  const eventsCollectionRef = collection(db, "team");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(imageUrl);
    }
  };

  const handleImageUpload = async () => {
    setIsLoading(true);
    if (file) {
      try {
        const storageRef = ref(storage, `team/TEDxCCET_OFFICIAL_TEAM_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        setIsUploaded(true);
        setData((prevData) => ({
          ...prevData,
          profileImg: downloadURL,
        }));
        toast.success("Image uploaded successfully");
      } catch (error) {
        toast.error("Failed to upload image");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const createEvent = async () => {
    try {
      await addDoc(eventsCollectionRef, data);
      toast.success("User created successfully!");
      // Clear form data
      setData({
        name: "",
        role: "",
        linkedinUrl: "",
        team: "",
        profileImg: ""
      });
      setFile(null);
      setPreviewUrl(null);
      setIsUploaded(false);
    } catch (error: any) {
      toast.error(`Failed to create event. Error: ${error.message}`);
    }
  };

  return (
    <div className="px-[5vw] py-[2rem] pt-[100px] flex items-center justify-center flex-col">
      <div className="flex flex-col gap-8 ic justify-center w-[60vw]">
        <TitleBar title="Add user details" />
        <div className="flex-1 flex gap-4 flex-col md:flex-row lg:flex-row">
          <div className="flex border gap-2 flex-col-reverse border-breakerDay-300 rounded-[8px] w-full items-center justify-center max-h-[60vh]">
            {!isUploaded && (
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*" // Accepts only image files
              />
            )}
            {previewUrl && (
              <div className="flex flex-col gap-3 max-h-[40vh] w-auto">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  className="mt-4 rounded-md shadow-md max-h-[30vh] w-auto"
                  height={300}
                  width={300}
                />
                {!isUploaded ? (
                  <button
                    onClick={handleImageUpload}
                    disabled={isLoading}
                    className="w-full p-3 rounded-[8px] bg-primary-500 text-white outline-none border-none"
                  >
                    {isLoading ? "Uploading" : "Upload Image"}
                  </button>
                ) : (
                  <button className="w-full p-3 rounded-[8px] border-2 border-breakerDay-600 text-breakerDay-600 outline-none">
                    Uploaded
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="flex w-full gap-4 flex-col md:flex-row lg:flex-row">
            <div className="flex flex-col w-full gap-4">
              <div className="w-full">
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleInputChange}
                  className="px-1 bg-black-300 py-2 rounded-[8px] outline-none w-full"
                  placeholder="Full name"
                />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  name="team"
                  value={data.team}
                  onChange={handleInputChange}
                  className="px-1 bg-black-300 py-2 rounded-[8px] outline-none w-full"
                  placeholder="Team name"
                />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  name="role"
                  value={data.role}
                  onChange={handleInputChange}
                  className="px-1 bg-black-300 py-2 rounded-[8px] outline-none w-full"
                  placeholder="Role"
                />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  name="linkedinUrl"
                  value={data.linkedinUrl}
                  onChange={handleInputChange}
                  className="px-1 bg-black-300 py-2 rounded-[8px] outline-none w-full"
                  placeholder="Linkedin url"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center">
          <button
            onClick={() => {
              if (isUploaded) {
                createEvent();
              } else {
                toast.error("Please upload an image");
              }
            }}
            className="w-full py-3 rounded-[10px] items-center justify-center flex border-none text-white bg-primary-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
