"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function BranchDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("All branches");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const branches = ["All branches", "Main campus", "City branch", "Satellite unit"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
      >
        Branch: {selected === "All branches" ? "All" : selected} <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-50 py-1 animate-in fade-in zoom-in-95 duration-100">
          {branches.map(b => (
            <button
              key={b}
              onClick={() => { setSelected(b); setIsOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors flex items-center justify-between cursor-pointer"
            >
              {b}
              {selected === b && <Check size={14} className="text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
