import React from "react";
import HeaderView from "@widgets/Header";
const PageNotFound = () => {
  return (
    <>
      <HeaderView />

      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
        {/* Main Container */}
        <div className="text-center max-w-md">
          {/* 404 Heading */}
          <h1 className="text-9xl font-bold text-red-500">404</h1>
          <h3 className="text-3xl font-semibold mt-4">Page Not Found</h3>
          <p className="text-gray-400 mt-2 mb-8">
            Sorry, the page you are looking for does not exist.
          </p>

          {/* Go Back Button */}
          <a
            href="/"
            className="inline-block bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-primary-800 transition duration-300 ease-in-out"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
