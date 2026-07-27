'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  TrendingUp,
  UserCheck,
  Church,
  ArrowUpRight,
  Building2,
  BarChart3,
  Globe,
} from 'lucide-react';
import Header from '@/components/Header';
import { MetricCard, AnimatedCard, PageTransition } from '@/components/AnimatedUI';
import { formatCurrency } from '@/lib/utils';
import { BRANCHES_DATA } from '@/lib/constants';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const branchPerformance = [
  { name: 'HQ', members: 680, attendance: 520, giving: 1800000 },
  { name: 'Surulere', members: 520, attendance: 410, giving: 1200000 },
  { name: 'Yaba', members: 440, attendance: 350, giving: 950000 },
  { name: 'Ikeja GRA', members: 380, attendance: 290, giving: 800000 },
  { name: 'Lekki', members: 460, attendance: 380, giving: 1100000 },
  { name: 'Ikorodu', members: 367, attendance: 280, giving: 450000 },
];

const departmentDistribution = [
  { name: 'Choir', value: 180, color: '#1e3a5f' },
  { name: 'Ushering', value: 120, color: '#d4a017' },
  { name: 'Men\'s', value: 280, color: '#059669' },
  { name: 'Women\'s', value: 350, color: '#7c3aed' },
  { name: 'Youth', value: 420, color: '#dc2626' },
  { name: 'Children', value: 160, color: '#0891b2' },
  { name: 'Others', value: 337, color: '#64748b' },
];

const monthlyGiving = [
  { month: 'Jan', tithe: 2100000, offering: 1600000, seed: 800000 },
  { month: 'Feb', tithe: 2300000, offering: 1750000, seed: 650000 },
  { month: 'Mar', tithe: 2500000, offering: 1900000, seed: 900000 },
  { month: 'Apr', tithe: 2200000, offering: 1800000, seed: 700000 },
  { month: 'May', tithe: 2800000, offering: 2100000, seed: 1100000 },
  { month: 'Jun', tithe: 3000000, offering: 2300000, seed: 950000 },
];

const topGivers = [
  { name: 'Chief Okonkwo', amount: 500000, branch: 'HQ' },
  { name: 'Mrs. Adeniyi', amount: 350000, branch: 'Surulere' },
  { name: 'Engr. Okafor', amount: 300000, branch: 'Yaba' },
  { name: 'Dr. Balogun', amount: 280000, branch: 'Lekki' },
  { name: 'Barr. Adeleke', amount: 250000, branch: 'Ikeja GRA' },
];

export default function OverviewPage() {
  const [branchFilter, setBranchFilter] = useState('');

  return (
    <PageTransition>
      <Header
        title="Overview"
        subtitle="Comprehensive analytics across all branches"
        showBranchFilter
        userRole="GENERAL_OVERSEER"
        userName="Pastor Adebayo Johnson"
        selectedBranch={branchFilter}
        onBranchChange={setBranchFilter}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Members"
          value="2,847"
          change="+12% this quarter"
          changeType="positive"
          icon={<Users size={22} />}
          delay={0}
        />
        <MetricCard
          title="Total Giving (YTD)"
          value={formatCurrency(35500000)}
          change="+18% vs last year"
          changeType="positive"
          icon={<TrendingUp size={22} />}
          delay={0.1}
        />
        <MetricCard
          title="Avg. Attendance"
          value="2,230"
          change="Across all services"
          changeType="neutral"
          icon={<UserCheck size={22} />}
          delay={0.2}
        />
        <MetricCard
          title="Active Branches"
          value={BRANCHES_DATA.length.toString()}
          change="All operational"
          changeType="neutral"
          icon={<Building2 size={22} />}
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <AnimatedCard delay={0.2} className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Financial Trends (6 months)</h3>
              <p className="text-sm text-slate-500">Tithe vs Offering vs Seed</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs text-slate-500">Tithe</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="text-xs text-slate-500">Offering</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-500">Seed</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyGiving}>
              <defs>
                <linearGradient id="gTithe" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e3a5f" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1e3a5f" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gOffering" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gSeed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any) => [formatCurrency(Number(value))]}
              />
              <Area type="monotone" dataKey="tithe" stroke="#1e3a5f" strokeWidth={2} fillOpacity={1} fill="url(#gTithe)" />
              <Area type="monotone" dataKey="offering" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#gOffering)" />
              <Area type="monotone" dataKey="seed" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#gSeed)" />
            </AreaChart>
          </ResponsiveContainer>
        </AnimatedCard>

        <AnimatedCard delay={0.3} className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Department Distribution</h3>
          <p className="text-sm text-slate-500 mb-4">Members by department</p>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={departmentDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {departmentDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {departmentDistribution.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-xs text-slate-600">{d.name}</span>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AnimatedCard delay={0.4} className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Branch Performance</h3>
          <p className="text-sm text-slate-500 mb-6">Member count by branch</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={branchPerformance} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
              />
              <Legend />
              <Bar dataKey="members" fill="#1e3a5f" radius={[6, 6, 0, 0]} name="Total Members" />
              <Bar dataKey="attendance" fill="#d4a017" radius={[6, 6, 0, 0]} name="Avg Attendance" />
            </BarChart>
          </ResponsiveContainer>
        </AnimatedCard>

        <AnimatedCard delay={0.5} className="overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800">Top Givers (This Month)</h3>
            <p className="text-sm text-slate-500">Leading contributors across branches</p>
          </div>
          <div className="divide-y divide-slate-100">
            {topGivers.map((giver, i) => (
              <motion.div
                key={giver.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-xs">#{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{giver.name}</p>
                    <p className="text-xs text-slate-500">{giver.branch} Branch</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-primary">{formatCurrency(giver.amount)}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedCard>
      </div>
    </PageTransition>
  );
}
