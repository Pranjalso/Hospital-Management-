"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, FileText, Calendar, Edit3, Trash2, X, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ActionMenu({ patientId, patientName, onDelete }: { patientId: string, patientName: string, onDelete: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
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

  const handleDelete = () => {
    onDelete();
    setShowDeleteModal(false);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowEditModal(false);
    showToast(`Patient ${patientName} details updated successfully!`);
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBookModal(false);
    showToast(`Appointment booked for ${patientName}!`);
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
              href={`/patient/${patientId}`}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-2 cursor-pointer"
            >
              <FileText size={14} /> View Profile
            </Link>
            <button
              onClick={() => { setIsOpen(false); setShowBookModal(true); }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Calendar size={14} /> Book Appointment
            </button>
            <button
              onClick={() => { setIsOpen(false); setShowEditModal(true); }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Edit3 size={14} /> Edit Details
            </button>
            <div className="h-px bg-gray-100 w-full my-1"></div>
            <button
              onClick={() => { setIsOpen(false); setShowDeleteModal(true); }}
              className="w-full text-left px-4 py-2 text-sm text-alert hover:bg-alert/5 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        )}
      </div>

      {/* Modals rendered via portal normally, but inline for simplicity here */}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-nav/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-alert/10 text-alert flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Patient?</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete <strong>{patientName}</strong>? This action cannot be undone and will remove them from the registry.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 text-sm font-medium text-white bg-alert rounded-lg hover:bg-alert/90">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal (Mock) */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-nav/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold">Edit Details: {patientName}</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" defaultValue={patientName} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 text-sm border rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm text-white bg-primary rounded-lg">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Book Appointment Modal (Mock) */}
      {showBookModal && (
        <div className="fixed inset-0 z-50 bg-nav/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold">Book Appointment: {patientName}</h3>
              <button onClick={() => setShowBookModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <form onSubmit={handleBookSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                <input type="date" required className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Doctor</label>
                <select required className="w-full px-3 py-2 border rounded-lg text-sm bg-white">
                  <option value="">Select Doctor</option>
                  <option>Dr. A. Rao</option>
                  <option>Dr. M. Desai</option>
                  <option>Dr. S. Iyer</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setShowBookModal(false)} className="px-4 py-2 text-sm border rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm text-white bg-primary rounded-lg">Confirm Booking</button>
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
