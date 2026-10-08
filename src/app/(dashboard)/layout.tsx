import React, { Suspense } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-canvas font-sans text-gray-900">
      {/* Sidebar with Suspense to resolve usePathname SSR bailout */}
      <Suspense fallback={<div className="w-64 bg-nav shrink-0 h-full border-r border-nav/20" />}>
        <Sidebar />
      </Suspense>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-canvas">
        {children}
      </main>
    </div>
  );
}
