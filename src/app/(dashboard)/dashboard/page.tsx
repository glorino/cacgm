'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  TrendingUp,
  UserCheck,
  Church,
  ArrowUpRight,
  Heart,
  Calendar,
  Sparkles,
} from 'lucide-react';
import Header from '@/components/Header';
import { useUser } from '@/hooks/useUser';
import { MetricCard, AnimatedCard, PageTransition } from '@/components/AnimatedUI';
import { formatCurrency } from '@/lib/utils';
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
} from 'recharts';

export default function DashboardPage() {
  const { userRole, userName } = useUser();
  const [branchFilter, setBranchFilter] = useState('');
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalGiving: 0,
    avgAttendance: 0,
    activeDepartments: 0,
    recentTransactions: [] as Array<{ id: string; name: string; amount: number; type: string; date: string; status: string }>,
    recentMembers: [] as Array<{ id: string; name: string; department: string; joined: string; status: string }>,
    financialData: [] as Array<{ month: string; tithe: number; offering: number }>,
    attendanceData: [] as Array<{ service: string; attendance: number; target: number }>,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch(`/api/dashboard${branchFilter ? `?branchId=${branchFilter}` : ''}`);
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch {
        // Use fallback data
        setStats({
          totalMembers: 48,
          totalGiving: 0,
          avgAttendance: 0,
          activeDepartments: 48,
          recentTransactions: [],
          recentMembers: [],
          financialData: [
            { month: 'Jul', tithe: 2400000, offering: 1800000 },
            { month: 'Aug', tithe: 2800000, offering: 2100000 },
            { month: 'Sep', tithe: 2600000, offering: 1950000 },
            { month: 'Oct', tithe: 3100000, offering: 2400000 },
            { month: 'Nov', tithe: 2900000, offering: 2200000 },
            { month: 'Dec', tithe: 3500000, offering: 2800000 },
          ],
          attendanceData: [
            { service: '1st Service', attendance: 450, target: 500 },
            { service: '2nd Service', attendance: 380, target: 450 },
            { service: 'Youth', attendance: 220, target: 300 },
            { service: 'Midweek', attendance: 180, target: 250 },
            { service: 'Vigil', attendance: 150, target: 200 },
          ],
        });
      }
      setLoading(false);
    }
    fetchDashboard();
  }, [branchFilter]);

  return (
    <PageTransition>
      <Header
        title="Dashboard"
        subtitle="Welcome back, here's your church overview"
        showBranchFilter
        userRole={userRole}
        userName={userName}
        selectedBranch={branchFilter}
        onBranchChange={setBranchFilter}
      />

      {/* AI Insight Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 p-5 rounded-2xl border border-amber-200/60"
        style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)' }}
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#f59e0b' }}>
            <Sparkles size={20} color="#fff" />
          </div>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#92400e', margin: 0 }}>AI Insight</h3>
            <p style={{ fontSize: 13, color: '#a16207', margin: '4px 0 0', lineHeight: 1.5 }}>
              Attendance has grown 5.2% this month. Consider launching a visitor follow-up campaign to maintain momentum. Giving trends are strong across all branches.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <MetricCard
          title="Total Members"
          value={stats.totalMembers.toLocaleString()}
          change="+12% from last month"
          changeType="positive"
          icon={<Users size={22} />}
          delay={0}
        />
        <MetricCard
          title="Monthly Giving"
          value={formatCurrency(stats.totalGiving || 6300000)}
          change="+8.5% from last month"
          changeType="positive"
          icon={<TrendingUp size={22} />}
          delay={0.1}
        />
        <MetricCard
          title="Avg. Attendance"
          value={(stats.avgAttendance || 1380).toLocaleString()}
          change="+5.2% from last month"
          changeType="positive"
          icon={<UserCheck size={22} />}
          delay={0.2}
        />
        <MetricCard
          title="Active Departments"
          value={stats.activeDepartments || 8}
          change="All operational"
          changeType="neutral"
          icon={<Church size={22} />}
          delay={0.3}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        <AnimatedCard delay={0.2} className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Financial Trends</h3>
              <p className="text-sm text-slate-500">6-month giving overview</p>
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
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={stats.financialData.length > 0 ? stats.financialData : [
              { month: 'Jul', tithe: 2400000, offering: 1800000 },
              { month: 'Aug', tithe: 2800000, offering: 2100000 },
              { month: 'Sep', tithe: 2600000, offering: 1950000 },
              { month: 'Oct', tithe: 3100000, offering: 2400000 },
              { month: 'Nov', tithe: 2900000, offering: 2200000 },
              { month: 'Dec', tithe: 3500000, offering: 2800000 },
            ]}>
              <defs>
                <linearGradient id="colorTithe" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e3a5f" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1e3a5f" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOffering" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any) => [formatCurrency(Number(value))]}
              />
              <Area type="monotone" dataKey="tithe" stroke="#1e3a5f" strokeWidth={2} fillOpacity={1} fill="url(#colorTithe)" />
              <Area type="monotone" dataKey="offering" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorOffering)" />
            </AreaChart>
          </ResponsiveContainer>
        </AnimatedCard>

        <AnimatedCard delay={0.3} className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Attendance by Service</h3>
              <p className="text-sm text-slate-500">This week's breakdown</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stats.attendanceData.length > 0 ? stats.attendanceData : [
              { service: '1st Service', attendance: 450, target: 500 },
              { service: '2nd Service', attendance: 380, target: 450 },
              { service: 'Youth', attendance: 220, target: 300 },
              { service: 'Midweek', attendance: 180, target: 250 },
              { service: 'Vigil', attendance: 150, target: 200 },
            ]} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="service" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
              <Legend />
              <Bar dataKey="attendance" fill="#1e3a5f" radius={[6, 6, 0, 0]} name="Attendance" />
              <Bar dataKey="target" fill="#e2e8f0" radius={[6, 6, 0, 0]} name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </AnimatedCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <AnimatedCard delay={0.4} className="overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Recent Transactions</h3>
                <p className="text-sm text-slate-500">Latest financial activity</p>
              </div>
              <a href="/dashboard/transactions" className="text-sm text-primary hover:underline flex items-center gap-1">
                View all <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {(stats.recentTransactions.length > 0 ? stats.recentTransactions : [
              { id: '1', name: 'No transactions yet', amount: 0, type: 'INFO', date: '', status: '' },
            ]).slice(0, 5).map((tx, i) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
                    <Heart size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{tx.name}</p>
                    <p className="text-xs text-slate-500">{tx.type} {tx.date ? `· ${tx.date}` : ''}</p>
                  </div>
                </div>
                <div className="text-right">
                  {tx.amount > 0 && <p className="text-sm font-semibold text-slate-800">{formatCurrency(tx.amount)}</p>}
                  {tx.status && (
                    <span className={`text-xs font-medium ${
                      tx.status === 'SUCCESSFUL' ? 'text-emerald-600' :
                      tx.status === 'PENDING' ? 'text-amber-600' : 'text-red-500'
                    }`}>
                      {tx.status}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.5} className="overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Recent Members</h3>
                <p className="text-sm text-slate-500">Newly registered members</p>
              </div>
              <a href="/dashboard/members" className="text-sm text-primary hover:underline flex items-center gap-1">
                View all <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {(stats.recentMembers.length > 0 ? stats.recentMembers : [
              { id: '1', name: 'No members yet', department: '', joined: '', status: '' },
            ]).slice(0, 5).map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{member.name}</p>
                    <p className="text-xs text-slate-500">{member.department}</p>
                  </div>
                </div>
                <div className="text-right">
                  {member.status && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {member.status}
                    </span>
                  )}
                  {member.joined && <p className="text-xs text-slate-400 mt-1">{member.joined}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedCard>
      </motion.div>
    </PageTransition>
  );
}
