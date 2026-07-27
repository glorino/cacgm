'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, Bell, Search } from 'lucide-react';
import Link from 'next/link';
import BranchFilter from './BranchFilter';
import { getInitials, getRoleLabel } from '@/lib/utils';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backHref?: string;
  showBranchFilter?: boolean;
  userRole?: string;
  userName?: string;
  selectedBranch?: string;
  onBranchChange?: (branchId: string) => void;
}

export default function Header({
  title,
  subtitle,
  showBack = false,
  backHref = '/dashboard',
  showBranchFilter = false,
  userRole = 'MEMBER',
  userName = 'User',
  selectedBranch,
  onBranchChange,
}: HeaderProps) {
  const canFilterBranch = ['GENERAL_OVERSEER', 'SUPER_ADMIN'].includes(userRole);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <Link
            href={backHref}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft size={20} className="text-slate-500" />
          </Link>
        )}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {showBranchFilter && canFilterBranch && (
          <BranchFilter
            selectedBranch={selectedBranch}
            onBranchChange={onBranchChange}
          />
        )}

        <button className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors relative">
          <Bell size={18} className="text-slate-500" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-[9px] text-white font-bold">3</span>
          </span>
        </button>

        <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold text-xs">
              {getInitials(userName)}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-800">{userName}</p>
            <p className="text-[10px] text-slate-500">{getRoleLabel(userRole)}</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
