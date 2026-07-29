'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, CheckCircle, Heart, Sprout, HandHeart, Building, Percent, AlertCircle } from 'lucide-react';
import { PRESET_AMOUNTS, GIVING_TYPES } from '@/lib/constants';
import { formatCurrency, generateTxRef } from '@/lib/utils';

const iconMap: Record<string, React.ReactNode> = {
  percent: <Percent size={20} />,
  heart: <Heart size={20} />,
  sprout: <Sprout size={20} />,
  'hand-heart': <HandHeart size={20} />,
  building: <Building size={20} />,
};

export default function PublicGivePage() {
  const [selectedType, setSelectedType] = useState('TITHE');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [giving, setGiving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [txRef, setTxRef] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('status') === 'successful') {
      setSuccess(true);
      setTxRef(params.get('ref') || '');
    }
  }, []);

  const handleGive = async () => {
    const amount = selectedPreset || parseInt(customAmount);
    if (!amount || amount <= 0 || !name || !email) return;

    setGiving(true);
    setError('');

    try {
      const res = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          email,
          name,
          phone,
          txRef: `CACGM-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        }),
      });

      const data = await res.json();

      if (data.status === 'success' && data.data.link) {
        window.location.href = data.data.link;
      } else {
        setError(data.error || 'Failed to initialize payment. Please try again.');
        setGiving(false);
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
      setGiving(false);
    }
  };

  const currentAmount = selectedPreset || parseInt(customAmount) || 0;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1A374F, #3364A0)', padding: '140px 40px 60px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 style={{ color: '#fff', fontFamily: "'Arno Pro', serif", fontSize: 'clamp(32px, 5vw, 52px)', marginBottom: 12 }}>
            Give to CACGM
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
            Your generous giving supports our ministries, missions, and community outreach. Give securely online via Flutterwave.
          </p>
        </motion.div>
      </section>

      {/* Giving Form */}
      <section style={{ maxWidth: 700, margin: '-30px auto 60px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ background: '#fff', borderRadius: 20, boxShadow: '0 8px 30px rgba(0,0,0,0.08)', overflow: 'hidden' }}
        >
          {/* Card Header */}
          <div style={{ background: 'linear-gradient(135deg, #1A374F, #3364A0)', padding: '24px 32px' }}>
            <h2 style={{ color: '#fff', fontFamily: "'Gotham', sans-serif", fontSize: 20, fontWeight: 600, margin: 0 }}>Make a Donation</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, margin: '4px 0 0' }}>All transactions are secure and encrypted via Flutterwave</p>
          </div>

          <div style={{ padding: 32 }}>
            {/* Success State */}
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ padding: 40, background: '#f0fdf4', borderRadius: 16, border: '1px solid #bbf7d0', textAlign: 'center' }}
              >
                <CheckCircle size={56} style={{ color: '#22c55e', margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#166534', margin: '0 0 8px' }}>Payment Successful!</h3>
                <p style={{ fontSize: 15, color: '#16a34a', margin: '0 0 6px' }}>
                  Thank you for your generous {selectedType.toLowerCase()} of {formatCurrency(currentAmount)}
                </p>
                {txRef && <p style={{ fontSize: 12, color: '#22c55e', margin: '8px 0 0' }}>Reference: {txRef}</p>}
                <button
                  onClick={() => { setSuccess(false); setCustomAmount(''); setSelectedPreset(null); setName(''); setEmail(''); setPhone(''); }}
                  style={{
                    marginTop: 24, padding: '12px 28px', borderRadius: 10, border: '2px solid #22c55e',
                    background: 'transparent', color: '#16a34a', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  Make Another Donation
                </button>
              </motion.div>
            ) : (
              <>
                {/* Giving Type */}
                <div style={{ marginBottom: 28 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 12 }}>Select Giving Type</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
                    {GIVING_TYPES.map((type) => (
                      <motion.button
                        key={type.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedType(type.id)}
                        style={{
                          padding: '14px 8px', borderRadius: 12, border: `2px solid ${selectedType === type.id ? '#1A374F' : '#e2e8f0'}`,
                          background: selectedType === type.id ? '#1A374F08' : '#fff',
                          color: selectedType === type.id ? '#1A374F' : '#64748b',
                          cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                          transition: 'all .2s',
                        }}
                      >
                        {iconMap[type.icon]}
                        <span style={{ fontSize: 11, fontWeight: 600 }}>{type.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Amount Selection */}
                <div style={{ marginBottom: 28 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 12 }}>Select Amount (₦)</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 12 }}>
                    {PRESET_AMOUNTS.map((amount) => (
                      <motion.button
                        key={amount}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => { setSelectedPreset(amount); setCustomAmount(''); }}
                        style={{
                          padding: '14px 8px', borderRadius: 12, border: `2px solid ${selectedPreset === amount ? '#1A374F' : '#e2e8f0'}`,
                          background: selectedPreset === amount ? '#1A374F08' : '#fff',
                          color: selectedPreset === amount ? '#1A374F' : '#334155',
                          fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all .2s',
                        }}
                      >
                        {formatCurrency(amount)}
                      </motion.button>
                    ))}
                  </div>

                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontWeight: 600, fontSize: 16 }}>₦</span>
                    <input
                      type="number"
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setSelectedPreset(null); }}
                      style={{
                        width: '100%', padding: '14px 14px 14px 36px', borderRadius: 12, border: '2px solid #e2e8f0',
                        fontSize: 16, fontWeight: 600, background: '#f8fafc', outline: 'none',
                        boxSizing: 'border-box',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#1A374F'}
                      onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                </div>

                {/* Donor Info */}
                <div style={{ marginBottom: 28 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 12 }}>Your Information</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        padding: '12px 14px', borderRadius: 10, border: '2px solid #e2e8f0',
                        fontSize: 14, outline: 'none', background: '#f8fafc',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#1A374F'}
                      onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        padding: '12px 14px', borderRadius: 10, border: '2px solid #e2e8f0',
                        fontSize: 14, outline: 'none', background: '#f8fafc',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#1A374F'}
                      onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone Number (optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%', padding: '12px 14px', borderRadius: 10, border: '2px solid #e2e8f0',
                      fontSize: 14, outline: 'none', background: '#f8fafc', boxSizing: 'border-box',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1A374F'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                {/* Error */}
                {error && (
                  <div style={{ marginBottom: 20, padding: '12px 16px', borderRadius: 10, background: '#fef2f2', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <AlertCircle size={18} style={{ color: '#ef4444', flexShrink: 0 }} />
                    <p style={{ fontSize: 13, color: '#dc2626', margin: 0 }}>{error}</p>
                  </div>
                )}

                {/* Give Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGive}
                  disabled={!currentAmount || !name || !email || giving}
                  style={{
                    width: '100%', padding: '16px', borderRadius: 12,
                    background: 'linear-gradient(135deg, #E46C63, #c44f47)',
                    color: '#fff', fontSize: 16, fontWeight: 700, border: 'none',
                    cursor: !currentAmount || !name || !email || giving ? 'not-allowed' : 'pointer',
                    opacity: !currentAmount || !name || !email || giving ? 0.5 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    boxShadow: '0 4px 16px rgba(228,108,99,0.3)',
                  }}
                >
                  {giving ? (
                    <>
                      <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                      Redirecting to payment...
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} />
                      Give {currentAmount > 0 ? formatCurrency(currentAmount) : 'Now'}
                    </>
                  )}
                </motion.button>

                <p style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', marginTop: 16 }}>
                  Powered by Flutterwave. Your card details are securely processed by Flutterwave.
                </p>
              </>
            )}
          </div>
        </motion.div>
      </section>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
