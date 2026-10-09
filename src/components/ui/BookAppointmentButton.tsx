"use client";

import React, { useState } from "react";
import { Plus, X, Calendar, User, Clock, Stethoscope, CheckCircle } from "lucide-react";
import type { Appointment } from "@/app/(dashboard)/appointments/page";

export default function BookAppointmentButton({ onBook }: { onBook?: (app: Appointment) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(false);
      if (onBook) {
        onBook({
          id: "APP-" + Math.floor(Math.random() * 10000),
          time: "11:30 AM",
          patient: "New Walk-in Patient",
          doctor: "Dr. A. Rao",
          dept: "Cardiology",
          source: "Walk-in",
          status: "Booked",
          statusType: "neutral"
        });
      } else {
        showToast("Appointment booked successfully!");
      }
    }, 800);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer"
      >
        <Plus size={16} /> Book Appointment
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-nav/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900">Schedule Appointment</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="book-app-form" onSubmit={handleSubmit} className="space-y-5">
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1"><User size={12}/> Patient Name or UHID</label>
                  <input required type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Search patient..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1"><Calendar size={12}/> Date</label>
                    <input required type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="cursor-pointer block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1"><Clock size={12}/> Time Slot</label>
                    <select required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer">
                      <option value="">Select Time</option>
                      <option>09:00 AM</option>
                      <option>09:30 AM</option>
                      <option>10:00 AM</option>
                      <option>11:30 AM</option>
                      <option>02:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="cursor-pointer block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1"><Stethoscope size={12}/> Doctor</label>
                  <select required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer">
                    <option value="">Select Doctor</option>
                    <option>Dr. A. Rao (Cardiology)</option>
                    <option>Dr. M. Desai (Orthopaedics)</option>
                    <option>Dr. S. Iyer (Gynaecology)</option>
                    <option>Dr. K. Nair (Neurology)</option>
                  </select>
                </div>

              </form>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <button 
                type="button"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                form="book-app-form"
                disabled={isSubmitting}
                className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? "Booking..." : "Confirm Booking"}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Custom Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] bg-gray-900 text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <CheckCircle size={18} className="text-success" />
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}
    </>
  );
}
