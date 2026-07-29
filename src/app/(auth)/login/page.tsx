'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, Church, ArrowLeft } from 'lucide-react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

const demoAccounts = [
  { label: 'General Overseer', email: 'overseer@cacgm.org', role: 'Super Admin', color: '#1A374F' },
  { label: 'Branch Pastor', email: 'pastor.hq@cacgm.org', role: 'Branch Admin', color: '#3364A0' },
  { label: 'Accountant', email: 'accountant@cacgm.org', role: 'Finance', color: '#39A1B1' },
  { label: 'Head Usher', email: 'usher@cacgm.org', role: 'Attendance', color: '#9EC73F' },
  { label: "Men's President", email: 'mens@cacgm.org', role: 'Department', color: '#3364A0' },
  { label: "Women's President", email: 'womens@cacgm.org', role: 'Department', color: '#E46C63' },
  { label: 'Youth President', email: 'youth@cacgm.org', role: 'Department', color: '#39A1B1' },
];

export default function LoginPage() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (result?.error) {
      setError('Invalid email or password');
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  const quickLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
    setError('');
    setLoading(true);
    const result = await signIn('credentials', { email: demoEmail, password: 'password123', redirect: false });
    setLoading(false);
    if (result?.error) {
      setError('Login failed');
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1A374F, #3364A0)', padding: isMobile ? '100px 20px 60px' : '140px 40px 80px', textAlign: 'center', position: 'relative' }}>
        <Link href="/" style={{
          position: 'absolute', top: isMobile ? 20 : 30, left: isMobile ? 16 : 40,
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
          transition: 'color .2s',
        }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
        >
          <ArrowLeft size={16} />
          Back to Homepage
        </Link>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <Church color="#fff" size={28} />
        </div>
        <h1 style={{ color: '#fff', fontFamily: "'Arno Pro', serif", fontSize: isMobile ? '28px' : 'clamp(32px, 5vw, 48px)', marginBottom: 12 }}>Welcome Back</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: isMobile ? 15 : 17, maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>Sign in to access your CACGM Church Management dashboard</p>
      </section>

      {/* Login Form */}
      <section style={{ maxWidth: 480, margin: isMobile ? '-30px auto 40px' : '-40px auto 60px', padding: isMobile ? '0 16px' : '0 20px', position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{ background: '#fff', borderRadius: 20, boxShadow: '0 8px 30px rgba(0,0,0,0.08)', overflow: 'hidden' }}
        >
          {error && (
            <div style={{ margin: isMobile ? '16px 16px 0' : '20px 20px 0', padding: 12, borderRadius: 8, background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: 13 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ padding: isMobile ? '24px 20px' : '32px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@cacgm.org"
                  required
                  style={{
                    width: '100%', padding: '13px 12px 13px 40px', borderRadius: 10,
                    border: '2px solid #e5e7eb', fontSize: 14, outline: 'none',
                    background: '#f8fafc', boxSizing: 'border-box', transition: 'border-color .2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1A374F'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{
                    width: '100%', padding: '13px 40px 13px 40px', borderRadius: 10,
                    border: '2px solid #e5e7eb', fontSize: 14, outline: 'none',
                    background: '#f8fafc', boxSizing: 'border-box', transition: 'border-color .2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1A374F'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#999', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '14px', borderRadius: 10,
                background: 'linear-gradient(135deg, #1A374F, #3364A0)',
                color: '#fff', fontWeight: 600, fontSize: 14,
                border: 'none', cursor: 'pointer', opacity: loading ? 0.7 : 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                marginTop: 4,
              }}
            >
              {loading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Signing in...</> : 'Sign In'}
            </button>
          </form>

          <div style={{ padding: isMobile ? '0 20px 20px' : '0 28px 24px', textAlign: 'center', fontSize: 13, color: '#69757B' }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" style={{ color: '#3364A0', fontWeight: 600, textDecoration: 'none' }}>Register</Link>
          </div>
        </motion.div>

        {/* Demo Quick Login */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ marginTop: 16, background: '#fff', borderRadius: 16, padding: isMobile ? '18px 16px' : '22px 24px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}
        >
          <p style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Quick Demo Login</p>
          <p style={{ fontSize: 11, color: '#94a3b8', marginBottom: 12 }}>Password for all: <strong>password123</strong></p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr', gap: 8 }}>
            {demoAccounts.map((acc) => (
              <button
                key={acc.email}
                onClick={() => quickLogin(acc.email)}
                disabled={loading}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: isMobile ? '10px 10px' : '11px 14px', borderRadius: 10, border: '1px solid #e2e8f0',
                  background: '#fff', cursor: loading ? 'wait' : 'pointer',
                  transition: 'all .15s', textAlign: 'left', gap: 6,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = acc.color; e.currentTarget.style.background = `${acc.color}08`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fff'; }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: isMobile ? 12 : 13, fontWeight: 600, color: '#222', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{acc.label}</div>
                  <div style={{ fontSize: isMobile ? 10 : 11, color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{acc.email}</div>
                </div>
                <span style={{
                  fontSize: isMobile ? 9 : 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5,
                  padding: '3px 6px', borderRadius: 4, background: `${acc.color}15`, color: acc.color,
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}>{acc.role}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      <p style={{ textAlign: 'center', fontSize: 11, color: '#94a3b8', padding: isMobile ? '0 16px 24px' : '0 40px 40px' }}>
        &copy; {new Date().getFullYear()} CACGM. All rights reserved.
      </p>
    </div>
  );
}
