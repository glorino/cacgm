'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Plus, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Header from '@/components/Header';
import { useUser } from '@/hooks/useUser';
import { MetricCard, AnimatedCard, PageTransition } from '@/components/AnimatedUI';
import { SERVICE_TYPES } from '@/lib/constants';
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

const attendanceHistory = [
  { date: 'Jul 20', first: 480, second: 420, youth: 240, midweek: 190 },
  { date: 'Jul 21', first: 510, second: 440, youth: 260, midweek: 200 },
  { date: 'Jul 22', first: 450, second: 380, youth: 220, midweek: 180 },
  { date: 'Jul 23', first: 520, second: 460, youth: 280, midweek: 210 },
  { date: 'Jul 24', first: 490, second: 430, youth: 250, midweek: 195 },
  { date: 'Jul 25', first: 540, second: 470, youth: 290, midweek: 220 },
];

const weeklyAttendance = [
  { week: 'Week 1', male: 620, female: 710, children: 180 },
  { week: 'Week 2', male: 650, female: 740, children: 190 },
  { week: 'Week 3', male: 580, female: 680, children: 170 },
  { week: 'Week 4', male: 700, female: 780, children: 200 },
];

export default function AttendancePage() {
  const { userRole, userName } = useUser();
  const [branchFilter, setBranchFilter] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [yearFilter, setYearFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');

  return (
    <PageTransition>
      <Header
        title="Attendance"
        subtitle="Track and manage service attendance"
        showBranchFilter
        userRole={userRole}
        userName={userName}
        selectedBranch={branchFilter}
        onBranchChange={setBranchFilter}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap gap-3 mb-6"
      >
        <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="">All Years</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
        <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="">All Months</option>
          {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <MetricCard title="This Sunday" value="1,380" change="+5.2% from last week" changeType="positive" icon={<Users size={22} />} delay={0} />
        <MetricCard title="Male" value="620" change="44.9%" changeType="neutral" icon={<Users size={22} />} delay={0.1} />
        <MetricCard title="Female" value="680" change="49.3%" changeType="neutral" icon={<Users size={22} />} delay={0.2} />
        <MetricCard title="Children" value="80" change="5.8%" changeType="neutral" icon={<Users size={22} />} delay={0.3} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        <AnimatedCard delay={0.2} className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Attendance Trend</h3>
          <p className="text-sm text-slate-500 mb-6">By service type over 6 weeks</p>
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

        <AnimatedCard delay={0.3} className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Gender Breakdown (Weekly)</h3>
          <p className="text-sm text-slate-500 mb-6">Male vs Female vs Children</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyAttendance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Bar dataKey="male" fill="#1e3a5f" radius={[4, 4, 0, 0]} name="Male" />
              <Bar dataKey="female" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Female" />
              <Bar dataKey="children" fill="#10b981" radius={[4, 4, 0, 0]} name="Children" />
            </BarChart>
          </ResponsiveContainer>
        </AnimatedCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatedCard delay={0.4} className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Record Attendance</h3>
            <p className="text-sm text-slate-500">Log today's service attendance</p>
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
          {SERVICE_TYPES.map((service, i) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100"
            >
              <h4 className="font-medium text-slate-800 mb-3">{service}</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Male</span>
                  <input type="number" placeholder="0" className="w-20 px-2 py-1 text-sm bg-white border border-slate-200 rounded-lg text-right focus:outline-none focus:ring-1 focus:ring-primary/20" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Female</span>
                  <input type="number" placeholder="0" className="w-20 px-2 py-1 text-sm bg-white border border-slate-200 rounded-lg text-right focus:outline-none focus:ring-1 focus:ring-primary/20" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Children</span>
                  <input type="number" placeholder="0" className="w-20 px-2 py-1 text-sm bg-white border border-slate-200 rounded-lg text-right focus:outline-none focus:ring-1 focus:ring-primary/20" />
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="text-xs font-medium text-slate-700">Total</span>
                  <span className="text-sm font-bold text-primary">0</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
            Save Attendance
          </button>
        </div>
        </AnimatedCard>
      </motion.div>
    </PageTransition>
  );
}
