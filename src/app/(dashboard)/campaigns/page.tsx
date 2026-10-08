"use client";

import React, { useState } from "react";
import { Search, Plus, Filter, TrendingUp, Users, DollarSign, Activity, Play, Pause, CheckCircle } from "lucide-react";

type CampaignStatus = 'Active' | 'Paused' | 'Completed';

interface Campaign {
  id: string;
  name: string;
  platform: string;
  status: CampaignStatus;
  budget: number;
  spend: number;
  leads: number;
  conversions: number;
}

const CAMPAIGNS_DATA: Campaign[] = [
  { id: "C-001", name: "IVF Spring Awareness", platform: "Facebook Ads", status: 'Active', budget: 50000, spend: 32000, leads: 145, conversions: 12 },
  { id: "C-002", name: "Cardiac Health Camp", platform: "Offline / Local", status: 'Completed', budget: 20000, spend: 20000, leads: 210, conversions: 45 },
  { id: "C-003", name: "Maternity Packages Search", platform: "Google Ads", status: 'Active', budget: 100000, spend: 85000, leads: 340, conversions: 28 },
  { id: "C-004", name: "Knee Replacement Retargeting", platform: "Instagram", status: 'Paused', budget: 30000, spend: 12000, leads: 45, conversions: 3 },
  { id: "C-005", name: "Free Eye Checkup Drive", platform: "SMS / WhatsApp", status: 'Active', budget: 5000, spend: 2500, leads: 85, conversions: 18 },
];

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredCampaigns = CAMPAIGNS_DATA.filter(camp => 
    camp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    camp.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const getStatusStyles = (status: CampaignStatus) => {
    switch (status) {
      case 'Active': return 'bg-success/10 text-success border-success/20';
      case 'Paused': return 'bg-warning/10 text-warning border-warning/20';
      case 'Completed': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#F6F8F8] animate-in fade-in duration-300 relative">
      
      {/* Header Area */}
      <div className="bg-white shrink-0 z-10 shadow-sm border-b border-gray-100">
        <header className="flex items-center justify-between px-10 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Marketing Campaigns</h1>
            <p className="text-sm text-gray-400 mt-1 font-medium">Track lead generation, spend, and ROI</p>
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
                placeholder="Search campaigns..."
                className="cursor-text pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-72 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400 font-medium"
              />
            </div>
            <button 
              onClick={() => setShowFilters(true)}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Filter size={16} /> Filters
            </button>
            <button 
              onClick={() => setShowNewCampaign(true)}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-[#0B5E5E] text-white rounded-lg text-sm font-semibold hover:bg-[#0B5E5E]/90 transition-colors shadow-sm"
            >
              <Plus size={16} /> New Campaign
            </button>
          </div>
        </header>
      </div>

      <div className="flex-1 overflow-auto p-10 scrollbar-hide space-y-8">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <DollarSign className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Total Ad Spend</p>
              <h3 className="text-2xl font-bold text-gray-900">₹1,51,500</h3>
              <p className="text-xs font-semibold text-success mt-2 flex items-center gap-1">
                <TrendingUp size={12} /> +12% this month
              </p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <Users className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Total Leads</p>
              <h3 className="text-2xl font-bold text-gray-900">825</h3>
              <p className="text-xs font-semibold text-success mt-2 flex items-center gap-1">
                <TrendingUp size={12} /> +24% this month
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
              <Activity className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Avg. Cost Per Lead</p>
              <h3 className="text-2xl font-bold text-gray-900">₹183</h3>
              <p className="text-xs font-semibold text-success mt-2 flex items-center gap-1">
                <TrendingUp size={12} /> -5% this month
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
              <CheckCircle className="text-orange-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Overall Conversion</p>
              <h3 className="text-2xl font-bold text-gray-900">12.8%</h3>
              <p className="text-xs font-semibold text-success mt-2 flex items-center gap-1">
                <TrendingUp size={12} /> +1.2% this month
              </p>
            </div>
          </div>
        </div>

        {/* Main Table Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-max text-sm text-left whitespace-nowrap">
            <thead className="bg-white text-gray-500 font-bold border-b border-gray-100">
              <tr>
                <th className="px-6 py-5">Campaign Name</th>
                <th className="px-6 py-5">Platform</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Budget</th>
                <th className="px-6 py-5">Spend</th>
                <th className="px-6 py-5">Leads</th>
                <th className="px-6 py-5">Conv. Rate</th>
                <th className="px-6 py-5">CPL</th>
                <th className="px-6 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCampaigns.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-gray-400 font-medium">
                    No campaigns found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredCampaigns.map((camp) => {
                  const convRate = ((camp.conversions / camp.leads) * 100).toFixed(1);
                  const cpl = camp.leads > 0 ? (camp.spend / camp.leads).toFixed(0) : "0";
                  
                  return (
                    <tr key={camp.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900 cursor-pointer hover:text-primary transition-colors">
                          {camp.name}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">{camp.id}</div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-600">{camp.platform}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold border ${getStatusStyles(camp.status)}`}>
                          {camp.status === 'Active' && <Play size={12} />}
                          {camp.status === 'Paused' && <Pause size={12} />}
                          {camp.status === 'Completed' && <CheckCircle size={12} />}
                          {camp.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900">{formatCurrency(camp.budget)}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">{formatCurrency(camp.spend)}</td>
                      <td className="px-6 py-4 font-semibold text-gray-600">{camp.leads}</td>
                      <td className="px-6 py-4 font-semibold text-gray-600">{convRate}%</td>
                      <td className="px-6 py-4 font-semibold text-gray-600">₹{cpl}</td>
                      <td className="px-6 py-4 text-right pr-8">
                        <button 
                          onClick={() => setSelectedCampaign(camp)}
                          className="text-[#0B5E5E] font-bold hover:text-[#0B5E5E]/80 transition-colors cursor-pointer text-sm"
                        >
                          View Analytics
                        </button>
                      </td>
                    </tr>
                  )
                })
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
              <h3 className="font-bold text-lg text-gray-900">Filter Campaigns</h3>
              <button onClick={() => setShowFilters(false)} className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors text-sm font-semibold">Close</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 cursor-pointer">Platform</label>
                <select className="cursor-pointer w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white">
                  <option>All Platforms</option>
                  <option>Google Ads</option>
                  <option>Facebook Ads</option>
                  <option>Offline / Local</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 cursor-pointer">Status</label>
                <select className="cursor-pointer w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white">
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Paused</option>
                  <option>Completed</option>
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

      {/* New Campaign Modal */}
      {showNewCampaign && (
        <div className="fixed inset-0 z-50 bg-nav/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-lg text-gray-900">Launch New Campaign</h3>
              <button onClick={() => setShowNewCampaign(false)} className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors text-sm font-semibold">Close</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowNewCampaign(false); showToast('Campaign launched successfully!'); }} className="p-6 space-y-4">
              <div>
                <label className="cursor-pointer block text-sm font-semibold text-gray-700 mb-1.5">Campaign Name</label>
                <input type="text" required placeholder="e.g. Summer Health Check" className="cursor-text w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5E5E]/20" />
              </div>
              <div>
                <label className="cursor-pointer block text-sm font-semibold text-gray-700 mb-1.5">Platform</label>
                <select required className="cursor-pointer w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5E5E]/20">
                  <option>Google Ads</option>
                  <option>Facebook / Instagram</option>
                  <option>SMS / WhatsApp Marketing</option>
                  <option>Offline / Local Camp</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="cursor-pointer block text-sm font-semibold text-gray-700 mb-1.5">Total Budget (₹)</label>
                  <input type="number" required placeholder="0" className="cursor-text w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5E5E]/20" />
                </div>
                <div>
                  <label className="cursor-pointer block text-sm font-semibold text-gray-700 mb-1.5">Target Leads</label>
                  <input type="number" required placeholder="0" className="cursor-text w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5E5E]/20" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowNewCampaign(false)} className="cursor-pointer px-5 py-2.5 text-sm font-semibold border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="cursor-pointer px-5 py-2.5 text-sm font-semibold text-white bg-[#0B5E5E] rounded-lg hover:bg-[#0B5E5E]/90 transition-colors">Launch Campaign</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 bg-nav/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
              <div>
                <h3 className="font-bold text-xl text-gray-900">{selectedCampaign.name} Analytics</h3>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                  <span className="font-semibold text-gray-700">{selectedCampaign.platform}</span> &middot; 
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold border ${getStatusStyles(selectedCampaign.status)}`}>
                    {selectedCampaign.status}
                  </span>
                </p>
              </div>
              <button onClick={() => setSelectedCampaign(null)} className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors text-sm font-semibold">Close</button>
            </div>
            
            <div className="p-8 bg-[#F6F8F8]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <p className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Total Budget</p>
                  <p className="text-xl font-bold text-gray-900">{formatCurrency(selectedCampaign.budget)}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <p className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Total Spend</p>
                  <p className="text-xl font-bold text-gray-900">{formatCurrency(selectedCampaign.spend)}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <p className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Leads</p>
                  <p className="text-xl font-bold text-gray-900">{selectedCampaign.leads}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <p className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Conversions</p>
                  <p className="text-xl font-bold text-success">{selectedCampaign.conversions}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp size={18} className="text-[#0B5E5E]" /> Performance Metrics
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                    <span className="text-sm font-semibold text-gray-600">Cost Per Lead (CPL)</span>
                    <span className="font-bold text-gray-900">
                      ₹{selectedCampaign.leads > 0 ? (selectedCampaign.spend / selectedCampaign.leads).toFixed(0) : "0"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                    <span className="text-sm font-semibold text-gray-600">Conversion Rate</span>
                    <span className="font-bold text-gray-900">
                      {selectedCampaign.leads > 0 ? ((selectedCampaign.conversions / selectedCampaign.leads) * 100).toFixed(1) : "0"}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                    <span className="text-sm font-semibold text-gray-600">Cost Per Acquisition (CPA)</span>
                    <span className="font-bold text-gray-900">
                      ₹{selectedCampaign.conversions > 0 ? (selectedCampaign.spend / selectedCampaign.conversions).toFixed(0) : "0"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-600">Estimated ROI</span>
                    <span className="font-bold text-success">
                      {selectedCampaign.conversions > 0 ? "+" + (((selectedCampaign.conversions * 15000 - selectedCampaign.spend) / selectedCampaign.spend) * 100).toFixed(0) + "%" : "0%"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end p-5 bg-white border-t border-gray-100">
              <button 
                onClick={() => {
                  showToast('Exporting analytics report...');
                  setSelectedCampaign(null);
                }}
                className="cursor-pointer px-5 py-2.5 text-sm font-semibold text-white bg-[#0B5E5E] rounded-lg hover:bg-[#0B5E5E]/90 transition-colors"
              >
                Download Report
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
