'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { useUser } from '@/hooks/useUser';
import { AnimatedCard, MetricCard, PageTransition } from '@/components/AnimatedUI';
import { formatCurrency } from '@/lib/utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

const monthlyData = [
  { month: 'Jan', members: 2600, attendance: 1800, giving: 4200000 },
  { month: 'Feb', members: 2650, attendance: 1900, giving: 4650000 },
  { month: 'Mar', members: 2700, attendance: 2000, giving: 5100000 },
  { month: 'Apr', members: 2720, attendance: 1950, giving: 4900000 },
  { month: 'May', members: 2780, attendance: 2100, giving: 5500000 },
  { month: 'Jun', members: 2820, attendance: 2200, giving: 6000000 },
  { month: 'Jul', members: 2847, attendance: 2230, giving: 6300000 },
];

const branchGivingData = [
  { name: 'HQ', giving: 1800000, members: 680 },
  { name: 'Surulere', giving: 1200000, members: 520 },
  { name: 'Yaba', giving: 950000, members: 440 },
  { name: 'Ikeja GRA', giving: 800000, members: 380 },
  { name: 'Lekki', giving: 1100000, members: 460 },
  { name: 'Ikorodu', giving: 450000, members: 367 },
];

const givingBreakdown = [
  { name: 'Tithe', value: 35000000, color: '#1e3a5f' },
  { name: 'Offering', value: 12000000, color: '#d4a017' },
  { name: 'Seeds', value: 5500000, color: '#10b981' },
  { name: 'Donations', value: 4000000, color: '#7c3aed' },
  { name: 'Project', value: 3000000, color: '#f59e0b' },
];

const attendanceByService = [
  { service: '1st Service', avg: 520, peak: 680 },
  { service: '2nd Service', avg: 430, peak: 550 },
  { service: 'Youth', avg: 260, peak: 380 },
  { service: 'Midweek', avg: 195, peak: 280 },
  { service: 'Vigil', avg: 150, peak: 220 },
];

export default function AnalyticsPage() {
  const { userRole, userName } = useUser();
  const [branchFilter, setBranchFilter] = useState('');

  return (
    <PageTransition>
      <Header
        title="Analytics"
        subtitle="Deep insights and performance metrics"
        showBranchFilter
        userRole={userRole}
        userName={userName}
        selectedBranch={branchFilter}
        onBranchChange={setBranchFilter}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Growth Rate" value="+9.5%" change="Year over year" changeType="positive" icon={<span className="text-lg">📈</span>} delay={0} />
        <MetricCard title="Retention Rate" value="87%" change="Member retention" changeType="positive" icon={<span className="text-lg">🔄</span>} delay={0.1} />
        <MetricCard title="Avg. Giving/Member" value={formatCurrency(2212)} change="Per month" changeType="neutral" icon={<span className="text-lg">💰</span>} delay={0.2} />
        <MetricCard title="Visitor Conversion" value="34%" change="From first visit" changeType="positive" icon={<span className="text-lg">🎯</span>} delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AnimatedCard delay={0.2} className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Growth Trends</h3>
          <p className="text-sm text-slate-500 mb-6">Members, attendance & giving over 7 months</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="members" stroke="#1e3a5f" strokeWidth={2} dot={{ r: 4 }} name="Total Members" />
              <Line yAxisId="left" type="monotone" dataKey="attendance" stroke="#d4a017" strokeWidth={2} dot={{ r: 4 }} name="Avg Attendance" />
              <Line yAxisId="right" type="monotone" dataKey="giving" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Monthly Giving" />
            </LineChart>
          </ResponsiveContainer>
        </AnimatedCard>

        <AnimatedCard delay={0.3} className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Giving by Category (YTD)</h3>
          <p className="text-sm text-slate-500 mb-6">Distribution of financial giving</p>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={givingBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                {givingBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [formatCurrency(Number(value))]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {givingBreakdown.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-xs text-slate-600">{d.name}</span>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedCard delay={0.4} className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Branch Giving Comparison</h3>
          <p className="text-sm text-slate-500 mb-6">Monthly giving by branch</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={branchGivingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [formatCurrency(Number(value))]} />
              <Legend />
              <Bar dataKey="giving" fill="#1e3a5f" radius={[6, 6, 0, 0]} name="Monthly Giving" />
            </BarChart>
          </ResponsiveContainer>
        </AnimatedCard>

        <AnimatedCard delay={0.5} className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Attendance by Service Type</h3>
          <p className="text-sm text-slate-500 mb-6">Average vs peak attendance</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceByService} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="service" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Bar dataKey="avg" fill="#1e3a5f" radius={[6, 6, 0, 0]} name="Average" />
              <Bar dataKey="peak" fill="#d4a017" radius={[6, 6, 0, 0]} name="Peak" />
            </BarChart>
          </ResponsiveContainer>
        </AnimatedCard>
      </div>
    </PageTransition>
  );
}
