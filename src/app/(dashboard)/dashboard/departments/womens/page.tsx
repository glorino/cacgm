'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Calendar, TrendingUp, Plus } from 'lucide-react';
import Header from '@/components/Header';
import { MetricCard, AnimatedCard, PageTransition } from '@/components/AnimatedUI';
import { formatCurrency } from '@/lib/utils';

const members = [
  { id: '1', name: 'Mrs. Grace Adeleke', role: 'President', phone: '+234 802 345 6789', attendance: '92%', status: 'Active' },
  { id: '2', name: 'Sister Sarah Ogundimu', role: 'Vice President', phone: '+234 804 567 8901', attendance: '88%', status: 'Active' },
  { id: '3', name: 'Sister Chioma Eze', role: 'Secretary', phone: '+234 806 789 0123', attendance: '90%', status: 'Active' },
  { id: '4', name: 'Sister Folake Coker', role: 'Financial Secretary', phone: '+234 808 901 2345', attendance: '85%', status: 'Active' },
  { id: '5', name: 'Mama Bola Adeniyi', role: 'Member', phone: '+234 809 012 3456', attendance: '78%', status: 'Active' },
  { id: '6', name: 'Sister Ruth Okafor', role: 'Member', phone: '+234 810 123 4567', attendance: '82%', status: 'Active' },
];

const upcomingEvents = [
  { id: '1', title: "Women's Prayer Summit", date: '2025-08-03', time: '7:00 AM' },
  { id: '2', title: 'Monthly Women Fellowship', date: '2025-08-10', time: '4:00 PM' },
  { id: '3', title: 'Charity Outreach Program', date: '2025-08-17', time: '10:00 AM' },
];

export default function WomensMinistryPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'events'>('overview');

  return (
    <PageTransition>
      <Header
        title="Women's Ministry"
        subtitle="Department portal for Women's Ministry"
        showBack
        userRole="GENERAL_OVERSEER"
        userName="Pastor Adebayo Johnson"
      />

      <div className="flex gap-2 mb-6">
        {(['overview', 'members', 'events'] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab ? 'bg-purple-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard title="Total Members" value="350" change="+15 this month" changeType="positive" icon={<Users size={22} />} delay={0} />
            <MetricCard title="Avg. Attendance" value="180" change="51.4% rate" changeType="neutral" icon={<Calendar size={22} />} delay={0.1} />
            <MetricCard title="Monthly Budget" value={formatCurrency(600000)} change={`${formatCurrency(410000)} spent`} changeType="neutral" icon={<TrendingUp size={22} />} delay={0.2} />
            <MetricCard title="Active Events" value="3" change="This month" changeType="neutral" icon={<Calendar size={22} />} delay={0.3} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatedCard delay={0.3} className="overflow-hidden">
              <div className="p-6 border-b border-slate-100"><h3 className="text-lg font-semibold text-slate-800">Executive Committee</h3></div>
              <div className="divide-y divide-slate-100">
                {members.filter(m => ['President', 'Vice President', 'Secretary', 'Financial Secretary'].includes(m.role)).map((m, i) => (
                  <motion.div key={m.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.05 }} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600 font-semibold text-xs">{m.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{m.name}</p>
                        <p className="text-xs text-slate-500">{m.role}</p>
                      </div>
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
                  <motion.div key={event.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.05 }} className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-800">{event.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{event.date} · {event.time}</p>
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
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors"><Plus size={16} /> Add Member</button>
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
                    <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center"><span className="text-purple-600 font-semibold text-xs">{m.name.split(' ').map(n => n[0]).join('')}</span></div><p className="text-sm font-medium text-slate-800">{m.name}</p></div></td>
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
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-4"><Calendar size={20} className="text-purple-600" /></div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">{event.title}</h4>
              <p className="text-sm text-slate-500">{event.date} · {event.time}</p>
              <button className="mt-4 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors">View Details</button>
            </AnimatedCard>
          ))}
        </div>
      )}
    </PageTransition>
  );
}
