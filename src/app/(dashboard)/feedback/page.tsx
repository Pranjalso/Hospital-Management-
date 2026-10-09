"use client";

import React, { useState } from "react";
import { Search, Filter, MessageSquare, Star, Send, ArrowUpRight, TrendingUp, ThumbsUp, ThumbsDown, UserPlus, HeartPulse } from "lucide-react";

type NPSCategory = 'Promoter' | 'Passive' | 'Detractor';

interface Feedback {
  id: string;
  patient: string;
  department: string;
  doctor: string;
  npsScore: number;
  rating: number;
  comment: string;
  category: NPSCategory;
  date: string;
}

const FEEDBACK_DATA: Feedback[] = [
  { id: "FB-101", patient: "Rajesh Kumar", department: "Cardiology", doctor: "Dr. Faizal Khan", npsScore: 9, rating: 5, comment: "Excellent care and attention from the nursing staff.", category: "Promoter", date: "08 Oct 2026" },
  { id: "FB-102", patient: "Sneha Patel", department: "Maternity", doctor: "Dr. Sunita Sharma", npsScore: 10, rating: 5, comment: "The birthing suite was amazing. Doctor was very patient.", category: "Promoter", date: "07 Oct 2026" },
  { id: "FB-103", patient: "Amit Singh", department: "Orthopedics", doctor: "Dr. Rohan Desai", npsScore: 5, rating: 3, comment: "Wait times were too long in the OPD.", category: "Detractor", date: "06 Oct 2026" },
  { id: "FB-104", patient: "Pooja Verma", department: "General Medicine", doctor: "Dr. Arvind Mehta", npsScore: 8, rating: 4, comment: "Good experience overall, slightly expensive.", category: "Passive", date: "05 Oct 2026" },
  { id: "FB-105", patient: "Neha Gupta", department: "Pediatrics", doctor: "Dr. Kavita Iyer", npsScore: 2, rating: 1, comment: "Very bad experience with the billing department.", category: "Detractor", date: "04 Oct 2026" },
];

export default function FeedbackPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredFeedback = FEEDBACK_DATA.filter(fb => 
    fb.patient.toLowerCase().includes(searchQuery.toLowerCase()) || 
    fb.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryStyles = (category: NPSCategory) => {
    switch (category) {
      case 'Promoter': return 'bg-success/10 text-success border-success/20';
      case 'Passive': return 'bg-warning/10 text-warning border-warning/20';
      case 'Detractor': return 'bg-critical/10 text-critical border-critical/20';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={14} className={i < rating ? "fill-orange-400 text-orange-400" : "text-gray-300"} />
    ));
  };

  return (
    <div className="h-full flex flex-col bg-[#F6F8F8] animate-in fade-in duration-300 relative">
      
      {/* Header Area */}
      <div className="bg-white shrink-0 z-10 shadow-sm border-b border-gray-100">
        <header className="flex flex-col md:flex-row md:items-center justify-between px-4 md:px-10 py-4 md:py-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patient Feedback & NPS</h1>
            <p className="text-sm text-gray-400 mt-1 font-medium">Monitor patient satisfaction and Net Promoter Score</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient, dept..."
                className="cursor-text pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full md:w-72 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5E5E]/20 transition-all placeholder:text-gray-400 font-medium"
              />
            </div>
            <button 
              onClick={() => setShowFilters(true)}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Filter size={16} /> Filters
            </button>
            <button 
              onClick={() => setShowSurvey(true)}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-[#0B5E5E] text-white rounded-lg text-sm font-semibold hover:bg-[#0B5E5E]/90 transition-colors shadow-sm"
            >
              <Send size={16} /> Send Survey
            </button>
          </div>
        </header>
      </div>

      <div className="flex-1 overflow-auto p-4 md:p-10 scrollbar-hide space-y-8">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <HeartPulse className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Average NPS</p>
              <h3 className="text-2xl font-bold text-gray-900">72</h3>
              <p className="text-xs font-semibold text-success mt-2 flex items-center gap-1">
                <TrendingUp size={12} /> +4 pts this month
              </p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <ThumbsUp className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Promoters (9-10)</p>
              <h3 className="text-2xl font-bold text-gray-900">82%</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
              <UserPlus className="text-orange-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Passives (7-8)</p>
              <h3 className="text-2xl font-bold text-gray-900">12%</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
              <ThumbsDown className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Detractors (0-6)</p>
              <h3 className="text-2xl font-bold text-gray-900">6%</h3>
              <p className="text-xs font-semibold text-critical mt-2 flex items-center gap-1">
                <ArrowUpRight size={12} /> Action Required
              </p>
            </div>
          </div>
        </div>

        {/* Main Table Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-max text-sm text-left whitespace-nowrap">
            <thead className="bg-white text-gray-500 font-bold border-b border-gray-100">
              <tr>
                <th className="px-6 py-5">Patient Name</th>
                <th className="px-6 py-5">Department</th>
                <th className="px-6 py-5">NPS (0-10)</th>
                <th className="px-6 py-5">Rating</th>
                <th className="px-6 py-5 max-w-[300px]">Feedback Comment</th>
                <th className="px-6 py-5">Date</th>
                <th className="px-6 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredFeedback.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400 font-medium">
                    No feedback found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredFeedback.map((fb) => (
                  <tr key={fb.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 cursor-pointer hover:text-[#0B5E5E] transition-colors">
                        {fb.patient}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">{fb.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-600">{fb.department}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{fb.doctor}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold border ${getCategoryStyles(fb.category)}`}>
                        {fb.npsScore} - {fb.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        {renderStars(fb.rating)}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-[300px] truncate text-gray-600 font-medium">
                      &quot;{fb.comment}&quot;
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-600">{fb.date}</td>
                    <td className="px-6 py-4 text-right pr-8">
                      <button 
                        onClick={() => setSelectedFeedback(fb)}
                        className="text-[#0B5E5E] font-bold hover:text-[#0B5E5E]/80 transition-colors cursor-pointer text-sm"
                      >
                        Read More
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
              <h3 className="font-bold text-lg text-gray-900">Filter Feedback</h3>
              <button onClick={() => setShowFilters(false)} className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors text-sm font-semibold">Close</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 cursor-pointer">NPS Category</label>
                <select className="cursor-pointer w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white">
                  <option>All Categories</option>
                  <option>Promoters (9-10)</option>
                  <option>Passives (7-8)</option>
                  <option>Detractors (0-6)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 cursor-pointer">Department</label>
                <select className="cursor-pointer w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white">
                  <option>All Departments</option>
                  <option>Cardiology</option>
                  <option>Orthopedics</option>
                  <option>Maternity</option>
                  <option>Pediatrics</option>
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

      {/* Send Survey Modal */}
      {showSurvey && (
        <div className="fixed inset-0 z-50 bg-nav/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-lg text-gray-900">Send NPS Survey</h3>
              <button onClick={() => setShowSurvey(false)} className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors text-sm font-semibold">Close</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowSurvey(false); showToast('Survey campaigns triggered successfully!'); }} className="p-6 space-y-4">
              <div>
                <label className="cursor-pointer block text-sm font-semibold text-gray-700 mb-1.5">Target Audience</label>
                <select className="cursor-pointer w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5E5E]/20">
                  <option>Recent Discharges (Last 24h)</option>
                  <option>Recent OPD Consults (Last 24h)</option>
                  <option>All Patients (Monthly Sweep)</option>
                </select>
              </div>
              <div>
                <label className="cursor-pointer block text-sm font-semibold text-gray-700 mb-1.5">Survey Channel</label>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                    <input type="checkbox" defaultChecked className="cursor-pointer rounded text-[#0B5E5E] focus:ring-[#0B5E5E]" /> SMS
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                    <input type="checkbox" defaultChecked className="cursor-pointer rounded text-[#0B5E5E] focus:ring-[#0B5E5E]" /> Email
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                    <input type="checkbox" className="cursor-pointer rounded text-[#0B5E5E] focus:ring-[#0B5E5E]" /> WhatsApp
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowSurvey(false)} className="cursor-pointer px-5 py-2.5 text-sm font-semibold border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="cursor-pointer px-5 py-2.5 text-sm font-semibold text-white bg-[#0B5E5E] rounded-lg hover:bg-[#0B5E5E]/90 transition-colors flex items-center gap-2">
                  <Send size={16} /> Send Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Read More Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 z-50 bg-nav/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <MessageSquare className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900">Feedback from {selectedFeedback.patient}</h3>
                  <p className="text-sm text-gray-500 mt-0.5 font-medium">{selectedFeedback.date} &middot; {selectedFeedback.department}</p>
                </div>
              </div>
              <button onClick={() => setSelectedFeedback(null)} className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors text-sm font-semibold">Close</button>
            </div>
            
            <div className="p-8 bg-white space-y-6">
              
              <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Score</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-bold border ${getCategoryStyles(selectedFeedback.category)}`}>
                    NPS {selectedFeedback.npsScore} ({selectedFeedback.category})
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Rating</p>
                  <div className="flex items-center gap-1 mt-2">
                    {renderStars(selectedFeedback.rating)}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Attending Doctor</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">{selectedFeedback.doctor}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Detailed Comment</h4>
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-gray-700 italic">&quot;{selectedFeedback.comment}&quot;</p>
                </div>
              </div>

              {selectedFeedback.category === 'Detractor' && (
                <div className="bg-critical/5 p-5 rounded-xl border border-critical/20">
                  <h4 className="font-bold text-critical mb-2 flex items-center gap-2">
                    <ArrowUpRight size={16} /> Resolution Required
                  </h4>
                  <p className="text-sm text-gray-700 mb-4">This patient is a detractor. Please follow up immediately to resolve their concerns.</p>
                  <textarea 
                    className="cursor-text w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-critical/20 bg-white resize-none" 
                    rows={3} 
                    placeholder="Log your follow-up action here..."
                  ></textarea>
                </div>
              )}

            </div>

            <div className="flex justify-end gap-3 p-5 bg-gray-50/50 border-t border-gray-100">
              <button 
                onClick={() => {
                  showToast('Follow-up task created for patient relations.');
                  setSelectedFeedback(null);
                }}
                className="cursor-pointer px-5 py-2.5 text-sm font-semibold border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Create Follow-up Task
              </button>
              <button 
                onClick={() => {
                  showToast('Replied to patient successfully.');
                  setSelectedFeedback(null);
                }}
                className="cursor-pointer px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                Mark as Resolved
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
