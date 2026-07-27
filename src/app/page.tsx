'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Church,
  Users,
  MapPin,
  Heart,
  BarChart3,
  Shield,
  ArrowRight,
  ChevronRight,
  Globe,
  Calendar,
  Landmark,
} from 'lucide-react';

const features = [
  {
    icon: <Users size={24} />,
    title: 'Member Management',
    description: 'Track and manage all church members across branches with detailed profiles.',
  },
  {
    icon: <MapPin size={24} />,
    title: 'Branch Locator',
    description: 'Find the nearest branch with real-time GPS navigation and directions.',
  },
  {
    icon: <Heart size={24} />,
    title: 'Online Giving',
    description: 'Give securely online via Flutterwave with instant confirmation and receipts.',
  },
  {
    icon: <BarChart3 size={24} />,
    title: 'Analytics Dashboard',
    description: 'Comprehensive insights into attendance, giving, and church growth metrics.',
  },
  {
    icon: <Calendar size={24} />,
    title: 'Attendance Tracking',
    description: 'Record and monitor service attendance across all departments and services.',
  },
  {
    icon: <Shield size={24} />,
    title: 'Role-Based Access',
    description: 'Multi-level dashboards for General Overseer, Branch Pastors, and Presidents.',
  },
];

const stats = [
  { value: '6+', label: 'Active Branches' },
  { value: '2,847', label: 'Registered Members' },
  { value: '₦35.5M', label: 'YTD Giving' },
  { value: '8', label: 'Departments' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs">CA</span>
            </div>
            <div>
              <span className="font-bold text-sm text-slate-800">CACGM</span>
              <span className="hidden sm:inline text-xs text-slate-400 ml-2">Church Management</span>
            </div>
          </div>
          <nav className="flex items-center gap-3">
            <Link href="/branches" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">
              Find Branch
            </Link>
            <Link href="/dashboard" className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-primary/5" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-100/30 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full text-primary text-sm font-medium mb-6"
            >
              <Church size={16} />
              Christ Apostolic Church of God Mission
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
            >
              Church Management{' '}
              <span className="text-gradient-gold">Made Simple</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-500 mt-6 max-w-2xl mx-auto"
            >
              A comprehensive platform to manage members, track attendance, process giving, and connect all branches of CACGM under one unified system.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
            >
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all hover:shadow-lg"
              >
                Open Dashboard
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/branches"
                className="flex items-center gap-2 px-8 py-3.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-all"
              >
                <MapPin size={18} />
                Find a Branch
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 relative max-w-4xl mx-auto"
          >
            <div className="bg-gradient-primary rounded-2xl p-1 shadow-2xl">
              <div className="bg-slate-900 rounded-xl overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-800">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-3 text-xs text-slate-400">cacgm.org/dashboard</span>
                </div>
                <div className="p-6 grid grid-cols-3 gap-4">
                  <div className="col-span-1 space-y-3">
                    <div className="h-8 bg-slate-700/50 rounded-lg w-full" />
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="h-6 bg-slate-700/30 rounded-lg" style={{ width: `${70 + Math.random() * 30}%` }} />
                    ))}
                  </div>
                  <div className="col-span-2 grid grid-cols-2 gap-3">
                    <div className="h-24 bg-slate-700/40 rounded-xl" />
                    <div className="h-24 bg-slate-700/40 rounded-xl" />
                    <div className="h-24 bg-slate-700/40 rounded-xl" />
                    <div className="h-24 bg-slate-700/40 rounded-xl" />
                    <div className="col-span-2 h-32 bg-slate-700/40 rounded-xl" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-slate-900"
            >
              Everything You Need
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 mt-3 max-w-xl mx-auto"
            >
              Powerful tools to manage every aspect of your church operations
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-200/60 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl sm:text-4xl font-bold text-gradient-gold">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white"
          >
            Ready to Transform Your Church Management?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 mt-4 max-w-xl mx-auto"
          >
            Join CACGM branches already using our platform to streamline their operations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-8 py-3.5 bg-white text-primary rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/branches"
              className="flex items-center gap-2 px-8 py-3.5 bg-white/10 text-white border border-white/20 rounded-xl text-sm font-semibold hover:bg-white/20 transition-all"
            >
              <MapPin size={18} />
              Visit a Branch
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-[9px]">CA</span>
            </div>
            <span className="text-sm font-semibold text-slate-700">CACGM</span>
          </div>
          <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} Christ Apostolic Church of God Mission. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
