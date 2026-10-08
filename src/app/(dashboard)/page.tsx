import React from "react";
import { Search, ChevronDown, Plus, ArrowUp, ArrowDown } from "lucide-react";
import NewRegistrationButton from "@/components/ui/NewRegistrationButton";
import BranchDropdown from "@/components/ui/BranchDropdown";

export default function Dashboard() {
  return (
    <>
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6 bg-canvas shrink-0">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Good morning, Dr. Mehta</h1>
            <p className="text-sm text-gray-500 mt-1">Thursday, 8 Oct &middot; All branches</p>
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
          
          {/* KPI Grid */}
          <div className="grid grid-cols-6 gap-4 mb-6">
            <KpiCard
              title="Today's OPD"
              value="248"
              trend={{ value: "12% vs last Thu", direction: "up", color: "text-success" }}
            />
            <KpiCard
              title="Bed occupancy"
              value="82%"
              subtext="164 / 200 beds"
            />
            <KpiCard
              title="New leads"
              value="37"
              trend={{ value: "9 from ads", direction: "up", color: "text-success" }}
            />
            <KpiCard
              title="Lead conversion"
              value="41%"
              trend={{ value: "3 pts MoM", direction: "down", color: "text-alert" }}
            />
            <KpiCard
              title="Revenue today"
              value="₹18.4L"
              trend={{ value: "6% vs avg", direction: "up", color: "text-success" }}
            />
            <KpiCard
              title="Pending TPA claims"
              value="23"
              subtext="7 older than 15 days"
              subtextColor="text-alert"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* OPD Footfall Chart */}
            <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm flex flex-col">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">OPD footfall — last 7 days</h3>
              <div className="flex items-end justify-between flex-1 gap-2 mt-4">
                {[40, 50, 20, 75, 65, 60, 60].map((h, i) => (
                  <div key={i} className="w-full bg-primary-soft/60 hover:bg-primary-soft transition-colors rounded-t-sm relative group" style={{ height: `${h}%` }}>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                <span>Fri</span><span>Sat</span><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span>
              </div>
            </div>

            {/* Lead to Admission Funnel */}
            <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm flex flex-col">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Lead → admission funnel (month)</h3>
              <div className="flex flex-col gap-3">
                <FunnelBar label="Enquiries" value={420} max={420} />
                <FunnelBar label="Contacted" value={318} max={420} />
                <FunnelBar label="Appointment booked" value={196} max={420} />
                <FunnelBar label="Visited" value={161} max={420} />
                <FunnelBar label="Admitted / procedure" value={58} max={420} />
              </div>
            </div>

            {/* Bed Occupancy by Ward */}
            <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm flex flex-col relative">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Bed occupancy by ward</h3>
              <div className="flex flex-col gap-3">
                <ProgressBar label="General" current={72} total={90} />
                <ProgressBar label="ICU" current={19} total={20} critical={true} />
                <ProgressBar label="Maternity" current={18} total={24} />
                <ProgressBar label="Paediatrics" current={22} total={30} />
                <ProgressBar label="Private" current={33} total={36} />
              </div>
              <p className="text-xs text-alert mt-4 font-medium">ICU above 90% — overflow plan suggested</p>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-3 gap-6">
            
            {/* Appointments Table */}
            <div className="col-span-2 bg-white rounded-lg p-5 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-700">Today's appointments</h3>
                <a href="#" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">View all &rarr;</a>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="text-gray-500 border-b border-gray-100">
                      <th className="pb-2 font-medium">Time</th>
                      <th className="pb-2 font-medium">Patient</th>
                      <th className="pb-2 font-medium">Doctor</th>
                      <th className="pb-2 font-medium">Dept</th>
                      <th className="pb-2 font-medium">Source</th>
                      <th className="pb-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <AppointmentRow time="09:30" patient="Ramesh Kulkarni" doctor="Dr. A. Rao" dept="Cardiology" source="App" status="In consult" statusType="primary" />
                    <AppointmentRow time="09:45" patient="Fatima Shaikh" doctor="Dr. S. Iyer" dept="Gynaecology" source="WhatsApp" status="Checked in" statusType="success" />
                    <AppointmentRow time="10:00" patient="Arjun Patil" doctor="Dr. M. Desai" dept="Orthopaedics" source="Referral" status="Waiting 18m" statusType="warning" />
                    <AppointmentRow time="10:15" patient="Lakshmi N." doctor="Dr. A. Rao" dept="Cardiology" source="Call centre" status="Booked" statusType="neutral" />
                    <AppointmentRow time="10:30" patient="Vikram Joshi" doctor="Dr. K. Nair" dept="Neurology" source="Website" status="No-show" statusType="alert" />
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column: Tasks and NPS */}
            <div className="col-span-1 flex flex-col gap-4">
              
              {/* Follow-ups */}
              <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm flex-1">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Follow-ups due today &middot; 14</h3>
                <div className="flex flex-col gap-3">
                  <TaskRow type="Post-discharge call" patient="Suresh Gowda" info="Day 3" />
                  <TaskRow type="Report ready" patient="Anita Rao" info="send + book review" />
                  <TaskRow type="Quote follow-up" patient="Cataract package" info="2nd try" />
                  <TaskRow type="TPA query" patient="Claim CL-2291" info="docs pending" />
                </div>
              </div>

              {/* NPS Card */}
              <div className="bg-[#0b1f1f] text-white rounded-lg p-5 flex items-center gap-4 shadow-sm">
                <div className="text-3xl font-bold">+62</div>
                <div>
                  <div className="text-sm font-semibold">Patient NPS &middot; 30 days</div>
                  <div className="text-xs text-gray-300 mt-0.5">412 responses &middot; 18 detractors need callback</div>
                </div>
              </div>

            </div>
          </div>

        </div>
    </>
  );
}

function KpiCard({ title, value, trend, subtext, subtextColor = "text-gray-500" }: { title: string, value: string, trend?: { value: string, direction: 'up'|'down', color: string }, subtext?: string, subtextColor?: string }) {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm flex flex-col">
      <h3 className="text-xs font-medium text-gray-500 mb-2">{title}</h3>
      <div className="text-2xl font-bold text-gray-900 leading-none">{value}</div>
      <div className="mt-2 text-xs font-medium flex items-center h-4">
        {trend && (
          <span className={`flex items-center gap-0.5 ${trend.color}`}>
            {trend.direction === 'up' ? <ArrowUp size={12} strokeWidth={3} /> : <ArrowDown size={12} strokeWidth={3} />}
            {trend.value}
          </span>
        )}
        {subtext && (
          <span className={subtextColor}>{subtext}</span>
        )}
      </div>
    </div>
  );
}

function FunnelBar({ label, value, max }: { label: string, value: number, max: number }) {
  const width = (value / max) * 100;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-gray-700">{label}</span>
        <span className="text-gray-900">{value}</span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${width}%` }}></div>
      </div>
    </div>
  );
}

function ProgressBar({ label, current, total, critical = false }: { label: string, current: number, total: number, critical?: boolean }) {
  const width = (current / total) * 100;
  const bgColor = critical ? 'bg-alert' : 'bg-primary';
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-gray-700">{label}</span>
        <span className="text-gray-900">{current}/{total}</span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${bgColor} rounded-full transition-all duration-500`} style={{ width: `${width}%` }}></div>
      </div>
    </div>
  );
}

function AppointmentRow({ time, patient, doctor, dept, source, status, statusType }: { time: string, patient: string, doctor: string, dept: string, source: string, status: string, statusType: 'primary' | 'success' | 'warning' | 'alert' | 'neutral' }) {
  
  const statusStyles = {
    primary: 'bg-primary/10 text-primary font-semibold',
    success: 'bg-success/10 text-success font-semibold',
    warning: 'bg-warning/10 text-warning font-semibold',
    alert: 'bg-alert/10 text-alert font-semibold',
    neutral: 'bg-gray-100 text-gray-700 font-semibold'
  };

  return (
    <tr className="hover:bg-gray-50/50 cursor-pointer">
      <td className="py-3 font-medium text-gray-900">{time}</td>
      <td className="py-3 text-gray-700">{patient}</td>
      <td className="py-3 text-gray-700">{doctor}</td>
      <td className="py-3 text-gray-700">{dept}</td>
      <td className="py-3 text-gray-700">{source}</td>
      <td className="py-3">
        <span className={`inline-block px-2.5 py-0.5 rounded text-xs ${statusStyles[statusType]}`}>
          {status}
        </span>
      </td>
    </tr>
  );
}

function TaskRow({ type, patient, info }: { type: string, patient: string, info: string }) {
  return (
    <label className="flex items-start gap-2 cursor-pointer group">
      <div className="w-3.5 h-3.5 rounded-sm border border-gray-300 mt-0.5 flex-shrink-0 group-hover:border-primary transition-colors bg-white"></div>
      <div className="text-xs text-gray-700 leading-snug">
        <span className="font-bold text-gray-900">{type}</span> &middot; {patient} &middot; <span className="text-gray-500">{info}</span>
      </div>
    </label>
  );
}
