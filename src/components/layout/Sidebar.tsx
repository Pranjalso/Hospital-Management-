"use client";

import React from "react";
import { Plus, LayoutDashboard, Users, CalendarCheck, PhoneCall, Bed, Receipt, Megaphone, Stethoscope, MessageSquareHeart, BarChart2, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", href: "/", icon: <LayoutDashboard size={18} /> },
    { label: "Patients", href: "/patients", icon: <Users size={18} /> },
    { label: "Appointments", href: "/appointments", icon: <CalendarCheck size={18} /> },
    { label: "Leads & Enquiries", href: "/leads", icon: <PhoneCall size={18} /> },
    { label: "Beds / IPD", href: "/beds", icon: <Bed size={18} /> },
    { label: "Billing & TPA", href: "/billing", icon: <Receipt size={18} /> },
    { label: "Campaigns", href: "/campaigns", icon: <Megaphone size={18} /> },
    { label: "Doctor Referrals", href: "/referrals", icon: <Stethoscope size={18} /> },
    { label: "Feedback & NPS", href: "/feedback", icon: <MessageSquareHeart size={18} /> },
    { label: "Reports", href: "/reports", icon: <BarChart2 size={18} /> },
    { label: "Settings", href: "/settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-64 bg-nav text-white flex flex-col shrink-0 h-full overflow-y-auto">
      <div className="p-6 pb-2">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-6 h-6 bg-primary-soft rounded flex items-center justify-center text-nav font-bold text-sm">
            <Plus size={16} />
          </div>
          <span className="font-semibold text-lg tracking-tight">[Hospital] CRM</span>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (pathname?.startsWith('/patient') && item.href.startsWith('/patient'));
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-6 py-2.5 transition-colors ${
                    isActive
                      ? "bg-primary/20 text-white font-medium border-l-4 border-primary"
                      : "text-gray-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
