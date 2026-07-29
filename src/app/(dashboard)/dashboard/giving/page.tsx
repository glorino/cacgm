'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Percent, Sprout, HandHeart, Building, CheckCircle, CreditCard, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import { useUser } from '@/hooks/useUser';
import { AnimatedCard, PageTransition } from '@/components/AnimatedUI';
import { PRESET_AMOUNTS, GIVING_TYPES } from '@/lib/constants';
import { formatCurrency, generateTxRef } from '@/lib/utils';
import { hasPermission } from '@/lib/rbac';

const iconMap: Record<string, React.ReactNode> = {
  percent: <Percent size={20} />,
  heart: <Heart size={20} />,
  sprout: <Sprout size={20} />,
  'hand-heart': <HandHeart size={20} />,
  building: <Building size={20} />,
};

export default function GivingPage() {
  const { userRole, userName, branchId } = useUser();
  const canCreate = hasPermission(userRole, 'giving:create');
  const [selectedType, setSelectedType] = useState('TITHE');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [giving, setGiving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [txRef, setTxRef] = useState('');
  const [history, setHistory] = useState<Array<{ id: string; type: string; amount: number; date: string; status: string; ref: string }>>([]);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');

  useEffect(() => {
    fetch('/api/transactions')
      .then(r => r.ok ? r.json() : [])
      .then(data => setHistory(Array.isArray(data) ? data.slice(0, 10) : []))
      .catch(() => {});
  }, [success]);

  const handleGive = async () => {
    const amount = selectedPreset || parseInt(customAmount);
    if (!amount || amount <= 0 || !donorName || !donorEmail) return;

    setGiving(true);
    setError('');

    try {
      const ref = `CACGM-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const res = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, email: donorEmail, name: donorName, txRef: ref }),
      });
      const data = await res.json();
      if (data.status === 'success' && data.data?.link) {
        window.location.href = data.data.link;
      } else {
        // Fallback: record locally
        const txRes = await fetch('/api/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount,
            type: selectedType,
            branchId: branchId || 'branch-1',
            txRef: ref,
          }),
        });
        if (txRes.ok) {
          setTxRef(ref);
          setSuccess(true);
          setCustomAmount('');
          setSelectedPreset(null);
          setTimeout(() => setSuccess(false), 4000);
        } else {
          setError('Payment recording failed. Please try again.');
        }
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setGiving(false);
  };

  const currentAmount = selectedPreset || parseInt(customAmount) || 0;

  return (
    <PageTransition>
      <Header
        title="Giving Hub"
        subtitle="Record and manage church giving"
        showBranchFilter={false}
        userRole={userRole}
        userName={userName}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
      >
        <div className="lg:col-span-2">
          <AnimatedCard delay={0.1} className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">
              {canCreate ? 'Record a Donation' : 'Giving Overview'}
            </h3>

            {canCreate ? (
              <>
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

                <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Donor Name *"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <input
                    type="email"
                    placeholder="Donor Email *"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                      <CheckCircle size={48} className="text-emerald-500 mx-auto mb-3" />
                      <h4 className="text-lg font-semibold text-emerald-800">Payment Recorded!</h4>
                      <p className="text-sm text-emerald-600 mt-1">Thank you for your generous {selectedType.toLowerCase()} of {formatCurrency(currentAmount)}</p>
                      <p className="text-xs text-emerald-500 mt-2">Reference: {txRef}</p>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="give"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGive}
                      disabled={!currentAmount || !donorName || !donorEmail || giving}
                      className="w-full py-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl text-lg font-semibold flex items-center justify-center gap-3 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {giving ? (
                        <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                      ) : (
                        <><CreditCard size={20} /> Give {currentAmount > 0 ? formatCurrency(currentAmount) : 'Now'}</>
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <div className="text-center py-8">
                <Heart size={48} className="text-slate-300 mx-auto mb-4" />
                <p className="text-sm text-slate-500">Your role does not have permission to record donations. View your giving history below.</p>
              </div>
            )}

            {error && (
              <div className="mt-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <p className="text-xs text-slate-400 text-center mt-4">
              Powered by Flutterwave. Your transaction is secure and encrypted.
            </p>
          </AnimatedCard>
        </div>

        <AnimatedCard delay={0.2} className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Giving Summary</h3>
          <p className="text-sm text-slate-500 mb-6">Recent activity</p>

          <div className="space-y-3">
            {history.length > 0 ? history.slice(0, 5).map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-slate-800">{tx.type}</p>
                  <p className="text-xs text-slate-500">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-primary">{formatCurrency(tx.amount)}</p>
                  <p className={`text-xs ${tx.status === 'SUCCESSFUL' ? 'text-emerald-600' : 'text-amber-600'}`}>{tx.status}</p>
                </div>
              </div>
            )) : (
              <p className="text-sm text-slate-400 text-center py-4">No giving history yet</p>
            )}
          </div>
        </AnimatedCard>
      </motion.div>
    </PageTransition>
  );
}
