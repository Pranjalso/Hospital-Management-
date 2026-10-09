"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-center bg-[#F6F8F8] p-6 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="w-24 h-24 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center mb-8 rotate-12 transition-transform hover:rotate-0">
        <Search size={40} className="text-primary" />
      </div>
      <h1 className="text-8xl font-black text-gray-900 mb-2 tracking-tighter">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Page not found</h2>
      <p className="text-gray-500 max-w-md mx-auto mb-10 font-medium">
        The page you are looking for doesn&apos;t exist or has been moved. 
        Please check the URL or navigate back to the dashboard.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xs sm:max-w-none justify-center">
        <button onClick={() => window.history.back()} className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
          <ArrowLeft size={18} /> Go Back
        </button>
        <Link href="/" className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-md shadow-primary/20">
          <Home size={18} /> Dashboard
        </Link>
      </div>
    </div>
  );
}
