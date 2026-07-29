'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Save, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import { useUser } from '@/hooks/useUser';
import { MetricCard, AnimatedCard, PageTransition } from '@/components/AnimatedUI';
import { SERVICE_TYPES } from '@/lib/constants';
import { hasPermission } from '@/lib/rbac';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface AttendanceRecord {
  [serviceType: string]: { male: number; female: number; children: number };
}

const attendanceHistory = [
  { date: 'Jul 20', first: 480, second: 420, youth: 240, midweek: 190 },
  { date: 'Jul 21', first: 510, second: 440, youth: 260, midweek: 200 },
  { date: 'Jul 22', first: 450, second: 380, youth: 220, midweek: 180 },
  { date: 'Jul 23', first: 520, second: 460, youth: 280, midweek: 210 },
  { date: 'Jul 24', first: 490, second: 430, youth: 250, midweek: 195 },
  { date: 'Jul 25', first: 540, second: 470, youth: 290, midweek: 220 },
];

export default function AttendancePage() {
  const { userRole, userName, branchId } = useUser();
  const isEditor = hasPermission(userRole, 'attendance:create');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [records, setRecords] = useState<AttendanceRecord>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ total: 0, male: 0, female: 0, children: 0 });

  useEffect(() => {
    const total = Object.values(records).reduce((sum, r) => sum + r.male + r.female + r.children, 0);
    const male = Object.values(records).reduce((sum, r) => sum + r.male, 0);
    const female = Object.values(records).reduce((sum, r) => sum + r.female, 0);
    const children = Object.values(records).reduce((sum, r) => sum + r.children, 0);
    setStats({ total, male, female, children });
  }, [records]);

  const updateRecord = (service: string, field: 'male' | 'female' | 'children', value: string) => {
    const num = parseInt(value) || 0;
    setRecords(prev => ({
      ...prev,
      [service]: { ...(prev[service] || { male: 0, female: 0, children: 0 }), [field]: num },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const entries = Object.entries(records).filter(([_, r]) => r.male + r.female + r.children > 0);
      if (entries.length === 0) {
        setError('Please enter attendance for at least one service');
        setSaving(false);
        return;
      }

      for (const [serviceType, counts] of entries) {
        const res = await fetch('/api/attendance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            branchId: branchId || 'branch-1',
            date: selectedDate,
            serviceType,
            maleCount: counts.male,
            femaleCount: counts.female,
            childrenCount: counts.children,
          }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to save');
        }
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e: any) {
      setError(e.message || 'Failed to save attendance');
    }
    setSaving(false);
  };

  return (
    <PageTransition>
      <Header
        title="Attendance"
        subtitle="Track and manage service attendance"
        showBranchFilter={false}
        userRole={userRole}
        userName={userName}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <MetricCard title="Total Today" value={stats.total.toLocaleString()} change={isEditor ? 'Editable' : 'Read-only'} changeType="neutral" icon={<Users size={22} />} delay={0} />
        <MetricCard title="Male" value={stats.male.toLocaleString()} change={stats.total ? `${Math.round(stats.male / stats.total * 100)}%` : '0%'} changeType="neutral" icon={<Users size={22} />} delay={0.1} />
        <MetricCard title="Female" value={stats.female.toLocaleString()} change={stats.total ? `${Math.round(stats.female / stats.total * 100)}%` : '0%'} changeType="neutral" icon={<Users size={22} />} delay={0.2} />
        <MetricCard title="Children" value={stats.children.toLocaleString()} change={stats.total ? `${Math.round(stats.children / stats.total * 100)}%` : '0%'} changeType="neutral" icon={<Users size={22} />} delay={0.3} />
      </motion.div>

      {/* Attendance Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
        <AnimatedCard delay={0.2} className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Attendance Trend</h3>
          <p className="text-sm text-slate-500 mb-6">By service type over recent weeks</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={attendanceHistory} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Bar dataKey="first" fill="#1e3a5f" radius={[4, 4, 0, 0]} name="1st Service" />
              <Bar dataKey="second" fill="#3b6ea0" radius={[4, 4, 0, 0]} name="2nd Service" />
              <Bar dataKey="youth" fill="#d4a017" radius={[4, 4, 0, 0]} name="Youth" />
              <Bar dataKey="midweek" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Midweek" />
            </BarChart>
          </ResponsiveContainer>
        </AnimatedCard>
      </motion.div>

      {/* Record Attendance Form */}
      {isEditor && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <AnimatedCard delay={0.3} className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Record Attendance</h3>
                <p className="text-sm text-slate-500">Log today&apos;s service attendance</p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-slate-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICE_TYPES.map((service, i) => {
                const rec = records[service] || { male: 0, female: 0, children: 0 };
                const total = rec.male + rec.female + rec.children;
                return (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-100"
                  >
                    <h4 className="font-medium text-slate-800 mb-3">{service}</h4>
                    <div className="space-y-2">
                      {(['male', 'female', 'children'] as const).map((field) => (
                        <div key={field} className="flex items-center justify-between">
                          <span className="text-xs text-slate-500 capitalize">{field}</span>
                          <input
                            type="number"
                            placeholder="0"
                            value={rec[field] || ''}
                            onChange={(e) => updateRecord(service, field, e.target.value)}
                            className="w-20 px-2 py-1 text-sm bg-white border border-slate-200 rounded-lg text-right focus:outline-none focus:ring-1 focus:ring-primary/20"
                          />
                        </div>
                      ))}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                        <span className="text-xs font-medium text-slate-700">Total</span>
                        <span className="text-sm font-bold text-primary">{total}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {error && (
              <div className="mt-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            {saved && (
              <div className="mt-4 flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700">
                <CheckCircle size={16} /> Attendance saved successfully!
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
                {saving ? 'Saving...' : 'Save Attendance'}
              </button>
            </div>
          </AnimatedCard>
        </motion.div>
      )}

      {!isEditor && (
        <AnimatedCard delay={0.3} className="p-8 text-center">
          <Users size={48} className="text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">Read-Only View</h3>
          <p className="text-sm text-slate-500">Only Head Ushers, Branch Pastors, and General Overseers can record attendance.</p>
        </AnimatedCard>
      )}
    </PageTransition>
  );
}
