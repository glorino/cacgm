'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Download, Edit, Trash2, Eye, X, Loader2, User } from 'lucide-react';
import Header from '@/components/Header';
import { useUser } from '@/hooks/useUser';
import { AnimatedCard, PageTransition } from '@/components/AnimatedUI';
import { BRANCHES_DATA } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  createdAt: string;
  branch: { id: string; name: string } | null;
  department: { id: string; name: string } | null;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  branchId: string;
  departmentId: string;
}

const emptyForm: FormData = { name: '', email: '', phone: '', branchId: '', departmentId: '' };

export default function MembersPage() {
  const { userRole, userName } = useUser();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [showModal, setShowModal] = useState<'add' | 'edit' | 'view' | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (branchFilter) params.set('branchId', branchFilter);
    if (search) params.set('search', search);
    const res = await fetch(`/api/members?${params}`);
    if (res.ok) {
      const data = await res.json();
      setMembers(data);
    }
    setLoading(false);
  }, [branchFilter, search]);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    const method = showModal === 'edit' ? 'PUT' : 'POST';
    const url = showModal === 'edit' ? `/api/members/${selectedMember?.id}` : '/api/members';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to save');
        setSaving(false);
        return;
      }
      setShowModal(null);
      setForm(emptyForm);
      fetchMembers();
    } catch {
      setError('Something went wrong');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this member?')) return;
    const res = await fetch(`/api/members/${id}`, { method: 'DELETE' });
    if (res.ok) fetchMembers();
  };

  const openEdit = (m: Member) => {
    setSelectedMember(m);
    setForm({
      name: m.name,
      email: m.email,
      phone: m.phone || '',
      branchId: m.branch?.id || '',
      departmentId: m.department?.id || '',
    });
    setShowModal('edit');
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Branch', 'Department', 'Role', 'Joined'];
    const rows = members.map(m => [m.name, m.email, m.phone || '', m.branch?.name || '', m.department?.name || '', m.role, new Date(m.createdAt).toLocaleDateString()]);
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cacgm-members-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageTransition>
      <Header
        title="Members"
        subtitle={`Managing ${members.length} registered members`}
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
            <input type="text" placeholder="Search members..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <button onClick={() => { setForm(emptyForm); setShowModal('add'); }} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
            <Plus size={16} /> Add Member
          </button>
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </AnimatedCard>

      <AnimatedCard delay={0.2} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Member</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Contact</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase hidden lg:table-cell">Department</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase hidden lg:table-cell">Branch</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center"><Loader2 size={24} className="animate-spin mx-auto text-slate-400" /></td></tr>
              ) : members.map((m, i) => (
                <motion.tr key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.02 }} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold text-xs">{m.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <p className="text-sm font-medium text-slate-800">{m.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <p className="text-sm text-slate-600">{m.email}</p>
                    <p className="text-xs text-slate-400">{m.phone || 'No phone'}</p>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-sm text-slate-600">{m.department?.name || '-'}</span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-sm text-slate-600">{m.branch?.name || '-'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setSelectedMember(m); setShowModal('view'); }} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"><Eye size={15} /></button>
                      <button onClick={() => openEdit(m)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"><Edit size={15} /></button>
                      <button onClick={() => handleDelete(m.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && members.length === 0 && (
          <div className="py-12 text-center text-slate-500 text-sm">No members found.</div>
        )}
      </AnimatedCard>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(showModal === 'add' || showModal === 'edit') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">{showModal === 'edit' ? 'Edit Member' : 'Add Member'}</h3>
                <button onClick={() => setShowModal(null)} className="p-1 rounded-lg hover:bg-slate-100"><X size={18} /></button>
              </div>
              {error && <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="john@cacgm.org" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="+234 800 000 0000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Branch</label>
                  <select value={form.branchId} onChange={(e) => setForm({ ...form, branchId: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="">Select Branch</option>
                    {BRANCHES_DATA.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowModal(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
                <button onClick={handleSave} disabled={saving || !form.name || !form.email} className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : null}
                  {showModal === 'edit' ? 'Update' : 'Create'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {showModal === 'view' && selectedMember && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Member Details</h3>
                <button onClick={() => setShowModal(null)} className="p-1 rounded-lg hover:bg-slate-100"><X size={18} /></button>
              </div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <User size={24} className="text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-slate-800">{selectedMember.name}</h4>
                <p className="text-sm text-slate-500">{selectedMember.role}</p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Email</span>
                  <span className="text-slate-800">{selectedMember.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Phone</span>
                  <span className="text-slate-800">{selectedMember.phone || 'Not provided'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Branch</span>
                  <span className="text-slate-800">{selectedMember.branch?.name || 'None'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Department</span>
                  <span className="text-slate-800">{selectedMember.department?.name || 'None'}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">Joined</span>
                  <span className="text-slate-800">{new Date(selectedMember.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <button onClick={() => setShowModal(null)} className="w-full mt-6 py-2.5 rounded-xl bg-slate-100 text-sm font-medium text-slate-600 hover:bg-slate-200">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
