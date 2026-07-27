'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Shield, Database, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import { useUser } from '@/hooks/useUser';
import { AnimatedCard, PageTransition } from '@/components/AnimatedUI';

interface AuditLog {
  id: string;
  action: string;
  entity: string;
  entityId: string | null;
  newData: any;
  createdAt: string;
}

export default function SettingsPage() {
  const { userRole, userName } = useUser();
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);

  useEffect(() => {
    fetch('/api/audit?limit=20')
      .then(r => r.json())
      .then(data => { setAuditLogs(data.logs || []); setLoadingLogs(false); })
      .catch(() => setLoadingLogs(false));
  }, []);

  return (
    <PageTransition>
      <Header
        title="Settings"
        subtitle="Manage your account and application preferences"
        userRole={userRole}
        userName={userName}
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
              <input type="text" defaultValue={userName} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Email</label>
              <input type="email" placeholder="your@email.com" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Phone</label>
              <input type="tel" placeholder="+234 800 000 0000" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
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

        <AnimatedCard delay={0.4} className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
              <Database size={20} className="text-violet-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Audit Log</h3>
              <p className="text-sm text-slate-500">Recent system activity and changes</p>
            </div>
          </div>
          {loadingLogs ? (
            <div className="flex justify-center py-8"><Loader2 size={24} className="animate-spin text-slate-400" /></div>
          ) : auditLogs.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-6">No activity recorded yet.</p>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {auditLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                    log.action === 'CREATE' ? 'bg-emerald-100 text-emerald-700' :
                    log.action === 'UPDATE' ? 'bg-blue-100 text-blue-700' :
                    log.action === 'DELETE' ? 'bg-red-100 text-red-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {log.action[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-slate-800">
                      <span className="font-medium">{log.action}</span> {log.entity}
                      {log.entityId && <span className="text-slate-400 ml-1">({log.entityId.slice(0, 8)}...)</span>}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AnimatedCard>
      </div>
    </PageTransition>
  );
}
