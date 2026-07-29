'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, Church, ArrowLeft } from 'lucide-react';

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
    <div style={{ width: '100%', maxWidth: 440, padding: '0 24px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Back to Homepage */}
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          marginBottom: 24, fontSize: 13, fontWeight: 600,
          color: '#69757B', textDecoration: 'none',
          transition: 'color .2s',
        }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#3364A0'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#69757B'}
        >
          <ArrowLeft size={16} />
          Back to Homepage
        </Link>

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: 'linear-gradient(135deg, #1A374F, #3364A0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}>
            <Church color="#fff" size={28} />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#222', margin: 0 }}>Welcome Back</h1>
          <p style={{ color: '#69757B', fontSize: 14, marginTop: 4 }}>Sign in to CACGM Church Management</p>
        </div>

        <div style={{
          background: '#fff', borderRadius: 16, padding: 32,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #eee',
        }}>
          {error && (
            <div style={{ marginBottom: 16, padding: 12, borderRadius: 8, background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: 13 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
                    width: '100%', padding: '12px 12px 12px 40px', borderRadius: 8,
                    border: '1px solid #e5e7eb', fontSize: 14, outline: 'none',
                    background: '#fafafa', boxSizing: 'border-box',
                  }}
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
                    width: '100%', padding: '12px 40px 12px 40px', borderRadius: 8,
                    border: '1px solid #e5e7eb', fontSize: 14, outline: 'none',
                    background: '#fafafa', boxSizing: 'border-box',
                  }}
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
                width: '100%', padding: '14px', borderRadius: 8,
                background: 'linear-gradient(135deg, #1A374F, #3364A0)',
                color: '#fff', fontWeight: 600, fontSize: 14,
                border: 'none', cursor: 'pointer', opacity: loading ? 0.7 : 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {loading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Signing in...</> : 'Sign In'}
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: '#69757B' }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" style={{ color: '#3364A0', fontWeight: 600, textDecoration: 'none' }}>Register</Link>
          </div>
        </div>

        {/* Demo Quick Login */}
        <div style={{ marginTop: 24, background: '#f8fafc', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Quick Demo Login</p>
          <p style={{ fontSize: 11, color: '#94a3b8', marginBottom: 12 }}>Password for all: <strong>password123</strong></p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {demoAccounts.map((acc) => (
              <button
                key={acc.email}
                onClick={() => quickLogin(acc.email)}
                disabled={loading}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0',
                  background: '#fff', cursor: loading ? 'wait' : 'pointer',
                  transition: 'all .15s', textAlign: 'left',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = acc.color; e.currentTarget.style.background = `${acc.color}08`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fff'; }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#222' }}>{acc.label}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{acc.email}</div>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5,
                  padding: '3px 8px', borderRadius: 4, background: `${acc.color}15`, color: acc.color,
                }}>{acc.role}</span>
              </button>
            ))}
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 11, color: '#94a3b8', marginTop: 24 }}>
          &copy; {new Date().getFullYear()} CACGM. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
