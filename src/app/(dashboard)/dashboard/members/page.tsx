'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Filter, Download, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import Header from '@/components/Header';
import { useUser } from '@/hooks/useUser';
import { AnimatedCard, PageTransition } from '@/components/AnimatedUI';

const membersData = [
  { id: '1', name: 'Emmanuel Okonkwo', email: 'emma.o@email.com', phone: '+234 801 234 5678', department: 'Men\'s Fellowship', branch: 'HQ', status: 'Active', joined: '2023-01-15' },
  { id: '2', name: 'Grace Adeleke', email: 'grace.a@email.com', phone: '+234 802 345 6789', department: 'Women\'s Ministry', branch: 'Surulere', status: 'Active', joined: '2022-06-20' },
  { id: '3', name: 'David Nwachukwu', email: 'david.n@email.com', phone: '+234 803 456 7890', department: 'Youth Department', branch: 'Yaba', status: 'Active', joined: '2023-03-10' },
  { id: '4', name: 'Sarah Ogundimu', email: 'sarah.o@email.com', phone: '+234 804 567 8901', department: 'Choir', branch: 'Lekki', status: 'Active', joined: '2022-11-05' },
  { id: '5', name: 'Michael Ajayi', email: 'michael.a@email.com', phone: '+234 805 678 9012', department: 'Ushering', branch: 'Ikeja GRA', status: 'Active', joined: '2023-07-22' },
  { id: '6', name: 'Chioma Eze', email: 'chioma.e@email.com', phone: '+234 806 789 0123', department: 'Choir', branch: 'HQ', status: 'Active', joined: '2024-01-08' },
  { id: '7', name: 'Tunde Bakare', email: 'tunde.b@email.com', phone: '+234 807 890 1234', department: 'Men\'s Fellowship', branch: 'Ikorodu', status: 'Pending', joined: '2024-02-14' },
  { id: '8', name: 'Folake Coker', email: 'folake.c@email.com', phone: '+234 808 901 2345', department: 'Women\'s Ministry', branch: 'HQ', status: 'Active', joined: '2022-09-30' },
];

export default function MembersPage() {
  const { userRole, userName } = useUser();
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [branchFilter, setBranchFilter] = useState('');

  const filtered = membersData.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept = !filterDept || m.department === filterDept;
    const matchesBranch = !branchFilter || m.branch === branchFilter;
    return matchesSearch && matchesDept && matchesBranch;
  });

  return (
    <PageTransition>
      <Header
        title="Members"
        subtitle={`Managing ${membersData.length} registered members`}
        showBranchFilter
        userRole={userRole}
        userName={userName}
        selectedBranch={branchFilter}
        onBranchChange={setBranchFilter}
      />

      <AnimatedCard delay={0.1} className="p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All Departments</option>
            <option value="Men's Fellowship">Men's Fellowship</option>
            <option value="Women's Ministry">Women's Ministry</option>
            <option value="Youth Department">Youth Department</option>
            <option value="Choir">Choir</option>
            <option value="Ushering">Ushering</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
            <Plus size={16} />
            Add Member
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </AnimatedCard>

      <AnimatedCard delay={0.2} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Member</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Department</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Branch</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((member, i) => (
                <motion.tr
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.03 }}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold text-xs">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{member.name}</p>
                        <p className="text-xs text-slate-400">{member.joined}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <p className="text-sm text-slate-600">{member.email}</p>
                    <p className="text-xs text-slate-400">{member.phone}</p>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-sm text-slate-600">{member.department}</span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-sm text-slate-600">{member.branch}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                        <Eye size={15} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                        <Edit size={15} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-500 text-sm">No members found matching your criteria.</div>
        )}
      </AnimatedCard>
    </PageTransition>
  );
}
