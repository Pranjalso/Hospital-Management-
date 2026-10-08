"use client";

import React, { useState } from "react";
import { Plus, X, Calendar, User, Phone, Mail, Stethoscope } from "lucide-react";

export default function NewRegistrationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(false);
      alert("Patient registered successfully!");
    }, 1000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        <Plus size={16} /> New registration
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-nav/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900">New Patient Registration</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              <form id="registration-form" onSubmit={handleSubmit} className="space-y-6">
                
                {/* Personal Details */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User size={16} className="text-primary" /> Personal Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">First Name *</label>
                      <input required type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. Suresh" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. Gowda" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Date of Birth *</label>
                      <div className="relative">
                        <Calendar size={14} className="absolute left-3 top-2.5 text-gray-400" />
                        <input required type="date" className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                      </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Gender *</label>
                      <select required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
                        <option value="">Select gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-100 w-full"></div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Phone size={16} className="text-primary" /> Contact Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input required type="tel" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="+91" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                      <input type="email" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="email@example.com" />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-100 w-full"></div>

                {/* Visit Details */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Stethoscope size={16} className="text-primary" /> Visit Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
                        <option>General Medicine</option>
                        <option>Cardiology</option>
                        <option>Orthopaedics</option>
                        <option>Gynaecology</option>
                        <option>Paediatrics</option>
                        <option>Neurology</option>
                      </select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Source</label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
                        <option>Walk-in</option>
                        <option>Website</option>
                        <option>WhatsApp</option>
                        <option>Referral</option>
                        <option>Insurance/TPA</option>
                      </select>
                    </div>
                  </div>
                </div>

              </form>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <button 
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                form="registration-form"
                disabled={isSubmitting}
                className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Registering...
                  </>
                ) : (
                  "Complete Registration"
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
