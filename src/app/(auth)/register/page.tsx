'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, User, Phone, ArrowLeft, Loader2, Church, MapPin, Heart, Calendar, CheckCircle } from 'lucide-react';

const departments = [
  "Men's Fellowship",
  "Women's Ministry",
  "Youth Department",
  "Choir",
  "Ushering",
  "Protocol",
  "Media & Technical",
  "Children's Ministry",
];

const branches = [
  'Headquarters',
  'Surulere',
  'Yaba',
  'Ikeja GRA',
  'Lekki',
  'Ikorodu',
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    branch: '',
    department: '',
    howDidYouHear: '',
    agreeToTerms: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: 'member123',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }
      setSuccess(true);
    } catch {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  const updateForm = (field: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  if (success) {
    return (
      <div style={{ width: '100%', maxWidth: 500, padding: '0 24px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px', boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
          }}>
            <CheckCircle color="#fff" size={36} />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#222', marginBottom: 8 }}>Registration Complete!</h1>
          <p style={{ color: '#69757B', fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
            Welcome to CACGM! Your information has been received. A church administrator will review your registration and assign you to a branch and department.
          </p>
          <Link href="/login" style={{
            display: 'inline-block', padding: '14px 32px', fontSize: 14, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '1px', borderRadius: 8,
            background: 'linear-gradient(135deg, #1A374F, #3364A0)',
            color: '#fff', textDecoration: 'none',
          }}>
            Go to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: 600, padding: '0 24px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Back to Homepage */}
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          marginBottom: 24, fontSize: 13, fontWeight: 600,
          color: '#69757B', textDecoration: 'none',
        }}>
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
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#222', margin: 0 }}>Join CACGM</h1>
          <p style={{ color: '#69757B', fontSize: 14, marginTop: 4 }}>Register as a member of Christ Apostolic Church</p>
        </div>

        {/* Step indicators */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: step >= s ? '#E46C63' : '#e2e8f0',
              transition: 'background .3s',
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>
          <span>Personal Info</span>
          <span>Church Info</span>
          <span>Confirm</span>
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

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#222', margin: 0 }}>Personal Information</h3>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }}>Full Name *</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateForm('name', e.target.value)}
                    placeholder="e.g. John Adekunle"
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
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }}>Email Address *</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateForm('email', e.target.value)}
                    placeholder="you@example.com"
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
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }}>Phone Number *</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateForm('phone', e.target.value)}
                    placeholder="+234 800 000 0000"
                    required
                    style={{
                      width: '100%', padding: '12px 12px 12px 40px', borderRadius: 8,
                      border: '1px solid #e5e7eb', fontSize: 14, outline: 'none',
                      background: '#fafafa', boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }}>Gender</label>
                  <select
                    value={form.gender}
                    onChange={(e) => updateForm('gender', e.target.value)}
                    style={{
                      width: '100%', padding: '12px', borderRadius: 8,
                      border: '1px solid #e5e7eb', fontSize: 14, outline: 'none',
                      background: '#fafafa', boxSizing: 'border-box',
                    }}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }}>Date of Birth</label>
                  <input
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(e) => updateForm('dateOfBirth', e.target.value)}
                    style={{
                      width: '100%', padding: '12px', borderRadius: 8,
                      border: '1px solid #e5e7eb', fontSize: 14, outline: 'none',
                      background: '#fafafa', boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }}>Home Address</label>
                <textarea
                  value={form.address}
                  onChange={(e) => updateForm('address', e.target.value)}
                  placeholder="Street address, city..."
                  rows={2}
                  style={{
                    width: '100%', padding: '12px', borderRadius: 8,
                    border: '1px solid #e5e7eb', fontSize: 14, outline: 'none',
                    background: '#fafafa', boxSizing: 'border-box', resize: 'vertical',
                  }}
                />
              </div>

              <button
                onClick={() => { if (form.name && form.email && form.phone) setStep(2); }}
                style={{
                  width: '100%', padding: '14px', borderRadius: 8,
                  background: 'linear-gradient(135deg, #1A374F, #3364A0)',
                  color: '#fff', fontWeight: 600, fontSize: 14,
                  border: 'none', cursor: 'pointer',
                }}
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#222', margin: 0 }}>Church Information</h3>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }}>Preferred Branch *</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                  <select
                    value={form.branch}
                    onChange={(e) => updateForm('branch', e.target.value)}
                    required
                    style={{
                      width: '100%', padding: '12px 12px 12px 40px', borderRadius: 8,
                      border: '1px solid #e5e7eb', fontSize: 14, outline: 'none',
                      background: '#fafafa', boxSizing: 'border-box',
                    }}
                  >
                    <option value="">Select a branch</option>
                    {branches.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }}>Ministry / Department</label>
                <div style={{ position: 'relative' }}>
                  <Heart size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                  <select
                    value={form.department}
                    onChange={(e) => updateForm('department', e.target.value)}
                    style={{
                      width: '100%', padding: '12px 12px 12px 40px', borderRadius: 8,
                      border: '1px solid #e5e7eb', fontSize: 14, outline: 'none',
                      background: '#fafafa', boxSizing: 'border-box',
                    }}
                  >
                    <option value="">Select a ministry (optional)</option>
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }}>How did you hear about us?</label>
                <select
                  value={form.howDidYouHear}
                  onChange={(e) => updateForm('howDidYouHear', e.target.value)}
                  style={{
                    width: '100%', padding: '12px', borderRadius: 8,
                    border: '1px solid #e5e7eb', fontSize: 14, outline: 'none',
                    background: '#fafafa', boxSizing: 'border-box',
                  }}
                >
                  <option value="">Select</option>
                  <option value="friend">Friend / Family</option>
                  <option value="social-media">Social Media</option>
                  <option value="search">Google Search</option>
                  <option value="radio">Radio / TV</option>
                  <option value="flyer">Flyer / Billboard</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    flex: 1, padding: '14px', borderRadius: 8,
                    background: '#f1f5f9', color: '#64748b', fontWeight: 600, fontSize: 14,
                    border: 'none', cursor: 'pointer',
                  }}
                >
                  Back
                </button>
                <button
                  onClick={() => { if (form.branch) setStep(3); }}
                  style={{
                    flex: 2, padding: '14px', borderRadius: 8,
                    background: 'linear-gradient(135deg, #1A374F, #3364A0)',
                    color: '#fff', fontWeight: 600, fontSize: 14,
                    border: 'none', cursor: 'pointer',
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#222', margin: 0 }}>Confirm Details</h3>

              <div style={{ background: '#f8fafc', borderRadius: 12, padding: 20 }}>
                <div style={{ display: 'grid', gap: 12 }}>
                  {[
                    { label: 'Name', value: form.name },
                    { label: 'Email', value: form.email },
                    { label: 'Phone', value: form.phone },
                    { label: 'Gender', value: form.gender || 'Not specified' },
                    { label: 'Branch', value: form.branch },
                    { label: 'Department', value: form.department || 'Not assigned' },
                  ].map((item) => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid #e2e8f0' }}>
                      <span style={{ fontSize: 13, color: '#69757B' }}>{item.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#222' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={form.agreeToTerms}
                  onChange={(e) => updateForm('agreeToTerms', e.target.checked)}
                  style={{ marginTop: 3 }}
                />
                <span style={{ fontSize: 13, color: '#69757B', lineHeight: 1.5 }}>
                  I agree to the church&apos;s code of conduct and commit to active participation. I understand that a church administrator will review my registration.
                </span>
              </label>

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => setStep(2)}
                  style={{
                    flex: 1, padding: '14px', borderRadius: 8,
                    background: '#f1f5f9', color: '#64748b', fontWeight: 600, fontSize: 14,
                    border: 'none', cursor: 'pointer',
                  }}
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading || !form.agreeToTerms}
                  style={{
                    flex: 2, padding: '14px', borderRadius: 8,
                    background: 'linear-gradient(135deg, #1A374F, #3364A0)',
                    color: '#fff', fontWeight: 600, fontSize: 14,
                    border: 'none', cursor: loading || !form.agreeToTerms ? 'not-allowed' : 'pointer',
                    opacity: loading || !form.agreeToTerms ? 0.6 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  {loading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Submitting...</> : 'Submit Registration'}
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: '#69757B' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#3364A0', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
        </div>
      </motion.div>
    </div>
  );
}
