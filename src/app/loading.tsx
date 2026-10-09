import React from "react";

export default function Loading() {
  return (
    <div className="flex-1 w-full h-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 bg-canvas">
      <div className="relative flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 rounded-full border-4 border-gray-100 border-t-primary animate-spin"></div>
        {/* Inner dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary/20 rounded-full"></div>
        <h3 className="mt-6 text-gray-900 font-bold text-lg animate-pulse">Loading Workspace...</h3>
        <p className="text-gray-500 text-sm font-medium mt-1">Preparing your hospital dashboard</p>
      </div>
    </div>
  );
}
