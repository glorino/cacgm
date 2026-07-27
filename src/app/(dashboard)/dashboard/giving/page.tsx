'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Percent, Sprout, HandHeart, Building, CheckCircle, Clock, AlertCircle, CreditCard } from 'lucide-react';
import Header from '@/components/Header';
import { useUser } from '@/hooks/useUser';
import { AnimatedCard, PageTransition } from '@/components/AnimatedUI';
import { PRESET_AMOUNTS, GIVING_TYPES } from '@/lib/constants';
import { formatCurrency, generateTxRef } from '@/lib/utils';

const givingHistory = [
  { id: '1', type: 'TITHE', amount: 50000, date: '2025-07-25', status: 'SUCCESSFUL', ref: 'CACGM-M1K8P2-A3B4C5' },
  { id: '2', type: 'OFFERING', amount: 15000, date: '2025-07-21', status: 'SUCCESSFUL', ref: 'CACGM-M1K7P1-D6E7F8' },
  { id: '3', type: 'SEED', amount: 100000, date: '2025-07-14', status: 'SUCCESSFUL', ref: 'CACGM-M1K6P0-G9H0I1' },
  { id: '4', type: 'TITHE', amount: 50000, date: '2025-07-07', status: 'SUCCESSFUL', ref: 'CACGM-M1K5O9-J2K3L4' },
  { id: '5', type: 'DONATION', amount: 200000, date: '2025-06-30', status: 'SUCCESSFUL', ref: 'CACGM-M1K4O8-M5N6O7' },
];

const iconMap: Record<string, React.ReactNode> = {
  percent: <Percent size={20} />,
  heart: <Heart size={20} />,
  sprout: <Sprout size={20} />,
  'hand-heart': <HandHeart size={20} />,
  building: <Building size={20} />,
};

export default function GivingPage() {
  const { userRole, userName } = useUser();
  const [branchFilter, setBranchFilter] = useState('');
  const [selectedType, setSelectedType] = useState('TITHE');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [giving, setGiving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGive = async () => {
    const amount = selectedPreset || parseInt(customAmount);
    if (!amount || amount <= 0) return;

    setGiving(true);

    setTimeout(() => {
      setGiving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    }, 2000);
  };

  const currentAmount = selectedPreset || parseInt(customAmount) || 0;

  return (
    <PageTransition>
      <Header
        title="Giving Hub"
        subtitle="Give securely online via Flutterwave"
        showBranchFilter
        userRole={userRole}
        userName={userName}
        selectedBranch={branchFilter}
        onBranchChange={setBranchFilter}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <AnimatedCard delay={0.1} className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Make a Donation</h3>

            <div className="mb-6">
              <label className="text-sm font-medium text-slate-700 mb-3 block">Select Giving Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {GIVING_TYPES.map((type) => (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      selectedType === type.id
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-slate-200 hover:border-slate-300 text-slate-500'
                    }`}
                  >
                    {iconMap[type.icon]}
                    <span className="text-xs font-medium">{type.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-slate-700 mb-3 block">Select Amount (₦)</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
                {PRESET_AMOUNTS.map((amount) => (
                  <motion.button
                    key={amount}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setSelectedPreset(amount); setCustomAmount(''); }}
                    className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                      selectedPreset === amount
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {formatCurrency(amount)}
                  </motion.button>
                ))}
              </div>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₦</span>
                <input
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setSelectedPreset(null); }}
                  className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center"
                >
                  <CheckCircle size={48} className="text-emerald-500 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-emerald-800">Payment Successful!</h4>
                  <p className="text-sm text-emerald-600 mt-1">Thank you for your generous {selectedType.toLowerCase()} of {formatCurrency(currentAmount)}</p>
                  <p className="text-xs text-emerald-500 mt-2">Reference: {generateTxRef()}</p>
                </motion.div>
              ) : (
                <motion.button
                  key="give"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGive}
                  disabled={!currentAmount || giving}
                  className="w-full py-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl text-lg font-semibold flex items-center justify-center gap-3 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {giving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} />
                      Give {currentAmount > 0 ? formatCurrency(currentAmount) : 'Now'}
                    </>
                  )}
                </motion.button>
              )}
            </AnimatePresence>

            <p className="text-xs text-slate-400 text-center mt-4">
              Powered by Flutterwave. Your transaction is secure and encrypted.
            </p>
          </AnimatedCard>
        </div>

        <AnimatedCard delay={0.2} className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Giving Summary</h3>
          <p className="text-sm text-slate-500 mb-6">Your giving this month</p>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500">Total Given (July)</p>
              <p className="text-2xl font-bold text-primary mt-1">{formatCurrency(315000)}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Tithes</span>
                <span className="text-sm font-semibold text-slate-800">{formatCurrency(100000)}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: '32%' }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Offerings</span>
                <span className="text-sm font-semibold text-slate-800">{formatCurrency(15000)}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '5%' }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Seeds</span>
                <span className="text-sm font-semibold text-slate-800">{formatCurrency(100000)}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '32%' }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Donations</span>
                <span className="text-sm font-semibold text-slate-800">{formatCurrency(100000)}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '32%' }} />
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>

      <AnimatedCard delay={0.3} className="overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800">Giving History</h3>
          <p className="text-sm text-slate-500">Your recent transactions</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Type</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Reference</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {givingHistory.map((tx, i) => (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="hover:bg-slate-50/50"
                >
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/5 text-primary">
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-800">{formatCurrency(tx.amount)}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{tx.date}</td>
                  <td className="px-6 py-4 text-xs text-slate-400 font-mono">{tx.ref}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                      <CheckCircle size={12} /> {tx.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>
    </PageTransition>
  );
}
