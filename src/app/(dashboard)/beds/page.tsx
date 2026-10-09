"use client";

import React, { useState } from "react";
import { Search, Filter, Settings, Activity } from "lucide-react";
import BranchDropdown from "@/components/ui/BranchDropdown";

// Mock Data for Beds
const BEDS_DATA = [
  { id: "01", status: "occupied" },
  { id: "02", status: "occupied" },
  { id: "03", status: "vacant" },
  { id: "04", status: "occupied" },
  { id: "05", status: "occupied" },
  { id: "06", status: "discharge" },
  { id: "07", status: "occupied" },
  { id: "08", status: "occupied" },
  { id: "09", status: "cleaning" },
  { id: "10", status: "occupied" },
  { id: "11", status: "occupied" },
  { id: "12", status: "critical" },
  { id: "13", status: "occupied" },
  { id: "14", status: "discharge" },
  { id: "15", status: "occupied" },
  { id: "16", status: "occupied" },
  { id: "17", status: "vacant" },
  { id: "18", status: "occupied" },
  { id: "19", status: "occupied" },
  { id: "20", status: "vacant" },
  { id: "21", status: "occupied" },
  { id: "22", status: "occupied" },
  { id: "23", status: "discharge" },
  { id: "24", status: "occupied" },
  { id: "25", status: "cleaning" },
  { id: "26", status: "occupied" },
];

const BedLegend = ({ colorClass, label }: { colorClass: string, label: string }) => (
  <div className="flex items-center gap-2.5 cursor-pointer group">
    <div className={`w-3.5 h-3.5 rounded-sm ${colorClass}`}></div>
    <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">{label}</span>
  </div>
);

export default function BedsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredBeds = BEDS_DATA.filter(bed => 
    bed.id.includes(searchQuery) || bed.status.includes(searchQuery.toLowerCase())
  );

  const getBedStyles = (status: string) => {
    switch(status) {
      case 'occupied': return 'bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-400 hover:bg-blue-100';
      case 'vacant': return 'bg-green-50 text-green-700 border-green-200 hover:border-green-400 hover:bg-green-100';
      case 'cleaning': return 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800';
      case 'discharge': return 'bg-orange-50 text-orange-700 border-orange-200 hover:border-orange-400 hover:bg-orange-100';
      case 'critical': return 'bg-red-50 text-red-700 border-red-200 hover:border-red-400 hover:bg-red-100';
      default: return 'bg-gray-100 text-gray-400 border-gray-200';
    }
  };

  return (
    <div className="h-full flex flex-col bg-canvas animate-in fade-in duration-300 relative">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between px-4 md:px-10 py-4 md:py-6 bg-white shrink-0 z-10 border-b border-gray-100 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bed Board &middot; IPD</h1>
          <p className="text-sm text-gray-400 mt-1 font-medium">Live occupancy updates via WebSockets</p>
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
              placeholder="Search patient, bed..."
              className="cursor-text pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm w-full md:w-72 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400 font-medium"
            />
          </div>
          <button 
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer shadow-sm"
          >
            <Filter size={16} /> Filters
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-10 bg-[#F6F8F8]">
        <div className="max-w-6xl mx-auto">
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100/60 overflow-hidden">
            
            {/* Board Header */}
            <div className="px-4 md:px-8 py-4 md:py-5 border-b border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between bg-white gap-4">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-gray-900 text-lg">Ortho Ward 2</h3>
                <span className="text-gray-300">&middot;</span>
                <span className="text-sm text-gray-500 font-semibold">22 of 26 occupied</span>
                <span className="text-gray-300">&middot;</span>
                <span className="text-sm text-gray-500 font-semibold">3 discharges today</span>
              </div>
              
              <div className="flex items-center gap-5">
                <span className="flex items-center gap-1.5 text-xs font-bold text-success bg-[#E7F4EE] px-3 py-1.5 rounded-full">
                  <Activity size={14} /> Live
                </span>
                <button onClick={() => setShowSettings(true)} className="text-gray-500 hover:text-gray-900 transition-colors cursor-pointer p-1">
                  <Settings size={20} />
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="p-4 md:p-10">
              {filteredBeds.length === 0 ? (
                <div className="text-center py-12 text-gray-500 font-medium">No beds found matching &quot;{searchQuery}&quot;</div>
              ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(60px,1fr))] gap-3.5">
                  {filteredBeds.map(bed => (
                    <button
                      key={bed.id}
                      onClick={() => showToast(`Bed ${bed.id} selected.`)}
                      className={`h-12 w-full flex items-center justify-center font-bold text-sm rounded-lg border shadow-sm transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer ${getBedStyles(bed.status)}`}
                    >
                      {bed.id}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="px-4 md:px-8 py-4 md:py-5 border-t border-gray-50 bg-white flex flex-wrap items-center gap-4 md:gap-8">
              <BedLegend colorClass="bg-blue-600 rounded-sm" label="Occupied" />
              <BedLegend colorClass="bg-green-600 rounded-sm" label="Vacant &middot; clean" />
              <BedLegend colorClass="bg-slate-900 rounded-sm" label="Cleaning" />
              <BedLegend colorClass="bg-orange-500 rounded-sm" label="Discharge today" />
              <BedLegend colorClass="bg-red-600 rounded-sm" label="Critical / isolation" />
            </div>

          </div>

        </div>
      </div>

      {/* Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-nav/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900">Filter Beds</h3>
              <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer text-sm font-semibold">Close</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ward / Floor</label>
                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white cursor-pointer">
                  <option>Ortho Ward 2</option>
                  <option>ICU</option>
                  <option>Maternity</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white cursor-pointer">
                  <option>All Statuses</option>
                  <option>Vacant Only</option>
                  <option>Occupied Only</option>
                  <option>Discharging Today</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 bg-gray-50/50 border-t border-gray-100">
              <button onClick={() => setShowFilters(false)} className="px-4 py-2 text-sm font-semibold text-gray-700 cursor-pointer">Clear</button>
              <button onClick={() => { setShowFilters(false); showToast('Filters applied!'); }} className="px-5 py-2 text-sm font-semibold text-white bg-primary rounded-lg cursor-pointer">Apply</button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-nav/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900">Board Settings</h3>
              <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer text-sm font-semibold">Close</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Auto-refresh (WebSocket)</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer accent-primary" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Show patient initials</span>
                <input type="checkbox" className="w-4 h-4 cursor-pointer accent-primary" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Alert on critical beds</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer accent-primary" />
              </div>
            </div>
            <div className="p-5 bg-gray-50/50 border-t border-gray-100 flex justify-end">
              <button onClick={() => { setShowSettings(false); showToast('Settings saved successfully.'); }} className="px-5 py-2 text-sm font-semibold text-white bg-primary rounded-lg cursor-pointer">Save Changes</button>
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
