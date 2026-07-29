'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  MapPin,
  Heart,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Church,
  Menu,
  X,
  Shield,
  TrendingUp,
  UserCheck,
  Landmark,
  Home,
} from 'lucide-react';
import { cn, getInitials, getRoleLabel } from '@/lib/utils';
import { hasPermission, type Permission } from '@/lib/rbac';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  permission?: Permission;
}

const navItems: NavItem[] = [
  { label: 'Homepage', href: '/', icon: <Home size={20} /> },
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Members', href: '/dashboard/members', icon: <Users size={20} />, permission: 'members:view' },
  { label: 'Attendance', href: '/dashboard/attendance', icon: <UserCheck size={20} />, permission: 'attendance:view' },
  { label: 'Giving', href: '/dashboard/giving', icon: <Heart size={20} />, permission: 'giving:view' },
  { label: 'Transactions', href: '/dashboard/transactions', icon: <Landmark size={20} />, permission: 'transactions:view' },
  { label: 'Departments', href: '/dashboard/departments', icon: <Church size={20} />, permission: 'departments:view' },
  { label: "Men's Fellowship", href: '/dashboard/departments/mens', icon: <Shield size={20} />, permission: 'departments:view' },
  { label: "Women's Ministry", href: '/dashboard/departments/womens', icon: <Shield size={20} />, permission: 'departments:view' },
  { label: 'Youth Department', href: '/dashboard/departments/youth', icon: <Shield size={20} />, permission: 'departments:view' },
  { label: 'Find Branch', href: '/branches', icon: <MapPin size={20} /> },
  { label: 'Analytics', href: '/dashboard/analytics', icon: <TrendingUp size={20} />, permission: 'analytics:view' },
  { label: 'Settings', href: '/dashboard/settings', icon: <Settings size={20} />, permission: 'settings:view' },
];

interface SidebarProps {
  userRole?: string;
  userName?: string;
  branchName?: string;
}

  export default function Sidebar({ userRole = 'MEMBER', userName = 'User', branchName = '' }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const filteredNav = navItems.filter(
    (item) => !item.permission || hasPermission(userRole, item.permission)
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className={cn(
        'flex items-center gap-3 px-4 py-5 border-b border-slate-200/60',
        collapsed && 'justify-center px-2'
      )}>
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">CA</span>
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="overflow-hidden"
          >
            <h1 className="font-bold text-sm text-slate-800 leading-tight">CACGM</h1>
            <p className="text-[10px] text-slate-500 leading-tight">Church Management</p>
          </motion.div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {filteredNav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 group relative',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800',
                collapsed && 'justify-center px-2'
              )}
              style={{ fontSize: collapsed ? 14 : 15 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary rounded-r-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className={cn(
                'flex-shrink-0 transition-colors',
                isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'
              )}>
                {item.icon}
              </span>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className={cn(
        'border-t border-slate-200/60 p-3',
        collapsed && 'px-2'
      )}>
        <div className={cn(
          'flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 mb-2',
          collapsed && 'justify-center px-2'
        )}>
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-semibold text-xs">
              {getInitials(userName)}
            </span>
          </div>
          {!collapsed && (
            <div className="overflow-hidden min-w-0">
              <p className="font-medium text-slate-800 truncate" style={{ fontSize: 14 }}>{userName}</p>
              <p className="text-slate-500 truncate" style={{ fontSize: 11 }}>{getRoleLabel(userRole)}</p>
            </div>
          )}
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className={cn(
            'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl font-medium transition-all duration-200 text-red-500 hover:bg-red-50',
            collapsed && 'justify-center px-2'
          )}
          style={{ fontSize: 14 }}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-white shadow-lg border border-slate-200"
      >
        <Menu size={20} className="text-slate-600" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-72 h-full bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-100"
              >
                <X size={18} className="text-slate-500" />
              </button>
              <SidebarContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden lg:flex flex-col h-screen bg-white border-r border-slate-200/60 sticky top-0 z-40"
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-50 transition-colors z-50"
        >
          {collapsed ? (
            <ChevronRight size={12} className="text-slate-500" />
          ) : (
            <ChevronLeft size={12} className="text-slate-500" />
          )}
        </button>
      </motion.aside>
    </>
  );
}
