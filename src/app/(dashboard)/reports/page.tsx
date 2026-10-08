"use client";

import React, { useState } from "react";
import { Download, Filter, Calendar, BarChart3, TrendingUp, DollarSign, Users, Activity, ArrowRight, FileText } from "lucide-react";

type ReportTab = 'Financial' | 'Operational' | 'Marketing';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<ReportTab>('Financial');
  const [showFilters, setShowFilters] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState("This Month");
  const [department, setDepartment] = useState("All Departments");
  const [tempDateRange, setTempDateRange] = useState("This Month");
  const [tempDept, setTempDept] = useState("All Departments");

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const tabs: ReportTab[] = ['Financial', 'Operational', 'Marketing'];

  return (
    <div className="h-full flex flex-col bg-[#F6F8F8] animate-in fade-in duration-300 relative">
      
      {/* Header Area */}
      <div className="bg-white shrink-0 z-10 shadow-sm border-b border-gray-100">
        <header className="flex items-center justify-between px-10 pt-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-sm text-gray-400 mt-1 font-medium">Comprehensive insights into hospital performance</p>
          </div>

          <div className="flex items-center gap-3 pb-6">
            <button 
              onClick={() => setShowFilters(true)}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Calendar size={16} /> {dateRange}
            </button>
            <button 
              onClick={() => setShowFilters(true)}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Filter size={16} /> Parameters
            </button>
            <button 
              onClick={() => {
                showToast('Generating custom report...');
                setTimeout(() => {
                  const a = document.createElement('a');
                  a.href = '#';
                  a.download = 'custom_report.pdf';
                  a.click();
                }, 1000);
              }}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-[#0B5E5E] text-white rounded-lg text-sm font-semibold hover:bg-[#0B5E5E]/90 transition-colors shadow-sm"
            >
              <Download size={16} /> Generate Report
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="px-10 flex items-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer px-4 py-2 mb-4 rounded-md text-sm font-bold transition-all ${
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

      <div className="flex-1 overflow-auto p-10 scrollbar-hide space-y-8">
        
        {/* Dynamic Content based on Tab */}
        {activeTab === 'Financial' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <DollarSign className="text-blue-600" size={24} />
                  </div>
                  <span className="flex items-center gap-1 text-sm font-bold text-success bg-success/10 px-2 py-1 rounded-md">
                    <TrendingUp size={14} /> +12.5%
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-500 mb-1">Total Revenue (MTD)</p>
                <h3 className="text-3xl font-bold text-gray-900">₹1,24,50,000</h3>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                    <Activity className="text-orange-600" size={24} />
                  </div>
                  <span className="flex items-center gap-1 text-sm font-bold text-critical bg-critical/10 px-2 py-1 rounded-md">
                    <TrendingUp size={14} className="rotate-180" /> -2.4%
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-500 mb-1">Pending TPA Claims</p>
                <h3 className="text-3xl font-bold text-gray-900">₹42,10,000</h3>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                    <BarChart3 className="text-purple-600" size={24} />
                  </div>
                  <span className="flex items-center gap-1 text-sm font-bold text-success bg-success/10 px-2 py-1 rounded-md">
                    <TrendingUp size={14} /> +5.2%
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-500 mb-1">Average Revenue Per Bed</p>
                <h3 className="text-3xl font-bold text-gray-900">₹8,450</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Department Revenue Breakdown */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-6">Revenue by Department</h3>
                <div className="space-y-5">
                  {[
                    { dept: 'Cardiology', amount: '₹45.2L', percent: 85 },
                    { dept: 'Orthopedics', amount: '₹32.8L', percent: 65 },
                    { dept: 'Maternity', amount: '₹28.5L', percent: 55 },
                    { dept: 'Neurology', amount: '₹18.0L', percent: 35 },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm font-bold mb-2">
                        <span className="text-gray-700">{item.dept}</span>
                        <span className="text-gray-900">{item.amount}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div className="bg-[#0B5E5E] h-2.5 rounded-full" style={{ width: `${item.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ready to Download Reports */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-6">Recent Financial Statements</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Q3 2026 P&L Statement', date: '01 Oct 2026', type: 'PDF' },
                    { title: 'September 2026 TPA Collection', date: '02 Oct 2026', type: 'Excel' },
                    { title: 'Department Wise Revenue - Sep', date: '05 Oct 2026', type: 'PDF' },
                    { title: 'Doctor Payouts - September', date: '06 Oct 2026', type: 'Excel' },
                  ].map((report, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${report.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 group-hover:text-[#0B5E5E] transition-colors">{report.title}</p>
                          <p className="text-xs text-gray-500 font-medium">{report.date} &middot; {report.type}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          showToast(`Downloading ${report.title}...`);
                          setTimeout(() => {
                            const a = document.createElement('a');
                            a.href = '#';
                            a.download = `${report.title.replace(/\s+/g, '_')}.${report.type.toLowerCase()}`;
                            a.click();
                          }, 1000);
                        }} 
                        className="cursor-pointer text-gray-400 hover:text-[#0B5E5E] transition-colors"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Operational' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm font-semibold text-gray-500 mb-1">Average Length of Stay (ALOS)</p>
                <h3 className="text-3xl font-bold text-gray-900">4.2 Days</h3>
                <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `60%` }}></div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm font-semibold text-gray-500 mb-1">Current Bed Occupancy</p>
                <h3 className="text-3xl font-bold text-gray-900">82%</h3>
                <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `82%` }}></div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm font-semibold text-gray-500 mb-1">OPD Wait Time (Avg)</p>
                <h3 className="text-3xl font-bold text-gray-900">18 Mins</h3>
                <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-success h-1.5 rounded-full" style={{ width: `30%` }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Marketing' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="text-blue-600" size={20} />
                  <p className="text-sm font-semibold text-gray-500">Total Leads (MTD)</p>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">1,245</h3>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="text-green-600" size={20} />
                  <p className="text-sm font-semibold text-gray-500">Lead Conversion Rate</p>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">14.8%</h3>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="text-purple-600" size={20} />
                  <p className="text-sm font-semibold text-gray-500">Cost per Acquisition</p>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">₹1,250</h3>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-nav/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900">Report Parameters</h3>
              <button onClick={() => setShowFilters(false)} className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors text-sm font-semibold">Close</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 cursor-pointer">Date Range</label>
                <select 
                  value={tempDateRange}
                  onChange={(e) => setTempDateRange(e.target.value)}
                  className="cursor-pointer w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
                >
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>Q3 2026</option>
                  <option>Year to Date</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 cursor-pointer">Department</label>
                <select 
                  value={tempDept}
                  onChange={(e) => setTempDept(e.target.value)}
                  className="cursor-pointer w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
                >
                  <option>All Departments</option>
                  <option>Cardiology</option>
                  <option>Orthopedics</option>
                  <option>Maternity</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 bg-gray-50/50 border-t border-gray-100">
              <button 
                onClick={() => {
                  setTempDateRange("This Month");
                  setTempDept("All Departments");
                }} 
                className="cursor-pointer px-4 py-2 text-sm font-semibold text-gray-700"
              >
                Clear
              </button>
              <button 
                onClick={() => { 
                  setDateRange(tempDateRange);
                  setDepartment(tempDept);
                  setShowFilters(false); 
                  showToast('Parameters applied!'); 
                }} 
                className="cursor-pointer px-5 py-2 text-sm font-semibold text-white bg-[#0B5E5E] rounded-lg"
              >
                Apply
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
