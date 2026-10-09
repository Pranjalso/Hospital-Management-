"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Calendar as CalendarIcon, Clock, Filter, User } from "lucide-react";
import BranchDropdown from "@/components/ui/BranchDropdown";
import BookAppointmentButton from "@/components/ui/BookAppointmentButton";
import AppointmentActionMenu from "@/components/ui/AppointmentActionMenu";
import Link from "next/link";

export type Appointment = {
  id: string;
  time: string;
  patient: string;
  doctor: string;
  dept: string;
  source: string;
  status: string;
  statusType: "primary" | "success" | "warning" | "neutral" | "alert";
};

const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: "APP-101", time: "09:30 AM", patient: "Ramesh Kulkarni", doctor: "Dr. A. Rao", dept: "Cardiology", source: "App", status: "In consult", statusType: "primary" as const },
  { id: "APP-102", time: "09:45 AM", patient: "Fatima Shaikh", doctor: "Dr. S. Iyer", dept: "Gynaecology", source: "WhatsApp", status: "Checked in", statusType: "success" as const },
  { id: "APP-103", time: "10:00 AM", patient: "Arjun Patil", doctor: "Dr. M. Desai", dept: "Orthopaedics", source: "Referral", status: "Waiting 18m", statusType: "warning" as const },
  { id: "APP-104", time: "10:15 AM", patient: "Lakshmi N.", doctor: "Dr. A. Rao", dept: "Cardiology", source: "Call centre", status: "Booked", statusType: "neutral" as const },
  { id: "APP-105", time: "10:30 AM", patient: "Vikram Joshi", doctor: "Dr. K. Nair", dept: "Neurology", source: "Website", status: "No-show", statusType: "alert" as const },
  { id: "APP-106", time: "11:00 AM", patient: "Sarah Lee", doctor: "Dr. A. Rao", dept: "Cardiology", source: "Walk-in", status: "Booked", statusType: "neutral" as const },
  { id: "APP-107", time: "11:15 AM", patient: "Mohammed Ali", doctor: "Dr. M. Desai", dept: "Orthopaedics", source: "App", status: "Booked", statusType: "neutral" as const },
  { id: "APP-108", time: "12:00 PM", patient: "Priya Singh", doctor: "Dr. S. Iyer", dept: "Gynaecology", source: "Referral", status: "Booked", statusType: "neutral" as const },
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredApps = appointments.filter(a => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = a.patient.toLowerCase().includes(query) || a.doctor.toLowerCase().includes(query);
    const matchesStatus = statusFilter === "All" || a.status.includes(statusFilter) || (statusFilter === "Booked" && a.status === "Booked");
    return matchesSearch && matchesStatus;
  });

  const handleBookNew = (newApp: Appointment) => {
    setAppointments(prev => {
      return [newApp, ...prev];
    });
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const cycleStatus = (id: string) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === id) {
        if (a.status === "Booked") return { ...a, status: "Checked in", statusType: "success" };
        if (a.status === "Checked in") return { ...a, status: "Waiting", statusType: "warning" };
        if (a.status.startsWith("Waiting")) return { ...a, status: "In consult", statusType: "primary" };
        if (a.status === "In consult") return { ...a, status: "Completed", statusType: "neutral" };
        return { ...a, status: "Booked", statusType: "neutral" }; // loop back
      }
      return a;
    }));
  };

  return (
    <>
      <header className="flex flex-col md:flex-row md:items-center justify-between px-4 md:px-8 py-4 md:py-6 bg-canvas shrink-0 gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Appointments Schedule</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and schedule patient visits for today</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-4 w-full md:w-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patient or doctor..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-full text-sm w-full md:w-64 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <BranchDropdown />
          <BookAppointmentButton onBook={handleBookNew} />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-4 md:pb-8">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between px-4 md:px-6 py-4 border-b border-gray-100 bg-gray-50 gap-4">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2 cursor-pointer text-gray-900 font-semibold border-b-2 border-primary pb-1">
                <Clock size={16} className="text-primary"/> List View
              </div>
              <div className="flex items-center gap-2 cursor-not-allowed text-gray-400 font-medium pb-1">
                <CalendarIcon size={16}/> Calendar View (Coming Soon)
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
                <CalendarIcon size={14}/> Today, 8 Oct
              </span>
              <div className="h-4 w-px bg-gray-300 mx-2"></div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Booked">Booked</option>
                <option value="Checked in">Checked in</option>
                <option value="Waiting">Waiting</option>
                <option value="In consult">In consult</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto flex-1 p-2">
            <table className="w-full text-sm text-left">
              <thead className="bg-white border-b border-gray-100">
                <tr className="text-gray-500">
                  <th className="px-6 py-3 font-medium">Time</th>
                  <th className="px-6 py-3 font-medium">Patient</th>
                  <th className="px-6 py-3 font-medium">Doctor</th>
                  <th className="px-6 py-3 font-medium">Department</th>
                  <th className="px-6 py-3 font-medium">Source</th>
                  <th className="px-6 py-3 font-medium">Status (Click to update)</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">No appointments found.</td>
                  </tr>
                ) : (
                  filteredApps.map(app => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                      <td className="px-6 py-4 font-semibold text-gray-900">{app.time}</td>
                      <td className="px-6 py-4">
                        <Link href={`/patient/SG-1234`} className="font-semibold text-gray-900 hover:text-primary transition-colors flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <User size={14}/>
                          </div>
                          {app.patient}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-medium">{app.doctor}</td>
                      <td className="px-6 py-4 text-gray-600">{app.dept}</td>
                      <td className="px-6 py-4 text-gray-600">{app.source}</td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => cycleStatus(app.id)}
                          className={`inline-block px-3 py-1 rounded-full text-xs cursor-pointer hover:opacity-80 transition-opacity font-semibold ${
                            app.statusType === 'primary' ? 'bg-primary/10 text-primary' :
                            app.statusType === 'success' ? 'bg-success/10 text-success' :
                            app.statusType === 'warning' ? 'bg-warning/10 text-warning' :
                            app.statusType === 'alert' ? 'bg-alert/10 text-alert' :
                            'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {app.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <AppointmentActionMenu 
                           appointmentId={app.id} 
                           patientName={app.patient} 
                           onCancel={() => handleCancelAppointment(app.id)} 
                         />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </>
  );
}
