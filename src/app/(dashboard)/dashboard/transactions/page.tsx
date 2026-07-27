'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Landmark, Filter, CheckCircle, Clock, XCircle, Download, Eye } from 'lucide-react';
import Header from '@/components/Header';
import { useUser } from '@/hooks/useUser';
import { AnimatedCard, PageTransition } from '@/components/AnimatedUI';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils';

const transactions = [
  { id: '1', member: 'Emmanuel Okonkwo', branch: 'HQ', amount: 50000, type: 'TITHE', status: 'SUCCESSFUL', date: '2025-07-25', ref: 'CACGM-M1K8P2-A3B4C5', flwId: 'FLW-3829103' },
  { id: '2', member: 'Grace Adeleke', branch: 'Surulere', amount: 25000, type: 'OFFERING', status: 'SUCCESSFUL', date: '2025-07-25', ref: 'CACGM-M1K7P1-D6E7F8', flwId: 'FLW-3829104' },
  { id: '3', member: 'David Nwachukwu', branch: 'Yaba', amount: 100000, type: 'SEED', status: 'SUCCESSFUL', date: '2025-07-24', ref: 'CACGM-M1K6P0-G9H0I1', flwId: 'FLW-3829105' },
  { id: '4', member: 'Sarah Ogundimu', branch: 'Lekki', amount: 15000, type: 'OFFERING', status: 'PENDING', date: '2025-07-24', ref: 'CACGM-M1K5O9-J2K3L4', flwId: null },
  { id: '5', member: 'Michael Ajayi', branch: 'Ikeja GRA', amount: 200000, type: 'DONATION', status: 'SUCCESSFUL', date: '2025-07-23', ref: 'CACGM-M1K4O8-M5N6O7', flwId: 'FLW-3829107' },
  { id: '6', member: 'Chioma Eze', branch: 'HQ', amount: 30000, type: 'TITHE', status: 'SUCCESSFUL', date: '2025-07-22', ref: 'CACGM-M1K3N7-P8Q9R0', flwId: 'FLW-3829108' },
  { id: '7', member: 'Tunde Bakare', branch: 'Ikorodu', amount: 10000, type: 'OFFERING', status: 'FAILED', date: '2025-07-21', ref: 'CACGM-M1K2N6-S1T2U3', flwId: null },
  { id: '8', member: 'Folake Coker', branch: 'HQ', amount: 75000, type: 'TITHE', status: 'SUCCESSFUL', date: '2025-07-20', ref: 'CACGM-M1K1N5-V4W5X6', flwId: 'FLW-3829110' },
];

export default function TransactionsPage() {
  const { userRole, userName } = useUser();
  const [branchFilter, setBranchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filtered = transactions.filter((tx) => {
    const matchesBranch = !branchFilter || tx.branch === branchFilter;
    const matchesStatus = !statusFilter || tx.status === statusFilter;
    const matchesType = !typeFilter || tx.type === typeFilter;
    return matchesBranch && matchesStatus && matchesType;
  });

  const totalAmount = filtered.reduce((sum, tx) => tx.status === 'SUCCESSFUL' ? sum + tx.amount : sum, 0);

  return (
    <PageTransition>
      <Header
        title="Transactions"
        subtitle={`Managing ${filtered.length} transactions · ${formatCurrency(totalAmount)} total`}
        showBranchFilter
        userRole={userRole}
        userName={userName}
        selectedBranch={branchFilter}
        onBranchChange={setBranchFilter}
      />

      <div className="flex flex-wrap gap-3 mb-6">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="">All Status</option>
          <option value="SUCCESSFUL">Successful</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
        </select>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="">All Types</option>
          <option value="TITHE">Tithe</option>
          <option value="OFFERING">Offering</option>
          <option value="SEED">Seed</option>
          <option value="DONATION">Donation</option>
          <option value="PROJECT">Project</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <AnimatedCard delay={0.1} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Member</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Branch</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase hidden lg:table-cell">Type</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase hidden lg:table-cell">Reference</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((tx, i) => (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.03 }}
                  className="hover:bg-slate-50/50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Landmark size={14} className="text-primary" />
                      </div>
                      <p className="text-sm font-medium text-slate-800">{tx.member}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 hidden md:table-cell">{tx.branch}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-800">{formatCurrency(tx.amount)}</td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{tx.type}</span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400 font-mono hidden lg:table-cell">{tx.ref}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                      {tx.status === 'SUCCESSFUL' ? <CheckCircle size={12} /> : tx.status === 'PENDING' ? <Clock size={12} /> : <XCircle size={12} />}
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{tx.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>
    </PageTransition>
  );
}
