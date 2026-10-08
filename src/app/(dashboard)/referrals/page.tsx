"use client";

import React, { useState } from "react";
import { Search, Plus, Filter, Users, Stethoscope, DollarSign, Activity, FileText, Download, Phone, Mail } from "lucide-react";

type DoctorStatus = 'Active' | 'Inactive' | 'Pending';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  clinic: string;
  phone: string;
  email: string;
  patientsReferred: number;
  revenueGenerated: number;
  status: DoctorStatus;
}

const REFERRALS_DATA: Doctor[] = [
  { id: "DR-001", name: "Dr. Arvind Mehta", specialty: "General Physician", clinic: "Mehta Clinics, Andheri", phone: "+91 9876543210", email: "arvind.mehta@example.com", patientsReferred: 142, revenueGenerated: 1250000, status: 'Active' },
  { id: "DR-002", name: "Dr. Sunita Sharma", specialty: "Gynecologist", clinic: "Care Women's Health", phone: "+91 9876543211", email: "sunita.sharma@example.com", patientsReferred: 85, revenueGenerated: 940000, status: 'Active' },
  { id: "DR-003", name: "Dr. Rohan Desai", specialty: "Orthopedics", clinic: "Desai Bone & Joint", phone: "+91 9876543212", email: "rohan.desai@example.com", patientsReferred: 12, revenueGenerated: 320000, status: 'Inactive' },
  { id: "DR-004", name: "Dr. Kavita Iyer", specialty: "Pediatrician", clinic: "Little Smiles Clinic", phone: "+91 9876543213", email: "kavita.iyer@example.com", patientsReferred: 4, revenueGenerated: 15000, status: 'Pending' },
  { id: "DR-005", name: "Dr. Faizal Khan", specialty: "Cardiologist", clinic: "Heart Care Foundation", phone: "+91 9876543214", email: "faizal.khan@example.com", patientsReferred: 56, revenueGenerated: 2100000, status: 'Active' },
];

export default function ReferralsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredDoctors = REFERRALS_DATA.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doc.clinic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const getStatusStyles = (status: DoctorStatus) => {
    switch (status) {
      case 'Active': return 'bg-success/10 text-success border-success/20';
      case 'Inactive': return 'bg-gray-100 text-gray-500 border-gray-200';
      case 'Pending': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleExport = () => {
    showToast('Exporting referral data to Excel...');
    setTimeout(() => {
      const a = document.createElement('a');
      a.href = '#';
      a.download = 'referrals_export.xlsx';
      a.click();
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-[#F6F8F8] animate-in fade-in duration-300 relative">
      
      {/* Header Area */}
      <div className="bg-white shrink-0 z-10 shadow-sm border-b border-gray-100">
        <header className="flex items-center justify-between px-10 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Doctor Referrals</h1>
            <p className="text-sm text-gray-400 mt-1 font-medium">Manage referring doctors and network ROI</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search doctor, clinic..."
                className="cursor-text pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-72 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5E5E]/20 transition-all placeholder:text-gray-400 font-medium"
              />
            </div>
            <button 
              onClick={() => setShowFilters(true)}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Filter size={16} /> Filters
            </button>
            <button 
              onClick={handleExport}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Download size={16} /> Export
            </button>
            <button 
              onClick={() => setShowAddDoctor(true)}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-[#0B5E5E] text-white rounded-lg text-sm font-semibold hover:bg-[#0B5E5E]/90 transition-colors shadow-sm"
            >
              <Plus size={16} /> Add Doctor
            </button>
          </div>
        </header>
      </div>

      <div className="flex-1 overflow-auto p-10 scrollbar-hide space-y-8">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Stethoscope className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Total Network</p>
              <h3 className="text-2xl font-bold text-gray-900">142 Doctors</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <Users className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Patients Referred</p>
              <h3 className="text-2xl font-bold text-gray-900">894</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
              <DollarSign className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Total Revenue Generated</p>
              <h3 className="text-2xl font-bold text-gray-900">₹84,50,000</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
              <Activity className="text-orange-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Active This Month</p>
              <h3 className="text-2xl font-bold text-gray-900">86</h3>
            </div>
          </div>
        </div>

        {/* Main Table Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-max text-sm text-left whitespace-nowrap">
            <thead className="bg-white text-gray-500 font-bold border-b border-gray-100">
              <tr>
                <th className="px-6 py-5">Doctor Name</th>
                <th className="px-6 py-5">Specialty</th>
                <th className="px-6 py-5">Clinic / Hospital</th>
                <th className="px-6 py-5">Patients Referred</th>
                <th className="px-6 py-5">Revenue Generated</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredDoctors.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400 font-medium">
                    No doctors found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredDoctors.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 cursor-pointer hover:text-[#0B5E5E] transition-colors">
                        {doc.name}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">{doc.id}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-600">{doc.specialty}</td>
                    <td className="px-6 py-4 font-semibold text-gray-600">{doc.clinic}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">{doc.patientsReferred}</td>
                    <td className="px-6 py-4 font-bold text-[#0B5E5E]">{formatCurrency(doc.revenueGenerated)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold border ${getStatusStyles(doc.status)}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right pr-8">
                      <button 
                        onClick={() => setSelectedDoctor(doc)}
                        className="text-[#0B5E5E] font-bold hover:text-[#0B5E5E]/80 transition-colors cursor-pointer text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-nav/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900">Filter Doctors</h3>
              <button onClick={() => setShowFilters(false)} className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors text-sm font-semibold">Close</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 cursor-pointer">Specialty</label>
                <select className="cursor-pointer w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white">
                  <option>All Specialties</option>
                  <option>General Physician</option>
                  <option>Gynecologist</option>
                  <option>Orthopedics</option>
                  <option>Cardiologist</option>
                  <option>Pediatrician</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 cursor-pointer">Status</label>
                <select className="cursor-pointer w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white">
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Pending</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 bg-gray-50/50 border-t border-gray-100">
              <button onClick={() => setShowFilters(false)} className="cursor-pointer px-4 py-2 text-sm font-semibold text-gray-700">Clear</button>
              <button onClick={() => { setShowFilters(false); showToast('Filters applied!'); }} className="cursor-pointer px-5 py-2 text-sm font-semibold text-white bg-[#0B5E5E] rounded-lg">Apply Filters</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      {showAddDoctor && (
        <div className="fixed inset-0 z-50 bg-nav/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-lg text-gray-900">Add Referring Doctor</h3>
              <button onClick={() => setShowAddDoctor(false)} className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors text-sm font-semibold">Close</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowAddDoctor(false); showToast('Doctor added successfully!'); }} className="p-6 space-y-4">
              <div>
                <label className="cursor-pointer block text-sm font-semibold text-gray-700 mb-1.5">Doctor Name</label>
                <input type="text" required placeholder="Dr. First Last" className="cursor-text w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5E5E]/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="cursor-pointer block text-sm font-semibold text-gray-700 mb-1.5">Specialty</label>
                  <input type="text" required placeholder="e.g. Cardiologist" className="cursor-text w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5E5E]/20" />
                </div>
                <div>
                  <label className="cursor-pointer block text-sm font-semibold text-gray-700 mb-1.5">Clinic Name</label>
                  <input type="text" required placeholder="Clinic Name" className="cursor-text w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5E5E]/20" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="cursor-pointer block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
                  <input type="tel" required placeholder="+91" className="cursor-text w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5E5E]/20" />
                </div>
                <div>
                  <label className="cursor-pointer block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                  <input type="email" required placeholder="email@example.com" className="cursor-text w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5E5E]/20" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowAddDoctor(false)} className="cursor-pointer px-5 py-2.5 text-sm font-semibold border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="cursor-pointer px-5 py-2.5 text-sm font-semibold text-white bg-[#0B5E5E] rounded-lg hover:bg-[#0B5E5E]/90 transition-colors">Add Doctor</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Doctor Details Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 bg-nav/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0B5E5E]/10 flex items-center justify-center shrink-0">
                  <Stethoscope className="text-[#0B5E5E]" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900">{selectedDoctor.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5 font-medium">{selectedDoctor.specialty} &middot; {selectedDoctor.clinic}</p>
                </div>
              </div>
              <button onClick={() => setSelectedDoctor(null)} className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors text-sm font-semibold">Close</button>
            </div>
            
            <div className="p-8 bg-[#F6F8F8] space-y-6">
              
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Phone</p>
                    <p className="text-sm font-bold text-gray-900">{selectedDoctor.phone}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-gray-100"></div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Email</p>
                    <p className="text-sm font-bold text-gray-900">{selectedDoctor.email}</p>
                  </div>
                </div>
                <div className="ml-auto">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-bold border ${getStatusStyles(selectedDoctor.status)}`}>
                    {selectedDoctor.status}
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-4 border-b border-gray-50 pb-3 flex items-center gap-2">
                  <Activity size={18} className="text-[#0B5E5E]" /> Performance Metrics
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-center">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Referrals</p>
                    <p className="text-3xl font-bold text-gray-900">{selectedDoctor.patientsReferred}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-center">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold text-[#0B5E5E]">{formatCurrency(selectedDoctor.revenueGenerated)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-5 bg-white border-t border-gray-100">
              <button 
                onClick={() => {
                  showToast('Exporting doctor report...');
                  setSelectedDoctor(null);
                }}
                className="cursor-pointer px-5 py-2.5 text-sm font-semibold border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Download size={16} /> Export Report
              </button>
              <button 
                onClick={() => {
                  showToast('Sending appreciation email...');
                  setSelectedDoctor(null);
                }}
                className="cursor-pointer px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                Send Thank You Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] bg-gray-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-success"></div>
          </div>
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

    </div>
  );
}
