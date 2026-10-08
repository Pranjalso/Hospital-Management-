"use client";

import React, { useState } from "react";
import { User, Shield, Bell, Link2, Building, Mail, Phone, MapPin, Save, Upload } from "lucide-react";

type SettingsTab = 'General' | 'Roles & Access' | 'Notifications' | 'Integrations';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('General');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const tabs: { name: SettingsTab, icon: React.ReactNode }[] = [
    { name: 'General', icon: <Building size={16} /> },
    { name: 'Roles & Access', icon: <Shield size={16} /> },
    { name: 'Notifications', icon: <Bell size={16} /> },
    { name: 'Integrations', icon: <Link2 size={16} /> },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`${activeTab} settings saved successfully!`);
  };

  return (
    <div className="h-full flex flex-col bg-[#F6F8F8] animate-in fade-in duration-300 relative">
      
      {/* Header Area */}
      <div className="bg-white shrink-0 z-10 shadow-sm border-b border-gray-100">
        <header className="flex items-center justify-between px-10 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
            <p className="text-sm text-gray-400 mt-1 font-medium">Manage hospital profile, user roles, and system preferences</p>
          </div>
        </header>

        {/* Tabs */}
        <div className="px-10 flex items-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`cursor-pointer px-4 py-2 mb-4 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === tab.name
                  ? 'border-2 border-[#0B5E5E] text-[#0B5E5E] shadow-sm'
                  : 'border-2 border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {tab.icon} {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-10 scrollbar-hide">
        
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100">
          
          {activeTab === 'General' && (
            <form onSubmit={handleSave} className="animate-in fade-in slide-in-from-bottom-2">
              <div className="p-8 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Hospital Profile</h3>
                
                <div className="flex items-start gap-8 mb-8">
                  <div className="w-24 h-24 rounded-full bg-gray-50 border border-gray-200 flex flex-col items-center justify-center text-gray-400 shrink-0">
                    <Building size={32} className="mb-1 text-gray-300" />
                    <span className="text-[10px] font-bold uppercase">Logo</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1">Brand Logo</h4>
                    <p className="text-sm text-gray-500 mb-4">Upload a high-res image. JPG or PNG. Max size 2MB.</p>
                    <button type="button" className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                      <Upload size={16} /> Upload New
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="cursor-pointer block text-sm font-semibold text-gray-700 mb-1.5">Hospital Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none"><Building size={16} className="text-gray-400" /></div>
                      <input type="text" defaultValue="City Care Hospital" className="cursor-text w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5E5E]/20" />
                    </div>
                  </div>
                  <div>
                    <label className="cursor-pointer block text-sm font-semibold text-gray-700 mb-1.5">Primary Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none"><Mail size={16} className="text-gray-400" /></div>
                      <input type="email" defaultValue="admin@citycare.com" className="cursor-text w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5E5E]/20" />
                    </div>
                  </div>
                  <div>
                    <label className="cursor-pointer block text-sm font-semibold text-gray-700 mb-1.5">Support Phone</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none"><Phone size={16} className="text-gray-400" /></div>
                      <input type="tel" defaultValue="+91 1800 123 4567" className="cursor-text w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5E5E]/20" />
                    </div>
                  </div>
                  <div>
                    <label className="cursor-pointer block text-sm font-semibold text-gray-700 mb-1.5">Physical Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none"><MapPin size={16} className="text-gray-400" /></div>
                      <input type="text" defaultValue="123 Health Ave, Mumbai, India" className="cursor-text w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5E5E]/20" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50/50 flex justify-end">
                <button type="submit" className="cursor-pointer flex items-center gap-2 px-6 py-2.5 bg-[#0B5E5E] text-white rounded-lg text-sm font-semibold hover:bg-[#0B5E5E]/90 transition-colors shadow-sm">
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </form>
          )}

          {activeTab === 'Roles & Access' && (
            <div className="animate-in fade-in slide-in-from-bottom-2">
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">User Management</h3>
                    <p className="text-sm text-gray-500 mt-1">Manage platform access and role-based permissions.</p>
                  </div>
                  <button onClick={() => showToast('Invite modal opened.')} className="cursor-pointer px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                    + Invite User
                  </button>
                </div>

                <div className="border border-gray-200 rounded-xl overflow-x-auto scrollbar-hide">
                  <table className="w-full min-w-max text-sm text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-gray-600">User Name</th>
                        <th className="px-6 py-4 font-semibold text-gray-600">Email</th>
                        <th className="px-6 py-4 font-semibold text-gray-600">Role</th>
                        <th className="px-6 py-4 font-semibold text-gray-600 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { name: "Pranjal Soni", email: "admin@hospital.com", role: "Super Admin" },
                        { name: "Dr. Ramesh Verma", email: "dr.ramesh@hospital.com", role: "Doctor" },
                        { name: "Sneha Kapoor", email: "reception@hospital.com", role: "Receptionist" },
                      ].map((user, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#0B5E5E]/10 flex items-center justify-center text-[#0B5E5E]">
                              <User size={14} />
                            </div>
                            {user.name}
                          </td>
                          <td className="px-6 py-4 text-gray-600 font-medium">{user.email}</td>
                          <td className="px-6 py-4">
                            <select defaultValue={user.role} className="cursor-pointer px-3 py-1.5 border border-gray-200 rounded-md text-xs font-semibold bg-white focus:outline-none focus:ring-1 focus:ring-[#0B5E5E]">
                              <option>Super Admin</option>
                              <option>Doctor</option>
                              <option>Receptionist</option>
                              <option>Marketing</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => showToast(`Permissions updated for ${user.name}`)} className="cursor-pointer text-[#0B5E5E] font-bold text-xs hover:underline">Update</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Notifications' && (
            <form onSubmit={handleSave} className="animate-in fade-in slide-in-from-bottom-2">
              <div className="p-8 border-b border-gray-100 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Alert Preferences</h3>
                  <p className="text-sm text-gray-500 mt-1">Configure how and when the system sends automated alerts.</p>
                </div>

                <div className="space-y-4 max-w-2xl">
                  {[
                    { title: "New Appointment Booked", desc: "Notify via email when a patient books a new appointment online." },
                    { title: "Critical Lab Results", desc: "Send an SMS immediately when critical results are uploaded." },
                    { title: "Daily Revenue Summary", desc: "Receive a summary of the day's financial performance at 9PM." },
                    { title: "Patient Feedback Alert", desc: "Notify the admin if a patient leaves a Detractor (0-6) score." },
                  ].map((setting, idx) => (
                    <div key={idx} className="flex items-start justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl">
                      <div>
                        <p className="font-bold text-gray-900 text-sm mb-1">{setting.title}</p>
                        <p className="text-xs text-gray-500 font-medium">{setting.desc}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="cursor-pointer flex items-center gap-2 text-xs font-bold text-gray-600">
                          <input type="checkbox" defaultChecked className="cursor-pointer rounded text-[#0B5E5E] focus:ring-[#0B5E5E]" /> Email
                        </label>
                        <label className="cursor-pointer flex items-center gap-2 text-xs font-bold text-gray-600">
                          <input type="checkbox" defaultChecked={idx % 2 === 0} className="cursor-pointer rounded text-[#0B5E5E] focus:ring-[#0B5E5E]" /> SMS
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-gray-50/50 flex justify-end">
                <button type="submit" className="cursor-pointer flex items-center gap-2 px-6 py-2.5 bg-[#0B5E5E] text-white rounded-lg text-sm font-semibold hover:bg-[#0B5E5E]/90 transition-colors shadow-sm">
                  <Save size={16} /> Save Preferences
                </button>
              </div>
            </form>
          )}

          {activeTab === 'Integrations' && (
            <div className="animate-in fade-in slide-in-from-bottom-2">
              <div className="p-8 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Third-Party Integrations</h3>
                  <p className="text-sm text-gray-500 mt-1">Connect your CRM with external platforms and tools.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {[
                    { name: "Google Calendar", status: "Connected", desc: "Sync doctor schedules seamlessly." },
                    { name: "WhatsApp Business API", status: "Disconnected", desc: "Automate appointment reminders." },
                    { name: "Razorpay", status: "Connected", desc: "Process online patient payments." },
                    { name: "Mailchimp", status: "Disconnected", desc: "Run email marketing campaigns." },
                  ].map((integration, idx) => (
                    <div key={idx} className="p-5 border border-gray-200 rounded-xl flex flex-col justify-between h-full">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold text-gray-900">{integration.name}</h4>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${integration.status === 'Connected' ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-500'}`}>
                            {integration.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-6 font-medium">{integration.desc}</p>
                      </div>
                      <button 
                        onClick={() => showToast(`Toggling connection for ${integration.name}...`)}
                        className={`cursor-pointer w-full py-2 rounded-lg text-sm font-semibold border transition-colors ${
                          integration.status === 'Connected' ? 'border-gray-200 text-gray-700 hover:bg-gray-50' : 'border-[#0B5E5E] text-[#0B5E5E] bg-[#0B5E5E]/5 hover:bg-[#0B5E5E]/10'
                        }`}
                      >
                        {integration.status === 'Connected' ? 'Disconnect' : 'Connect Account'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

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
