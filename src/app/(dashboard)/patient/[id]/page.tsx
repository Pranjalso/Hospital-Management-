"use client";

import React from "react";
import { Search, ChevronDown, Plus, Phone, MessageSquare, Calendar, Check, X } from "lucide-react";
import BackButton from "@/components/ui/BackButton";
import NewRegistrationButton from "@/components/ui/NewRegistrationButton";
import BranchDropdown from "@/components/ui/BranchDropdown";
import BookAppointmentButton from "@/components/ui/BookAppointmentButton";

export default function Patient360() {
  const [activeTab, setActiveTab] = React.useState('Overview');
  const tabs = ['Overview', 'Visits', 'Reports', 'Billing & claims', 'Communication', 'Family', 'Documents', 'Audit log'];

  return (
    <>
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6 bg-canvas shrink-0">
          <div>
            <BackButton label="Back to Patients" />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search patient, UHID, phone..."
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-full text-sm w-64 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <BranchDropdown />

            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
              Alerts &middot; 4
            </button>

            <NewRegistrationButton />
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          
          {/* Patient Header Card */}
          <div className="bg-white rounded-t-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary-soft/30 rounded-full flex items-center justify-center text-primary font-bold text-xl shrink-0">
                  SG
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl font-bold text-gray-900">Suresh Gowda</h1>
                    <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded text-xs font-semibold">IPD &middot; Ortho Ward 2, Bed 14</span>
                    <span className="bg-warning/10 text-warning px-2.5 py-0.5 rounded text-xs font-semibold">Insurance: Star Health</span>
                  </div>
                  <div className="text-sm text-gray-500 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span>M &middot; 61 y</span>
                    <span>&middot;</span>
                    <span>UHID BLR-0042871</span>
                    <span>&middot;</span>
                    <span className="flex items-center gap-1">ABHA linked <Check size={14} className="text-success" /></span>
                    <span>&middot;</span>
                    <span>+91 98xxxx4410</span>
                    <span>&middot;</span>
                    <span>Kannada, English</span>
                    <span>&middot;</span>
                    <span className="flex items-center gap-1">Consent: SMS <Check size={14} className="text-success" /> WhatsApp <Check size={14} className="text-success" /> Email <X size={14} className="text-gray-400" /></span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a 
                  href="tel:+919800000000"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Phone size={16} /> Call
                </a>
                <a 
                  href="https://wa.me/919800000000"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <MessageSquare size={16} /> WhatsApp
                </a>
                <div className="[&>button]:rounded-md">
                  <BookAppointmentButton />
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="flex gap-6 mt-8 border-b border-gray-100">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          {activeTab === 'Overview' ? (
            <div className="grid grid-cols-12 gap-6 mt-6 animate-in fade-in duration-300">
            
            {/* Left Column - Timeline */}
            <div className="col-span-12 lg:col-span-5 bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-6">Journey timeline</h3>
              
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200">
                
                <TimelineItem date="12 Sep" content='Enquiry via Google Ads — "knee pain, TKR cost"' />
                <TimelineItem date="13 Sep" content="Call centre: quote sent (TKR package)" />
                <TimelineItem date="16 Sep" content="OPD — Dr. M. Desai, Orthopaedics" />
                <TimelineItem date="22 Sep" content="Pre-auth approved · ₹2.4L" />
                <TimelineItem date="5 Oct" content="Admitted · Total knee replacement" />
                <TimelineItem date="Today" content="Discharge planned 4 pm · physio plan set" isHighlighted />
                <TimelineItem date="11 Oct" content="Day-3 follow-up call (auto task)" isFuture />
                <TimelineItem date="19 Oct" content="Review OPD + suture removal" isFuture />

              </div>
            </div>

            {/* Right Column - Cards */}
            <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-4 auto-rows-max">
              
              {/* Clinical Snapshot */}
              <div className="col-span-2 md:col-span-1 bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Clinical snapshot <span className="text-gray-400 font-normal">· from HIS</span></h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-500">Allergies:</span> <span className="font-semibold">Penicillin</span></div>
                  <div><span className="text-gray-500">Conditions:</span> Type 2 diabetes, hypertension</div>
                  <div><span className="text-gray-500">Last HbA1c:</span> 7.1% (2 Oct)</div>
                  <div><span className="text-gray-500">Primary doctor:</span> Dr. M. Desai</div>
                </div>
              </div>

              {/* Open Tasks */}
              <div className="col-span-2 md:col-span-1 bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Open tasks · 3</h3>
                <div className="space-y-3">
                  <TaskItem label="Discharge summary to WhatsApp" />
                  <TaskItem label="Collect patient share at discharge" />
                  <TaskItem label="Day-3 follow-up call · 11 Oct" />
                </div>
              </div>

              {/* Billing */}
              <div className="col-span-2 md:col-span-1 bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Billing</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Estimate</span> <span>₹2,85,000</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Pre-auth approved</span> <span>₹2,40,000</span></div>
                  <div className="flex justify-between font-semibold"><span className="text-gray-700">Patient share due</span> <span className="text-alert">₹45,000</span></div>
                </div>
                <div className="mt-4">
                  <span className="bg-warning/20 text-warning px-2 py-1 rounded text-xs font-semibold">Final claim: to submit</span>
                </div>
              </div>

              {/* LTV */}
              <div className="col-span-2 md:col-span-1 bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Lifetime value & relationship</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Visits (3 yrs)</span> <span className="font-semibold">9</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Lifetime billing</span> <span className="font-semibold">₹3.6L</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Referred by</span> <span className="font-semibold">Dr. P. Kulkarni (GP)</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Last NPS</span> <span className="font-semibold">9 · Promoter</span></div>
                </div>
              </div>

              {/* Family */}
              <div className="col-span-2 bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Family</h3>
                <p className="text-sm text-gray-700">
                  Shobha Gowda (wife) &middot; Kavya Gowda (daughter, caregiver)
                </p>
              </div>

            </div>
          </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 bg-white rounded-xl border border-gray-100 shadow-sm mt-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-gray-700 mb-2">{activeTab}</h2>
              <p className="text-gray-500 text-sm">No records found for this module yet.</p>
            </div>
          )}
        </div>
    </>
  );
}

function TimelineItem({ date, content, isHighlighted = false, isFuture = false }: { date: string, content: string, isHighlighted?: boolean, isFuture?: boolean }) {
  return (
    <div className="relative flex items-start gap-4">
      {/* Timeline dot */}
      <div className={`absolute left-0 mt-1.5 w-3 h-3 rounded-full border-2 border-white z-10 ${isHighlighted ? 'bg-primary' : isFuture ? 'bg-gray-300' : 'bg-primary-soft'}`}></div>
      <div className="pl-6 w-full flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
        <span className={`text-xs font-semibold w-16 shrink-0 ${isHighlighted ? 'text-primary' : isFuture ? 'text-gray-400' : 'text-gray-700'}`}>{date}</span>
        <span className={`text-sm ${isHighlighted ? 'text-primary font-medium' : isFuture ? 'text-gray-400' : 'text-gray-700'}`}>{content}</span>
      </div>
    </div>
  );
}

function TaskItem({ label }: { label: string }) {
  return (
    <label className="flex items-start gap-2 cursor-pointer group">
      <div className="w-3.5 h-3.5 rounded-sm border border-gray-300 mt-0.5 flex-shrink-0 group-hover:border-primary transition-colors bg-white"></div>
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}
