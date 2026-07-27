'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Check } from 'lucide-react';
import { BRANCHES_DATA } from '@/lib/constants';

interface BranchFilterProps {
  selectedBranch?: string;
  onBranchChange?: (branchId: string) => void;
}

export default function BranchFilter({ selectedBranch = '', onBranchChange }: BranchFilterProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(selectedBranch);

  useEffect(() => {
    setSelected(selectedBranch);
  }, [selectedBranch]);

  const selectedBranchData = BRANCHES_DATA.find((b) => b.id === selected);

  const handleSelect = (branchId: string) => {
    setSelected(branchId === selected ? '' : branchId);
    onBranchChange?.(branchId === selected ? '' : branchId);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm min-w-[200px]"
      >
        <MapPin size={16} className="text-primary flex-shrink-0" />
        <span className="flex-1 text-left truncate text-slate-700">
          {selectedBranchData ? selectedBranchData.name : 'All Branches'}
        </span>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden"
            >
              <div className="p-2 max-h-64 overflow-y-auto">
                <button
                  onClick={() => handleSelect('')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <MapPin size={14} className="text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-700">All Branches</p>
                    <p className="text-xs text-slate-400">View data across all branches</p>
                  </div>
                  {!selected && <Check size={16} className="text-primary" />}
                </button>

                {BRANCHES_DATA.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => handleSelect(branch.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                      <MapPin size={14} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-700 truncate">{branch.name}</p>
                      <p className="text-xs text-slate-400 truncate">{branch.pastorName}</p>
                    </div>
                    {selected === branch.id && <Check size={16} className="text-primary flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
