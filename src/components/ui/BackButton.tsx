"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ label = "Back" }: { label?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
    >
      <ArrowLeft size={16} /> {label}
    </button>
  );
}
