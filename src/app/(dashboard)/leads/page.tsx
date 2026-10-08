"use client";

import React, { useState } from "react";
import { Search, Filter, Plus, List, Download } from "lucide-react";
import BranchDropdown from "@/components/ui/BranchDropdown";
import Link from "next/link";

type Lead = {
  id: string;
  name: string;
  treatment: string;
  source?: string;
  meta?: string;
  tag?: string;
  tagType?: string;
};

const INITIAL_LEADS: Record<string, Lead[]> = {
  new: [
    { id: "L1", name: "Meena R.", treatment: "IVF consultation", source: "Facebook", meta: "12m ago" },
    { id: "L2", name: "Sanjay K.", treatment: "Angiography cost", source: "Website", meta: "40m" },
  ],
  contacted: [
    { id: "L3", name: "Rahul M.", treatment: "Cataract · both eyes", tag: "Callback 3 pm", tagType: "warning" },
    { id: "L4", name: "Nazia B.", treatment: "Maternity package", source: "Health camp" },
  ],
  quote: [
    { id: "L5", name: "Gopal S.", treatment: "Hernia surgery · ₹65k quote", tag: "OPD 10 Oct", tagType: "primary" },
    { id: "L6", name: "Ayesha T.", treatment: "Health check · Executive", source: "Corporate" },
  ],
  visited: [
    { id: "L7", name: "Ravi P.", treatment: "Spine · MRI done", tag: "Decision pending", tagType: "warning" },
  ],
  wonLost: [
    { id: "L8", name: "Suresh G.", treatment: "TKR · admitted", tag: "Won", tagType: "success" },
    { id: "L9", name: "Deepa V.", treatment: "Lost: price", tag: "Lost", tagType: "alert" },
  ]
};

export default function LeadsPage() {
  const [boardData, setBoardData] = useState(INITIAL_LEADS);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getTagClasses = (type?: string) => {
    switch (type) {
      case 'warning': return 'bg-warning/10 text-warning';
      case 'success': return 'bg-success/10 text-success';
      case 'alert': return 'bg-alert/10 text-alert';
      case 'primary': return 'bg-primary/10 text-primary';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const KanbanCard = ({ lead }: { lead: any }) => (
    <div className="bg-white rounded-xl p-5 shadow-sm mb-4 cursor-pointer hover:shadow-md transition-all group border border-transparent hover:border-primary/20">
      <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{lead.name}</h4>
      <p className="text-sm text-gray-500 mt-1 mb-4">{lead.treatment}</p>
      <div className="flex items-center gap-2 text-xs font-semibold">
        {lead.source && (
          <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md">
            {lead.source}
          </span>
        )}
        {lead.tag && (
          <span className={`px-2.5 py-1 rounded-md ${getTagClasses(lead.tagType)}`}>
            {lead.tag}
          </span>
        )}
        {lead.meta && (
          <span className="text-gray-400 ml-auto font-medium">{lead.meta}</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-canvas animate-in fade-in duration-300">
      
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-6 bg-white shrink-0 z-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads & Enquiries</h1>
          <p className="text-sm text-gray-400 mt-1.5 font-medium">
            Kanban &middot; Owner: All &middot; Source: All &middot; Speciality: All
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setViewMode(viewMode === 'kanban' ? 'list' : 'kanban')}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <List size={16} /> {viewMode === 'kanban' ? 'List view' : 'Kanban view'}
          </button>
          <button 
            onClick={() => {
              const fileInput = document.createElement('input');
              fileInput.type = 'file';
              fileInput.accept = '.csv,.xlsx';
              fileInput.onchange = () => showToast('File selected for import!');
              fileInput.click();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Download size={16} /> Import
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0A5D5D] text-white rounded-lg text-sm font-semibold hover:bg-[#0A5D5D]/90 transition-colors shadow-sm cursor-pointer"
          >
            <Plus size={16} /> Add lead
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-[#F6F8F8] relative">
        {viewMode === 'kanban' ? (
          <div className="absolute inset-0 p-10 overflow-x-auto">
            <div className="flex gap-6 min-w-max h-full">
              
              {/* New Column */}
              <div className="w-80 flex flex-col">
                <div className="pb-4 flex items-center justify-between shrink-0">
                  <h3 className="font-bold text-gray-700 text-sm">New &middot; 37</h3>
                </div>
                <div className="flex-1 overflow-y-auto pb-4 scrollbar-hide">
                  {boardData.new.map(lead => <KanbanCard key={lead.id} lead={lead} />)}
                </div>
              </div>

              {/* Contacted Column */}
              <div className="w-80 flex flex-col">
                <div className="pb-4 flex items-center justify-between shrink-0">
                  <h3 className="font-bold text-gray-700 text-sm">Contacted &middot; 64</h3>
                </div>
                <div className="flex-1 overflow-y-auto pb-4 scrollbar-hide">
                  {boardData.contacted.map(lead => <KanbanCard key={lead.id} lead={lead} />)}
                </div>
              </div>

              {/* Quote / Booked Column */}
              <div className="w-80 flex flex-col">
                <div className="pb-4 flex items-center justify-between shrink-0">
                  <h3 className="font-bold text-gray-700 text-sm">Quote / Booked &middot; 41</h3>
                </div>
                <div className="flex-1 overflow-y-auto pb-4 scrollbar-hide">
                  {boardData.quote.map(lead => <KanbanCard key={lead.id} lead={lead} />)}
                </div>
              </div>

              {/* Visited Column */}
              <div className="w-80 flex flex-col">
                <div className="pb-4 flex items-center justify-between shrink-0">
                  <h3 className="font-bold text-gray-700 text-sm">Visited &middot; 29</h3>
                </div>
                <div className="flex-1 overflow-y-auto pb-4 scrollbar-hide">
                  {boardData.visited.map(lead => <KanbanCard key={lead.id} lead={lead} />)}
                </div>
              </div>

              {/* Won / Lost Column */}
              <div className="w-80 flex flex-col">
                <div className="pb-4 flex items-center justify-between shrink-0">
                  <h3 className="font-bold text-gray-800 text-sm">Won &middot; 58 / Lost &middot; 21</h3>
                </div>
                <div className="flex-1 overflow-y-auto pb-4 scrollbar-hide">
                  {boardData.wonLost.map(lead => <KanbanCard key={lead.id} lead={lead} />)}
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="p-10">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-medium">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Treatment</th>
                    <th className="px-6 py-4">Source</th>
                    <th className="px-6 py-4">Status / Tag</th>
                    <th className="px-6 py-4">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[...boardData.new, ...boardData.contacted, ...boardData.quote, ...boardData.visited, ...boardData.wonLost].map(lead => (
                    <tr key={lead.id} className="hover:bg-gray-50/50 cursor-pointer">
                      <td className="px-6 py-4 font-semibold text-gray-900">{lead.name}</td>
                      <td className="px-6 py-4 text-gray-700">{lead.treatment}</td>
                      <td className="px-6 py-4 text-gray-500">{lead.source || '-'}</td>
                      <td className="px-6 py-4">
                        {lead.tag ? (
                          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${getTagClasses(lead.tagType)}`}>
                            {lead.tag}
                          </span>
                        ) : <span className="text-gray-400">-</span>}
                      </td>
                      <td className="px-6 py-4 text-gray-500">{lead.meta || 'Recent'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-nav/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-lg text-gray-900">Add New Lead</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                <Search size={20} className="hidden" /> {/* Using Search icon as placeholder, actually we need an X. I'll just write 'Close' */}
                <span className="text-sm font-semibold">Close</span>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowAddModal(false); showToast('New lead added successfully!'); }} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 cursor-pointer">Patient Name</label>
                <input type="text" required placeholder="e.g. Ramesh K." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 cursor-pointer">Treatment / Enquiry</label>
                <input type="text" required placeholder="e.g. Knee Replacement Cost" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 cursor-pointer">Source</label>
                  <select required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer">
                    <option value="">Select source</option>
                    <option>Walk-in</option>
                    <option>Website</option>
                    <option>WhatsApp</option>
                    <option>Facebook</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 cursor-pointer">Priority</label>
                  <select required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer">
                    <option>Normal</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2.5 text-sm font-semibold border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors cursor-pointer">Create Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Toast Notification */}
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
