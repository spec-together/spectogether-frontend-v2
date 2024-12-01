import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-animation"></div>
      <div className="text-center relative z-10">
        <h1 className="text-[25rem] font-bold">404</h1>
        <p className="text-2xl font-semibold text-gray-600 mt-4">
          Page Not Found
        </p>
        <p className="text-gray-500 mt-2">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};
