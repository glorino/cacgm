'use client';

import { motion } from 'framer-motion';
import { Settings, User, Bell, Shield, Palette, Database } from 'lucide-react';
import Header from '@/components/Header';
import { AnimatedCard, PageTransition } from '@/components/AnimatedUI';

export default function SettingsPage() {
  return (
    <PageTransition>
      <Header
        title="Settings"
        subtitle="Manage your account and application preferences"
        userRole="GENERAL_OVERSEER"
        userName="Pastor Adebayo Johnson"
      />

      <div className="max-w-3xl space-y-6">
        <AnimatedCard delay={0.1} className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
              <User size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Profile Settings</h3>
              <p className="text-sm text-slate-500">Manage your personal information</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Full Name</label>
              <input type="text" defaultValue="Pastor Adebayo Johnson" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Email</label>
              <input type="email" defaultValue="pastor.j@cacgm.org" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Phone</label>
              <input type="tel" defaultValue="+234 801 234 5678" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
              Save Changes
            </button>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.2} className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Bell size={20} className="text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Notification Settings</h3>
              <p className="text-sm text-slate-500">Configure notification preferences</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Email notifications for new members', checked: true },
              { label: 'Transaction alerts', checked: true },
              { label: 'Weekly attendance reports', checked: false },
              { label: 'Department updates', checked: true },
            ].map((item, i) => (
              <label key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
                <span className="text-sm text-slate-700">{item.label}</span>
                <div className={`w-10 h-6 rounded-full relative transition-colors ${item.checked ? 'bg-primary' : 'bg-slate-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${item.checked ? 'translate-x-5' : 'translate-x-1'}`} />
                </div>
              </label>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.3} className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Shield size={20} className="text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Security</h3>
              <p className="text-sm text-slate-500">Manage password and security settings</p>
            </div>
          </div>
          <button className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors">
            Change Password
          </button>
        </AnimatedCard>
      </div>
    </PageTransition>
  );
}
