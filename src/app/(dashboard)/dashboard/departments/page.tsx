'use client';

import { motion } from 'framer-motion';
import { Church, Users, ArrowUpRight, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import { AnimatedCard, PageTransition, StaggerContainer, StaggerItem } from '@/components/AnimatedUI';
import { formatCurrency } from '@/lib/utils';

const departments = [
  { id: '1', name: "Men's Fellowship", leader: 'Chief Emmanuel Okonkwo', members: 280, budget: 500000, spent: 320000, branch: 'All Branches' },
  { id: '2', name: "Women's Ministry", leader: 'Mrs. Grace Adeleke', members: 350, budget: 600000, spent: 410000, branch: 'All Branches' },
  { id: '3', name: 'Youth Department', leader: 'Bro. David Nwachukwu', members: 420, budget: 450000, spent: 280000, branch: 'All Branches' },
  { id: '4', name: 'Choir', leader: 'Sister Sarah Ogundimu', members: 180, budget: 350000, spent: 220000, branch: 'All Branches' },
  { id: '5', name: 'Ushering', leader: 'Bro. Michael Ajayi', members: 120, budget: 150000, spent: 85000, branch: 'All Branches' },
  { id: '6', name: 'Protocol', leader: 'Sister Chioma Eze', members: 60, budget: 100000, spent: 55000, branch: 'All Branches' },
  { id: '7', name: 'Media & Technical', leader: 'Bro. Tunde Bakare', members: 45, budget: 200000, spent: 150000, branch: 'All Branches' },
  { id: '8', name: "Children's Ministry", leader: 'Sister Folake Coker', members: 80, budget: 180000, spent: 110000, branch: 'All Branches' },
];

export default function DepartmentsPage() {
  return (
    <PageTransition>
      <Header
        title="Departments"
        subtitle="Manage all church departments and ministries"
        userRole="GENERAL_OVERSEER"
        userName="Pastor Adebayo Johnson"
      />

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, i) => {
          const budgetPercent = Math.round((dept.spent / dept.budget) * 100);
          return (
            <StaggerItem key={dept.id}>
              <AnimatedCard className="p-6 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center">
                    <Church size={22} className="text-primary" />
                  </div>
                  <a href={`/dashboard/departments/${dept.id}`} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-primary transition-colors">
                    <ArrowUpRight size={16} />
                  </a>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-1">{dept.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{dept.leader}</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500">Members</p>
                    <p className="text-lg font-bold text-slate-800">{dept.members}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500">Budget</p>
                    <p className="text-lg font-bold text-slate-800">{formatCurrency(dept.budget)}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">Budget Used</span>
                    <span className="text-xs font-semibold text-slate-700">{budgetPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${budgetPercent}%` }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.05 }}
                      className={`h-2 rounded-full ${
                        budgetPercent > 90 ? 'bg-red-500' :
                        budgetPercent > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-slate-400">{formatCurrency(dept.spent)} spent</span>
                    <span className="text-[10px] text-slate-400">{formatCurrency(dept.budget - dept.spent)} remaining</span>
                  </div>
                </div>
              </AnimatedCard>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </PageTransition>
  );
}
