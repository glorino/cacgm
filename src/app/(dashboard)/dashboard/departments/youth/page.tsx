'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Calendar, TrendingUp, Plus, Music, Gamepad2 } from 'lucide-react';
import Header from '@/components/Header';
import { useUser } from '@/hooks/useUser';
import { MetricCard, AnimatedCard, PageTransition } from '@/components/AnimatedUI';
import { formatCurrency } from '@/lib/utils';

const members = [
  { id: '1', name: 'Bro. David Nwachukwu', role: 'President', phone: '+234 803 456 7890', attendance: '90%', status: 'Active' },
  { id: '2', name: 'Sister Amara Obi', role: 'Vice President', phone: '+234 811 234 5678', attendance: '87%', status: 'Active' },
  { id: '3', name: 'Bro. Chidi Nnamdi', role: 'Secretary', phone: '+234 812 345 6789', attendance: '85%', status: 'Active' },
  { id: '4', name: 'Sister Bimpe Adewale', role: 'Financial Secretary', phone: '+234 813 456 7890', attendance: '82%', status: 'Active' },
  { id: '5', name: 'Bro. Kelechi Eze', role: 'Member', phone: '+234 814 567 8901', attendance: '70%', status: 'Active' },
  { id: '6', name: 'Sister Yetunde Alabi', role: 'Member', phone: '+234 815 678 9012', attendance: '75%', status: 'Active' },
  { id: '7', name: 'Bro. Femi Adebayo', role: 'Member', phone: '+234 816 789 0123', attendance: '68%', status: 'Active' },
];

const upcomingEvents = [
  { id: '1', title: 'Youth Praise Night', date: '2025-08-01', time: '6:00 PM' },
  { id: '2', title: 'Youth Bible Study', date: '2025-08-06', time: '5:30 PM' },
  { id: '3', title: 'Game & Fellowship Night', date: '2025-08-13', time: '5:00 PM' },
  { id: '4', title: 'Community Service Day', date: '2025-08-20', time: '8:00 AM' },
];

export default function YouthDepartmentPage() {
  const { userRole, userName } = useUser();
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'events'>('overview');

  return (
    <PageTransition>
      <Header
        title="Youth Department"
        subtitle="Department portal for Youth Ministry"
        showBack
        userRole={userRole}
        userName={userName}
      />

      <div className="flex gap-2 mb-6">
        {(['overview', 'members', 'events'] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab ? 'bg-red-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard title="Total Members" value="420" change="+22 this month" changeType="positive" icon={<Users size={22} />} delay={0} />
            <MetricCard title="Avg. Attendance" value="220" change="52.4% rate" changeType="neutral" icon={<Calendar size={22} />} delay={0.1} />
            <MetricCard title="Monthly Budget" value={formatCurrency(450000)} change={`${formatCurrency(280000)} spent`} changeType="neutral" icon={<TrendingUp size={22} />} delay={0.2} />
            <MetricCard title="Active Events" value="4" change="This month" changeType="neutral" icon={<Calendar size={22} />} delay={0.3} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatedCard delay={0.3} className="overflow-hidden">
              <div className="p-6 border-b border-slate-100"><h3 className="text-lg font-semibold text-slate-800">Executive Committee</h3></div>
              <div className="divide-y divide-slate-100">
                {members.filter(m => ['President', 'Vice President', 'Secretary', 'Financial Secretary'].includes(m.role)).map((m, i) => (
                  <motion.div key={m.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.05 }} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-red-600 font-semibold text-xs">{m.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div><p className="text-sm font-medium text-slate-800">{m.name}</p><p className="text-xs text-slate-500">{m.role}</p></div>
                    </div>
                    <span className="text-xs text-slate-500">{m.attendance} attendance</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.4} className="overflow-hidden">
              <div className="p-6 border-b border-slate-100"><h3 className="text-lg font-semibold text-slate-800">Upcoming Events</h3></div>
              <div className="divide-y divide-slate-100">
                {upcomingEvents.map((event, i) => (
                  <motion.div key={event.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.05 }} className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                      <Gamepad2 size={18} className="text-red-500" />
                    </div>
                    <div><p className="text-sm font-medium text-slate-800">{event.title}</p><p className="text-xs text-slate-500">{event.date} · {event.time}</p></div>
                  </motion.div>
                ))}
              </div>
            </AnimatedCard>
          </div>
        </>
      )}

      {activeTab === 'members' && (
        <AnimatedCard delay={0.1} className="overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">All Members ({members.length})</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"><Plus size={16} /> Add Member</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-slate-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Name</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Role</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Phone</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Attendance</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-50">
                {members.map((m, i) => (
                  <motion.tr key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.03 }} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center"><span className="text-red-600 font-semibold text-xs">{m.name.split(' ').map(n => n[0]).join('')}</span></div><p className="text-sm font-medium text-slate-800">{m.name}</p></div></td>
                    <td className="px-6 py-4 text-sm text-slate-600">{m.role}</td>
                    <td className="px-6 py-4 text-sm text-slate-500 hidden md:table-cell">{m.phone}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">{m.attendance}</td>
                    <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">{m.status}</span></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedCard>
      )}

      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event, i) => (
            <AnimatedCard key={event.id} delay={0.1 + i * 0.1} className="p-6">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-4"><Calendar size={20} className="text-red-600" /></div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">{event.title}</h4>
              <p className="text-sm text-slate-500">{event.date} · {event.time}</p>
              <button className="mt-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">View Details</button>
            </AnimatedCard>
          ))}
        </div>
      )}
    </PageTransition>
  );
}
