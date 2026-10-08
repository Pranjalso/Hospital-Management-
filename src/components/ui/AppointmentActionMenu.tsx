"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, FileText, Calendar, Trash2, X, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function AppointmentActionMenu({ appointmentId, patientName, onCancel }: { appointmentId: string, patientName: string, onCancel: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCancel = () => {
    onCancel();
    setShowCancelModal(false);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRescheduleModal(false);
    showToast(`Appointment for ${patientName} rescheduled successfully!`);
  };

  return (
    <>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-primary transition-colors p-1.5 rounded-md hover:bg-primary/10 cursor-pointer"
        >
          <MoreHorizontal size={18} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-40 py-1 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
            <Link
              href={`/patient/SG-1234`}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-2 cursor-pointer"
            >
              <FileText size={14} /> View Profile
            </Link>
            <button
              onClick={() => { setIsOpen(false); setShowRescheduleModal(true); }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Clock size={14} /> Reschedule
            </button>
            <div className="h-px bg-gray-100 w-full my-1"></div>
            <button
              onClick={() => { setIsOpen(false); setShowCancelModal(true); }}
              className="w-full text-left px-4 py-2 text-sm text-alert hover:bg-alert/5 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Trash2 size={14} /> Cancel Visit
            </button>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 bg-nav/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-alert/10 text-alert flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Cancel Appointment?</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to cancel the appointment for <strong>{patientName}</strong>?</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setShowCancelModal(false)} className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Keep it</button>
              <button onClick={handleCancel} className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-alert rounded-lg hover:bg-alert/90">Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal (Mock) */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 bg-nav/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold">Reschedule: {patientName}</h3>
              <button onClick={() => setShowRescheduleModal(false)} className="cursor-pointer text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <form onSubmit={handleRescheduleSubmit} className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1 cursor-pointer">New Date</label>
                  <input type="date" required className="w-full px-3 py-2 border rounded-lg text-sm cursor-pointer" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1 cursor-pointer">New Time Slot</label>
                  <select required className="cursor-pointer w-full px-3 py-2 border rounded-lg text-sm bg-white">
                    <option value="">Select Time</option>
                    <option>09:00 AM</option>
                    <option>09:30 AM</option>
                    <option>10:00 AM</option>
                    <option>11:30 AM</option>
                    <option>02:00 PM</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setShowRescheduleModal(false)} className="cursor-pointer px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="cursor-pointer px-4 py-2 text-sm text-white bg-primary rounded-lg hover:bg-primary/90">Save New Time</button>
              </div>
            </form>
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
