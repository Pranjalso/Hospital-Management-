"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Plus, Filter, Download, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import NewRegistrationButton from "@/components/ui/NewRegistrationButton";
import ActionMenu from "@/components/ui/ActionMenu";

const MOCK_PATIENTS = [
  { id: "SG-1234", name: "Suresh Gowda", uhid: "BLR-0042871", abha: "Linked", genderAge: "M · 61y", contact: "+91 98xxxx4410", lastVisit: "Today, 09:30 AM", status: "IPD - Admitted", statusType: "primary" as const },
  { id: "AK-4592", name: "Anita Kumar", uhid: "BLR-0051928", abha: "Pending", genderAge: "F · 34y", contact: "+91 99xxxx8811", lastVisit: "Yesterday, 14:15", status: "OPD - Completed", statusType: "neutral" as const },
  { id: "RJ-9821", name: "Rahul Jain", uhid: "BLR-0062719", abha: "Linked", genderAge: "M · 45y", contact: "+91 88xxxx2299", lastVisit: "Oct 4, 11:00 AM", status: "Follow-up Due", statusType: "warning" as const },
  { id: "MN-7712", name: "Meena N.", uhid: "BLR-0071823", abha: "Linked", genderAge: "F · 28y", contact: "+91 77xxxx5544", lastVisit: "Oct 2, 09:45 AM", status: "OPD - No Show", statusType: "alert" as const },
  { id: "VK-8823", name: "Vikram K.", uhid: "BLR-0082734", abha: "Pending", genderAge: "M · 52y", contact: "+91 96xxxx1122", lastVisit: "Sep 28, 16:30", status: "Discharged", statusType: "success" as const },
  { id: "SP-1192", name: "Sunita Patil", uhid: "BLR-0091827", abha: "Linked", genderAge: "F · 41y", contact: "+91 98xxxx7766", lastVisit: "Sep 25, 10:15 AM", status: "OPD - Completed", statusType: "neutral" as const },
  { id: "PR-2391", name: "Priya Rajan", uhid: "BLR-0045812", abha: "Pending", genderAge: "F · 29y", contact: "+91 98xxxx1234", lastVisit: "Sep 20, 11:30 AM", status: "Follow-up Due", statusType: "warning" as const },
  { id: "AS-4812", name: "Amit Singh", uhid: "BLR-0078192", abha: "Linked", genderAge: "M · 35y", contact: "+91 99xxxx5678", lastVisit: "Sep 18, 09:00 AM", status: "OPD - Completed", statusType: "neutral" as const },
  { id: "MD-9182", name: "Mohan Das", uhid: "BLR-0081293", abha: "Linked", genderAge: "M · 48y", contact: "+91 88xxxx9012", lastVisit: "Sep 15, 14:45", status: "IPD - Admitted", statusType: "primary" as const },
  { id: "KN-3819", name: "Kavya Nair", uhid: "BLR-0091283", abha: "Pending", genderAge: "F · 25y", contact: "+91 77xxxx3456", lastVisit: "Sep 12, 16:00", status: "Discharged", statusType: "success" as const },
  { id: "RV-4821", name: "Ravi Varma", uhid: "BLR-0102938", abha: "Linked", genderAge: "M · 55y", contact: "+91 96xxxx7890", lastVisit: "Sep 10, 10:15 AM", status: "OPD - No Show", statusType: "alert" as const },
  { id: "SM-1928", name: "Sneha Menon", uhid: "BLR-0113849", abha: "Linked", genderAge: "F · 38y", contact: "+91 98xxxx2345", lastVisit: "Sep 05, 11:45 AM", status: "OPD - Completed", statusType: "neutral" as const },
  { id: "DP-2918", name: "Deepak P.", uhid: "BLR-0124859", abha: "Pending", genderAge: "M · 42y", contact: "+91 99xxxx6789", lastVisit: "Sep 01, 09:30 AM", status: "Follow-up Due", statusType: "warning" as const },
  { id: "AR-4819", name: "Anjali Rao", uhid: "BLR-0135869", abha: "Linked", genderAge: "F · 31y", contact: "+91 88xxxx0123", lastVisit: "Aug 28, 14:00", status: "IPD - Admitted", statusType: "primary" as const },
  { id: "VS-5829", name: "Vijay Sharma", uhid: "BLR-0146879", abha: "Linked", genderAge: "M · 65y", contact: "+91 77xxxx4567", lastVisit: "Aug 25, 10:45 AM", status: "Discharged", statusType: "success" as const },
  { id: "NK-6938", name: "Neha Kapoor", uhid: "BLR-0157889", abha: "Pending", genderAge: "F · 27y", contact: "+91 96xxxx8901", lastVisit: "Aug 20, 16:30", status: "OPD - No Show", statusType: "alert" as const },
];

const ITEMS_PER_PAGE = 7;

export default function PatientsList() {
  const [patients, setPatients] = useState(MOCK_PATIENTS);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredPatients = patients.filter(p => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(query) || p.uhid.toLowerCase().includes(query) || p.contact.includes(query);
    const matchesStatus = statusFilter === "All" || p.status.includes(statusFilter);
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPatients = filteredPatients.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 if filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  const handleDeletePatient = (id: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
    // Adjust page if we deleted the last item on the current page
    if (currentPatients.length === 1 && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 bg-canvas shrink-0">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Patient Registry</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and view all registered patients</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, UHID, phone..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-full text-sm w-72 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="relative flex items-center">
            <div className="absolute left-3 pointer-events-none">
              <Filter size={14} className="text-gray-500" />
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-8 pr-8 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer appearance-none outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="All">All Statuses</option>
              <option value="Admitted">Admitted</option>
              <option value="Completed">Completed</option>
              <option value="Follow-up">Follow-up</option>
              <option value="No Show">No Show</option>
              <option value="Discharged">Discharged</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 pointer-events-none text-gray-500" />
          </div>

          <NewRegistrationButton />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 pb-8">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
          {/* Table Toolbar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700">Matched Patients ({filteredPatients.length})</span>
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-semibold">Total: {patients.length}</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
                <Download size={16} /> Export CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto scrollbar-hide flex-1">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-gray-500">
                  <th className="px-6 py-3 font-medium">Patient Name</th>
                  <th className="px-6 py-3 font-medium">UHID / ABHA</th>
                  <th className="px-6 py-3 font-medium">Gender/Age</th>
                  <th className="px-6 py-3 font-medium">Contact</th>
                  <th className="px-6 py-3 font-medium">Last Visit</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {patients.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">No patients found.</td>
                  </tr>
                ) : (
                  currentPatients.map((p) => (
                    <PatientRow 
                      key={p.id}
                      {...p}
                      onDelete={() => handleDeletePatient(p.id)}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
            <span className="text-sm text-gray-500">
              Showing {filteredPatients.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredPatients.length)} of {filteredPatients.length} entries
            </span>
            <div className="flex gap-1">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-200 bg-white rounded text-sm font-medium text-gray-500 disabled:opacity-50 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                Prev
              </button>
              
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === currentPage;
                return (
                  <button 
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 border rounded text-sm font-medium cursor-pointer transition-colors ${
                      isActive 
                        ? 'border-primary bg-primary text-white' 
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1 border border-gray-200 bg-white rounded text-sm font-medium text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PatientRow({ id, name, uhid, abha, genderAge, contact, lastVisit, status, statusType, onDelete }: { id: string, name: string, uhid: string, abha: string, genderAge: string, contact: string, lastVisit: string, status: string, statusType: 'primary' | 'success' | 'warning' | 'alert' | 'neutral', onDelete: () => void }) {
  
  const statusStyles = {
    primary: 'bg-primary/10 text-primary font-semibold',
    success: 'bg-success/10 text-success font-semibold',
    warning: 'bg-warning/10 text-warning font-semibold',
    alert: 'bg-alert/10 text-alert font-semibold',
    neutral: 'bg-gray-100 text-gray-700 font-semibold'
  };

  const abhaColor = abha === 'Linked' ? 'text-success' : 'text-gray-400';

  return (
    <tr className="hover:bg-gray-50 transition-colors group">
      <td className="px-6 py-4">
        <Link href={`/patient/${id}`} className="font-semibold text-gray-900 hover:text-primary transition-colors flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-soft/30 flex items-center justify-center text-primary font-bold text-xs shrink-0">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          {name}
        </Link>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-gray-900 font-medium">{uhid}</span>
          <span className={`text-xs flex items-center gap-1 ${abhaColor}`}>ABHA: {abha}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-gray-700">{genderAge}</td>
      <td className="px-6 py-4 text-gray-700">{contact}</td>
      <td className="px-6 py-4 text-gray-700">{lastVisit}</td>
      <td className="px-6 py-4">
        <span className={`inline-block px-2.5 py-1 rounded-full text-xs ${statusStyles[statusType]}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <ActionMenu patientId={id} patientName={name} onDelete={onDelete} />
      </td>
    </tr>
  );
}
