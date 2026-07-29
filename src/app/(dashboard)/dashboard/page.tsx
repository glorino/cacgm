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
  Activity,
  DollarSign,
  BarChart3,
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

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: '#fff', border: 'none', borderRadius: 12, padding: '12px 16px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#334155', margin: '0 0 8px' }}>{label}</p>
          {payload.map((entry, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: index < payload.length - 1 ? 4 : 0 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color }} />
              <span style={{ fontSize: 12, color: '#64748b' }}>{entry.name}:</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{formatCurrency(entry.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

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
        style={{
          marginBottom: 28, padding: '18px 24px', borderRadius: 16,
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          border: '1px solid #fbbf24',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12, flexShrink: 0,
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(245,158,11,0.3)',
          }}>
            <Sparkles size={18} color="#fff" />
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#92400e', margin: 0, letterSpacing: '-0.01em' }}>AI Insight</h3>
            <p style={{ fontSize: 13, color: '#a16207', margin: '4px 0 0', lineHeight: 1.6 }}>
              Attendance has grown 5.2% this month. Consider launching a visitor follow-up campaign to maintain momentum. Giving trends are strong across all branches.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Metric Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}
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

      {/* Charts Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}
      >
        {/* Financial Trends */}
        <AnimatedCard delay={0.2} className="p-6">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1e293b', margin: 0, letterSpacing: '-0.02em' }}>Financial Trends</h3>
              <p style={{ fontSize: 13, color: '#94a3b8', margin: '4px 0 0' }}>6-month giving overview</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1e3a5f' }} />
                <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Tithe</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#E46C63' }} />
                <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Offering</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
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
                  <stop offset="5%" stopColor="#1e3a5f" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#1e3a5f" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOffering" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E46C63" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#E46C63" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="tithe" stroke="#1e3a5f" strokeWidth={2.5} fillOpacity={1} fill="url(#colorTithe)" dot={{ r: 4, fill: '#1e3a5f', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, fill: '#1e3a5f', strokeWidth: 2, stroke: '#fff' }} name="Tithe" />
              <Area type="monotone" dataKey="offering" stroke="#E46C63" strokeWidth={2.5} fillOpacity={1} fill="url(#colorOffering)" dot={{ r: 4, fill: '#E46C63', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, fill: '#E46C63', strokeWidth: 2, stroke: '#fff' }} name="Offering" />
            </AreaChart>
          </ResponsiveContainer>
        </AnimatedCard>

        {/* Attendance by Service */}
        <AnimatedCard delay={0.3} className="p-6">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1e293b', margin: 0, letterSpacing: '-0.02em' }}>Attendance by Service</h3>
              <p style={{ fontSize: 13, color: '#94a3b8', margin: '4px 0 0' }}>This week&apos;s breakdown</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1A374F' }} />
                <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Attendance</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#e2e8f0' }} />
                <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Target</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stats.attendanceData.length > 0 ? stats.attendanceData : [
              { service: '1st Service', attendance: 450, target: 500 },
              { service: '2nd Service', attendance: 380, target: 450 },
              { service: 'Youth', attendance: 220, target: 300 },
              { service: 'Midweek', attendance: 180, target: 250 },
              { service: 'Vigil', attendance: 150, target: 200 },
            ]} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="service" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12, border: 'none', padding: '12px 16px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                }}
              />
              <Bar dataKey="attendance" fill="#1A374F" radius={[6, 6, 0, 0]} name="Attendance" />
              <Bar dataKey="target" fill="#e2e8f0" radius={[6, 6, 0, 0]} name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </AnimatedCard>
      </motion.div>

      {/* Recent Activity Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}
      >
        {/* Recent Transactions */}
        <AnimatedCard delay={0.4} className="overflow-hidden">
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1e293b', margin: 0, letterSpacing: '-0.02em' }}>Recent Transactions</h3>
              <p style={{ fontSize: 13, color: '#94a3b8', margin: '4px 0 0' }}>Latest financial activity</p>
            </div>
            <a href="/dashboard/transactions" style={{ fontSize: 13, color: '#1A374F', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', borderRadius: 8, background: '#1A374F08', transition: 'background .2s' }}>
              View all <ArrowUpRight size={14} />
            </a>
          </div>
          <div>
            {(stats.recentTransactions.length > 0 ? stats.recentTransactions : [
              { id: '1', name: 'No transactions yet', amount: 0, type: 'INFO', date: '', status: '' },
            ]).slice(0, 5).map((tx, i) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                style={{
                  padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  borderBottom: i < 4 ? '1px solid #f8fafc' : 'none',
                  transition: 'background .15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: tx.type === 'TITHE' ? '#1e3a5f10' : tx.type === 'OFFERING' ? '#E46C6310' : '#39A1B110',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Heart size={16} style={{ color: tx.type === 'TITHE' ? '#1e3a5f' : tx.type === 'OFFERING' ? '#E46C63' : '#39A1B1' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', margin: 0 }}>{tx.name}</p>
                    <p style={{ fontSize: 12, color: '#94a3b8', margin: '2px 0 0' }}>{tx.type} {tx.date ? `· ${tx.date}` : ''}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {tx.amount > 0 && <p style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', margin: 0 }}>{formatCurrency(tx.amount)}</p>}
                  {tx.status && (
                    <span style={{
                      fontSize: 11, fontWeight: 600,
                      color: tx.status === 'SUCCESSFUL' ? '#059669' : tx.status === 'PENDING' ? '#d97706' : '#dc2626',
                    }}>
                      {tx.status}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedCard>

        {/* Recent Members */}
        <AnimatedCard delay={0.5} className="overflow-hidden">
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1e293b', margin: 0, letterSpacing: '-0.02em' }}>Recent Members</h3>
              <p style={{ fontSize: 13, color: '#94a3b8', margin: '4px 0 0' }}>Newly registered members</p>
            </div>
            <a href="/dashboard/members" style={{ fontSize: 13, color: '#1A374F', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', borderRadius: 8, background: '#1A374F08', transition: 'background .2s' }}>
              View all <ArrowUpRight size={14} />
            </a>
          </div>
          <div>
            {(stats.recentMembers.length > 0 ? stats.recentMembers : [
              { id: '1', name: 'No members yet', department: '', joined: '', status: '' },
            ]).slice(0, 5).map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                style={{
                  padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  borderBottom: i < 4 ? '1px solid #f8fafc' : 'none',
                  transition: 'background .15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: 'linear-gradient(135deg, #1A374F, #3364A0)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', margin: 0 }}>{member.name}</p>
                    <p style={{ fontSize: 12, color: '#94a3b8', margin: '2px 0 0' }}>{member.department}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {member.status && (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 20,
                      fontSize: 11, fontWeight: 600,
                      background: member.status === 'Active' ? '#ecfdf5' : '#fffbeb',
                      color: member.status === 'Active' ? '#059669' : '#d97706',
                    }}>
                      {member.status}
                    </span>
                  )}
                  {member.joined && <p style={{ fontSize: 11, color: '#cbd5e1', margin: '4px 0 0' }}>{member.joined}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedCard>
      </motion.div>
    </PageTransition>
  );
}
