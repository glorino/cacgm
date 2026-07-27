'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import {
  Church,
  Users,
  MapPin,
  Heart,
  BarChart3,
  Shield,
  ArrowRight,
  Calendar,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Zap,
  Globe,
  Check,
} from 'lucide-react';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'About', href: '#about' },
  { label: 'Find Branch', href: '/branches' },
];

const features = [
  {
    icon: <Users size={28} />,
    title: 'Member Management',
    description: 'Track and manage all church members across branches with detailed profiles, roles, and contact information.',
    color: 'bg-blue-50 text-blue-600',
    accent: 'from-blue-500 to-blue-600',
  },
  {
    icon: <MapPin size={28} />,
    title: 'Branch Locator',
    description: 'Find the nearest CACGM branch with real-time GPS navigation and turn-by-turn directions.',
    color: 'bg-emerald-50 text-emerald-600',
    accent: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: <Heart size={28} />,
    title: 'Online Giving',
    description: 'Give securely online via Flutterwave with instant confirmation, receipts, and full transaction history.',
    color: 'bg-rose-50 text-rose-600',
    accent: 'from-rose-500 to-rose-600',
  },
  {
    icon: <BarChart3 size={28} />,
    title: 'Analytics Dashboard',
    description: 'Comprehensive insights into attendance trends, financial giving, and church growth metrics.',
    color: 'bg-violet-50 text-violet-600',
    accent: 'from-violet-500 to-violet-600',
  },
  {
    icon: <Calendar size={28} />,
    title: 'Attendance Tracking',
    description: 'Record and monitor service attendance across all departments with detailed breakdowns.',
    color: 'bg-amber-50 text-amber-600',
    accent: 'from-amber-500 to-amber-600',
  },
  {
    icon: <Shield size={28} />,
    title: 'Role-Based Access',
    description: 'Multi-level dashboards for General Overseer, Branch Pastors, and Department Presidents.',
    color: 'bg-indigo-50 text-indigo-600',
    accent: 'from-indigo-500 to-indigo-600',
  },
];

const stats = [
  { value: '6+', label: 'Active Branches', suffix: '' },
  { value: '2,847', label: 'Registered Members', suffix: '' },
  { value: '₦35.5M', label: 'Year-to-Date Giving', suffix: '' },
  { value: '8', label: 'Departments', suffix: '' },
];

const roles = [
  { title: 'General Overseer', desc: 'Full oversight across all branches with cross-branch analytics and comparison tools.', color: 'bg-primary' },
  { title: 'Branch Pastor', desc: 'Manage your branch members, attendance, finances, and department performance.', color: 'bg-accent' },
  { title: 'Department President', desc: 'Lead your ministry with dedicated portals for events, members, and budget tracking.', color: 'bg-emerald-600' },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-100' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-shadow">
                <span className="text-white font-bold text-sm">CA</span>
              </div>
              <div className="hidden sm:block">
                <span className={`font-bold text-base ${scrolled ? 'text-slate-800' : 'text-white'}`}>CACGM</span>
                <span className={`text-[11px] ml-1.5 ${scrolled ? 'text-slate-400' : 'text-white/50'}`}>Church Management</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1 border border-white/10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    scrolled
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className={`hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  scrolled
                    ? 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Sign In
              </Link>
              <Link
                href="/dashboard"
                className={`hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  scrolled
                    ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20'
                    : 'bg-white text-primary hover:bg-white/90 shadow-lg shadow-black/10'
                }`}
              >
                Dashboard
                <ArrowRight size={16} />
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-slate-100 shadow-lg"
          >
            <div className="px-6 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 text-center"
              >
                Sign In
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-semibold bg-primary text-white text-center mt-3"
              >
                Open Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-light/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

          {/* Floating orbs */}
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-32 right-[15%] w-4 h-4 bg-accent/30 rounded-full"
          />
          <motion.div
            animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-40 left-[20%] w-3 h-3 bg-white/20 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute top-48 left-[10%] w-2 h-2 bg-accent/20 rounded-full"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full text-white/80 text-sm font-medium backdrop-blur-sm mb-8"
              >
                <Sparkles size={14} className="text-accent" />
                Christ Apostolic Church of God Mission
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight"
              >
                Church Management{' '}
                <span className="relative inline-block">
                  <span className="text-gradient-gold">Made Simple</span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent/60 to-accent/20 rounded-full origin-left"
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-white/60 mt-8 max-w-xl leading-relaxed"
              >
                A comprehensive platform to manage members, track attendance, process giving, and connect all branches of CACGM under one unified system.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-start gap-4 mt-10"
              >
                <Link
                  href="/dashboard"
                  className="group flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-2xl text-sm font-bold hover:bg-white/95 transition-all shadow-2xl shadow-black/20 hover:shadow-3xl"
                >
                  Open Dashboard
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/branches"
                  className="group flex items-center gap-3 px-8 py-4 bg-white/10 text-white border border-white/15 rounded-2xl text-sm font-semibold hover:bg-white/15 backdrop-blur-sm transition-all"
                >
                  <MapPin size={18} />
                  Find a Branch
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-6 mt-12"
              >
                {[
                  { icon: <Check size={14} />, text: 'Free to use' },
                  { icon: <Check size={14} />, text: 'Secure payments' },
                  { icon: <Check size={14} />, text: 'Multi-branch' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-white/50 text-xs font-medium">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-accent">
                      {item.icon}
                    </div>
                    {item.text}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-primary-light/20 rounded-3xl blur-2xl" />
                <div className="relative bg-[#111827] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/5">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#1a2332] border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                      <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-[#0d1520] rounded-lg px-3 py-1.5 text-[11px] text-slate-400 font-mono">
                        cacgm.org/dashboard
                      </div>
                    </div>
                  </div>

                  {/* Dashboard content */}
                  <div className="p-5">
                    <div className="flex gap-4">
                      {/* Sidebar mock */}
                      <div className="w-44 space-y-2 flex-shrink-0">
                        <div className="h-8 bg-primary/30 rounded-lg" />
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="flex items-center gap-2 px-2 py-1.5">
                            <div className="w-4 h-4 rounded bg-white/10" />
                            <div className="h-2.5 rounded bg-white/10" style={{ width: `${55 + Math.random() * 35}%` }} />
                          </div>
                        ))}
                      </div>

                      {/* Main content mock */}
                      <div className="flex-1 space-y-4">
                        {/* Metric cards */}
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: 'Members', value: '2,847', change: '+12%', color: 'bg-blue-500/10' },
                            { label: 'Giving', value: '₦6.3M', change: '+8%', color: 'bg-emerald-500/10' },
                            { label: 'Attendance', value: '1,380', change: '+5%', color: 'bg-amber-500/10' },
                            { label: 'Departments', value: '8', change: 'All OK', color: 'bg-violet-500/10' },
                          ].map((card) => (
                            <div key={card.label} className={`${card.color} rounded-xl p-3 border border-white/5`}>
                              <div className="text-[9px] text-slate-400 mb-1">{card.label}</div>
                              <div className="text-base font-bold text-white">{card.value}</div>
                              <div className="text-[9px] text-emerald-400 mt-0.5">{card.change}</div>
                            </div>
                          ))}
                        </div>

                        {/* Chart mock */}
                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <div className="text-[9px] text-slate-400 mb-3">Financial Trends</div>
                          <div className="flex items-end gap-1.5 h-20">
                            {[40, 55, 45, 65, 50, 70, 60, 75, 55, 80, 65, 85].map((h, i) => (
                              <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
                                className="flex-1 bg-gradient-to-t from-accent/60 to-accent/30 rounded-t"
                              />
                            ))}
                          </div>
                        </div>

                        {/* Table mock */}
                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <div className="text-[9px] text-slate-400 mb-2">Recent Transactions</div>
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0">
                              <div className="w-6 h-6 rounded-full bg-white/10" />
                              <div className="flex-1">
                                <div className="h-2 bg-white/10 rounded w-20 mb-0.5" />
                                <div className="h-1.5 bg-white/5 rounded w-12" />
                              </div>
                              <div className="h-2 bg-emerald-500/30 rounded w-12" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-8 z-10 mb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl sm:text-4xl font-bold text-gradient-gold">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/5 border border-primary/10 rounded-full text-primary text-xs font-semibold mb-4 uppercase tracking-wider"
            >
              <Zap size={12} />
              Features
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight"
            >
              Everything You Need
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 mt-5 leading-relaxed"
            >
              Powerful tools to manage every aspect of your church operations, from member tracking to financial management.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white rounded-2xl p-10 border border-slate-100 card-hover cursor-default"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                <div className="flex items-center gap-1.5 mt-5 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Roles Section */}
      <section id="about" className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent-dark text-xs font-semibold mb-4 uppercase tracking-wider"
              >
                <Globe size={12} />
                Multi-Role Access
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight"
              >
                Built for Every{' '}
                <span className="text-gradient-gold">Leader</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-slate-500 mt-6 leading-relaxed"
              >
                Whether you oversee the entire mission or lead a local branch, CACGM gives you the tools and insights you need.
              </motion.p>
            </div>

            <div className="space-y-6">
              {roles.map((role, i) => (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="group flex gap-5 p-6 bg-white rounded-2xl border border-slate-100 card-hover cursor-default"
                >
                  <div className={`w-12 h-12 rounded-xl ${role.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <Shield size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-800">{role.title}</h4>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">{role.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-primary rounded-3xl overflow-hidden p-20 text-center"
          >
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[100px]" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Ready to Transform Your{' '}
                <span className="text-gradient-gold">Church Management?</span>
              </h2>
              <p className="text-white/60 mt-6 max-w-xl mx-auto text-lg leading-relaxed">
                Join CACGM branches already using our platform to streamline their operations and connect their congregations.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                <Link
                  href="/dashboard"
                  className="group flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-2xl text-sm font-bold hover:bg-white/95 transition-all shadow-2xl shadow-black/20"
                >
                  Get Started
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/branches"
                  className="group flex items-center gap-3 px-8 py-4 bg-white/10 text-white border border-white/15 rounded-2xl text-sm font-semibold hover:bg-white/15 backdrop-blur-sm transition-all"
                >
                  <MapPin size={18} />
                  Visit a Branch
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-bold text-xs">CA</span>
              </div>
              <div>
                <span className="font-bold text-sm text-slate-800">CACGM</span>
                <span className="text-xs text-slate-400 ml-1.5">Church Management</span>
              </div>
            </div>

            <nav className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>

            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Christ Apostolic Church of God Mission. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
