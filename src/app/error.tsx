"use client";

import React, { useEffect } from "react";
import { AlertOctagon, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center bg-canvas p-6 text-center animate-in fade-in duration-300">
      <div className="w-20 h-20 bg-critical/10 rounded-full flex items-center justify-center mb-6">
        <AlertOctagon size={40} className="text-critical" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">Something went wrong</h2>
      <p className="text-gray-500 max-w-md mx-auto mb-8 font-medium">
        We encountered an unexpected error while loading this page. Our engineering team has been notified.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-md"
      >
        <RotateCcw size={18} /> Try again
      </button>
      <p className="mt-8 text-xs font-mono text-gray-400 max-w-lg truncate">
        Error code: {error.digest || 'ERR_UNKNOWN_FAULT'}
      </p>
    </div>
  );
}
