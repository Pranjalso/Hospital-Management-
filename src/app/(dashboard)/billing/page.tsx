"use client";

import React, { useState } from "react";
import { Search, Filter, Plus, FileText, CheckCircle, Clock, AlertCircle, Download } from "lucide-react";
import Link from "next/link";

type BillStatus = 'Estimate' | 'Pre-Auth' | 'Claim Pending' | 'Settled' | 'Overdue';

interface Bill {
  id: string;
  patient: string;
  uhid: string;
  type: string;
  insurance: string;
  amount: number;
  status: BillStatus;
  date: string;
}

const BILLS_DATA: Bill[] = [
  { id: "INV-2026-1001", patient: "Suresh Gowda", uhid: "SG-1234", type: "IPD - TKR", insurance: "Star Health", amount: 285000, status: 'Claim Pending', date: "08 Oct 2026" },
  { id: "INV-2026-1002", patient: "Fatima Shaikh", uhid: "FS-5678", type: "OPD", insurance: "Self Pay", amount: 800, status: 'Settled', date: "08 Oct 2026" },
  { id: "INV-2026-1003", patient: "Gopal S.", uhid: "GS-9012", type: "Surgery Estimate", insurance: "HDFC Ergo", amount: 65000, status: 'Estimate', date: "07 Oct 2026" },
  { id: "INV-2026-1004", patient: "Lakshmi N.", uhid: "LN-3456", type: "IPD - Maternity", insurance: "ICICI Lombard", amount: 120000, status: 'Pre-Auth', date: "06 Oct 2026" },
  { id: "INV-2026-1005", patient: "Ramesh Kulkarni", uhid: "RK-7890", type: "OPD - Cardiology", insurance: "Self Pay", amount: 1500, status: 'Overdue', date: "01 Oct 2026" },
  { id: "INV-2026-1006", patient: "Arjun Patil", uhid: "AP-2345", type: "Diagnostics", insurance: "Self Pay", amount: 4500, status: 'Settled', date: "05 Oct 2026" },
];

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showAddBill, setShowAddBill] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const tabs = ['All', 'Estimates', 'Pre-Auth', 'Active Claims', 'Settled & Dues'];

  const filteredBills = BILLS_DATA.filter(bill => {
    const matchesSearch = bill.patient.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          bill.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bill.uhid.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (activeTab === 'Estimates') return bill.status === 'Estimate';
    if (activeTab === 'Pre-Auth') return bill.status === 'Pre-Auth';
    if (activeTab === 'Active Claims') return bill.status === 'Claim Pending';
    if (activeTab === 'Settled & Dues') return bill.status === 'Settled' || bill.status === 'Overdue';
    return true;
  });

  const getStatusStyles = (status: BillStatus) => {
    switch (status) {
      case 'Settled': return 'bg-success/10 text-success border-success/20';
      case 'Claim Pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'Estimate': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Pre-Auth': return 'bg-primary/10 text-primary border-primary/20';
      case 'Overdue': return 'bg-alert/10 text-alert border-alert/20';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const handleExport = () => {
    showToast('Exporting table to Excel (.xlsx)...');
    setTimeout(() => {
      const a = document.createElement('a');
      a.href = '#';
      a.download = 'bills_export.xlsx';
      a.click();
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-[#F6F8F8] animate-in fade-in duration-300 relative">
      
      {/* Header Area */}
      <div className="bg-white shrink-0 z-10 shadow-sm border-b border-gray-100">
        <header className="flex flex-col md:flex-row md:items-center justify-between px-4 md:px-10 pt-4 md:pt-8 pb-4 md:pb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Billing & TPA</h1>
            <p className="text-sm text-gray-400 mt-1 font-medium">Manage Estimates, Pre-auth, Claims, and Dues</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search invoice, patient..."
                className="cursor-text pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full md:w-72 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400 font-medium"
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
              onClick={() => setShowAddBill(true)}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-[#0B5E5E] text-white rounded-lg text-sm font-semibold hover:bg-[#0B5E5E]/90 transition-colors shadow-sm"
            >
              <Plus size={16} /> New Bill
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="px-4 md:px-10 pb-4 md:pb-6 flex items-center gap-4 md:gap-6 overflow-x-auto whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer px-4 py-2 rounded-md text-sm font-bold transition-all ${
                activeTab === tab
                  ? 'border-2 border-[#0B5E5E] text-[#0B5E5E] shadow-sm'
                  : 'border-2 border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table Area */}
      <div className="flex-1 overflow-auto p-4 md:p-10 scrollbar-hide">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-max text-sm text-left whitespace-nowrap">
            <thead className="bg-white text-gray-500 font-bold border-b border-gray-100">
              <tr>
                <th className="px-6 py-5">Invoice / Estimate ID</th>
                <th className="px-6 py-5">Patient</th>
                <th className="px-6 py-5">Type</th>
                <th className="px-6 py-5">Insurance / Payer</th>
                <th className="px-6 py-5">Amount</th>
                <th className="px-6 py-5">Date</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBills.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400 font-medium">
                    No bills or claims found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredBills.map((bill) => (
                  <tr key={bill.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                        <FileText size={16} className="text-gray-400" /> {bill.id}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/patient/${bill.uhid}`} className="font-bold text-gray-900 hover:text-primary transition-colors cursor-pointer">
                        {bill.patient}
                      </Link>
                      <div className="text-xs text-gray-400 mt-0.5">{bill.uhid}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-semibold">{bill.type}</td>
                    <td className="px-6 py-4 text-gray-600 font-semibold">{bill.insurance}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">{formatCurrency(bill.amount)}</td>
                    <td className="px-6 py-4 text-gray-500 font-medium">{bill.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold border ${getStatusStyles(bill.status)}`}>
                        {bill.status === 'Settled' && <CheckCircle size={12} />}
                        {bill.status === 'Overdue' && <AlertCircle size={12} />}
                        {bill.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right pr-8">
                      <button 
                        onClick={() => setSelectedBill(bill)}
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
              <h3 className="font-bold text-lg text-gray-900">Filter Bills</h3>
              <button onClick={() => setShowFilters(false)} className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors text-sm font-semibold">Close</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 cursor-pointer">Date Range</label>
                <select className="cursor-pointer w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>This Month</option>
                  <option>Custom Range...</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 cursor-pointer">Payer / Insurance</label>
                <select className="cursor-pointer w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white">
                  <option>All Payers</option>
                  <option>Self Pay</option>
                  <option>Star Health</option>
                  <option>HDFC Ergo</option>
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

      {/* Add Bill Modal */}
      {showAddBill && (
        <div className="fixed inset-0 z-50 bg-nav/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-lg text-gray-900">Create New Bill</h3>
              <button onClick={() => setShowAddBill(false)} className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors text-sm font-semibold">Close</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowAddBill(false); showToast('New invoice created successfully!'); }} className="p-6 space-y-4">
              <div>
                <label className="cursor-pointer block text-sm font-semibold text-gray-700 mb-1.5">Patient Search</label>
                <input type="text" required placeholder="Name or UHID" className="cursor-text w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5E5E]/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="cursor-pointer block text-sm font-semibold text-gray-700 mb-1.5">Bill Type</label>
                  <select required className="cursor-pointer w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5E5E]/20">
                    <option>OPD Consult</option>
                    <option>IPD Discharge</option>
                    <option>Pharmacy</option>
                    <option>Diagnostics</option>
                  </select>
                </div>
                <div>
                  <label className="cursor-pointer block text-sm font-semibold text-gray-700 mb-1.5">Amount (₹)</label>
                  <input type="number" required placeholder="0.00" className="cursor-text w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5E5E]/20" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowAddBill(false)} className="cursor-pointer px-5 py-2.5 text-sm font-semibold border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="cursor-pointer px-5 py-2.5 text-sm font-semibold text-white bg-[#0B5E5E] rounded-lg hover:bg-[#0B5E5E]/90 transition-colors">Generate Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Details Modal */}
      {selectedBill && (
        <div className="fixed inset-0 z-50 bg-nav/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
              <div>
                <h3 className="font-bold text-xl text-gray-900">Invoice Details</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedBill.id} &middot; {selectedBill.date}</p>
              </div>
              <button onClick={() => setSelectedBill(null)} className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors text-sm font-semibold">Close</button>
            </div>
            
            <div className="p-8 bg-[#F6F8F8] space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Patient Info</p>
                  <p className="font-bold text-gray-900 text-lg">{selectedBill.patient}</p>
                  <p className="text-sm text-gray-500">UHID: {selectedBill.uhid}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Status</p>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-bold border ${getStatusStyles(selectedBill.status)}`}>
                    {selectedBill.status}
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-4 border-b border-gray-50 pb-3">Billing Summary</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-600">Bill Type</span>
                    <span className="font-bold text-gray-900">{selectedBill.type}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-600">Primary Payer</span>
                    <span className="font-bold text-gray-900">{selectedBill.insurance}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                    <span className="text-base font-bold text-gray-900">Total Amount</span>
                    <span className="text-xl font-bold text-primary">{formatCurrency(selectedBill.amount)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-5 bg-white border-t border-gray-100">
              <button 
                onClick={() => {
                  showToast(`Invoice ${selectedBill.id} downloaded`);
                  setSelectedBill(null);
                }}
                className="cursor-pointer px-5 py-2.5 text-sm font-semibold border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Download size={16} /> Download PDF
              </button>
              <button 
                onClick={() => {
                  showToast('Payment reminder sent to patient.');
                  setSelectedBill(null);
                }}
                className="cursor-pointer px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                Send Reminder
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
