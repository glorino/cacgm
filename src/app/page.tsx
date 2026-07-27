'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
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
  Globe,
  Check,
  Church,
  Play,
} from 'lucide-react';

const features = [
  { icon: <Users size={32} />, title: 'Member Management', description: 'Track and manage all church members across branches with detailed profiles, roles, and contact information.', color: 'bg-blue-50 text-blue-600' },
  { icon: <MapPin size={32} />, title: 'Branch Locator', description: 'Find the nearest CACGM branch with real-time GPS navigation and turn-by-turn directions.', color: 'bg-emerald-50 text-emerald-600' },
  { icon: <Heart size={32} />, title: 'Online Giving', description: 'Give securely online via Flutterwave with instant confirmation, receipts, and full transaction history.', color: 'bg-rose-50 text-rose-600' },
  { icon: <BarChart3 size={32} />, title: 'Analytics Dashboard', description: 'Comprehensive insights into attendance trends, financial giving, and church growth metrics.', color: 'bg-violet-50 text-violet-600' },
  { icon: <Calendar size={32} />, title: 'Attendance Tracking', description: 'Record and monitor service attendance across all departments with detailed breakdowns.', color: 'bg-amber-50 text-amber-600' },
  { icon: <Shield size={32} />, title: 'Role-Based Access', description: 'Multi-level dashboards for General Overseer, Branch Pastors, and Department Presidents.', color: 'bg-indigo-50 text-indigo-600' },
];

const roles = [
  { title: 'General Overseer', desc: 'Full oversight across all branches with cross-branch analytics and comparison tools.', color: 'bg-[#1a3a5c]' },
  { title: 'Branch Pastor', desc: 'Manage your branch members, attendance, finances, and department performance.', color: 'bg-[#c8a44e]' },
  { title: 'Department President', desc: 'Lead your ministry with dedicated portals for events, members, and budget tracking.', color: 'bg-emerald-600' },
];

const branches = [
  { name: 'Headquarters', address: '12 Allen Avenue, Ikeja, Lagos', time: 'Sundays 8:00 & 10:30 AM' },
  { name: 'Surulere', address: '45 Bode Thomas Street, Surulere', time: 'Sundays 9:00 AM' },
  { name: 'Yaba', address: '78 Herbert Macaulay Way, Yaba', time: 'Sundays 9:00 AM' },
  { name: 'Ikeja GRA', address: '23 Oba Akran Avenue, Ikeja GRA', time: 'Sundays 9:00 AM' },
  { name: 'Lekki', address: '15 Admiralty Way, Lekki Phase 1', time: 'Sundays 9:00 AM' },
  { name: 'Ikorodu', address: '33 Benson Street, Ikorodu', time: 'Sundays 9:00 AM' },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#1a3a5c] flex items-center justify-center">
                <span className="text-white font-bold text-sm">CA</span>
              </div>
              <div>
                <span className={`font-bold text-lg tracking-tight ${scrolled ? 'text-[#1a3a5c]' : 'text-white'}`}>CACGM</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {['Features', 'About', 'Locations'].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    scrolled
                      ? 'text-slate-600 hover:text-[#1a3a5c] hover:bg-slate-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className={`hidden sm:flex text-sm font-medium transition-all px-4 py-2 rounded-lg ${
                  scrolled ? 'text-slate-600 hover:text-[#1a3a5c]' : 'text-white/90 hover:text-white'
                }`}
              >
                Sign In
              </Link>
              <Link
                href="/dashboard"
                className={`hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  scrolled
                    ? 'bg-[#1a3a5c] text-white hover:bg-[#1a3a5c]/90'
                    : 'bg-white text-[#1a3a5c] hover:bg-white/90'
                }`}
              >
                Dashboard
                <ArrowRight size={15} />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="px-6 py-6 space-y-1">
                {['Features', 'About', 'Locations'].map((label) => (
                  <a
                    key={label}
                    href={`#${label.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 font-medium"
                  >
                    {label}
                  </a>
                ))}
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 font-medium">Sign In</Link>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg bg-[#1a3a5c] text-white text-center font-semibold mt-2">Open Dashboard</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero - Full bleed with background image effect */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#1a3a5c]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a5c] via-[#1a3a5c]/95 to-[#0f2640]" />
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#c8a44e]/5 rounded-full blur-[200px]"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/3 rounded-full blur-[150px]"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full text-white/80 text-sm font-medium backdrop-blur-sm mb-8"
            >
              <Sparkles size={14} className="text-[#c8a44e]" />
              Christ Apostolic Church of God Mission
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight"
            >
              Church Management{' '}
              <span className="text-[#c8a44e]">Made Simple</span>
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
              className="flex flex-col sm:flex-row items-start gap-4 mt-12"
            >
              <Link
                href="/dashboard"
                className="group flex items-center gap-3 px-8 py-4 bg-white text-[#1a3a5c] rounded-xl text-sm font-bold hover:bg-white/95 transition-all shadow-xl"
              >
                Open Dashboard
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/branches"
                className="group flex items-center gap-3 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl text-sm font-semibold hover:bg-white/15 backdrop-blur-sm transition-all"
              >
                <MapPin size={18} />
                Find a Branch
              </Link>
            </motion.div>
          </div>

          {/* Hero cards overlay */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              { icon: <MapPin size={20} />, title: 'Find a Congregation', desc: 'We gather for services each weekend', href: '/branches' },
              { icon: <Play size={20} />, title: 'Watch Online', desc: 'Experience CACGM from anywhere', href: '/dashboard' },
              { icon: <Heart size={20} />, title: 'Give', desc: 'Support our mission securely online', href: '/dashboard/giving' },
            ].map((card, i) => (
              <Link
                key={card.title}
                href={card.href}
                className="group flex items-start gap-4 p-5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/15 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[#c8a44e]/20 flex items-center justify-center text-[#c8a44e] flex-shrink-0">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{card.title}</h3>
                  <p className="text-white/50 text-xs mt-1">{card.desc}</p>
                </div>
                <ChevronRight size={16} className="text-white/30 group-hover:text-white/60 mt-1 ml-auto flex-shrink-0 transition-colors" />
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Stats */}
      <section className="relative -mt-16 z-10 mb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 p-10 grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { value: '6+', label: 'Active Branches' },
              { value: '2,847', label: 'Registered Members' },
              { value: '₦35.5M', label: 'Year-to-Date Giving' },
              { value: '8', label: 'Departments' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl sm:text-4xl font-bold text-[#1a3a5c]">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features - Clean card grid */}
      <section id="features" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold text-[#c8a44e] uppercase tracking-wider mb-4"
            >
              Features
            </motion.p>
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
              className="text-lg text-slate-500 mt-6 leading-relaxed"
            >
              Powerful tools to manage every aspect of your church operations.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                <div className="flex items-center gap-1.5 mt-5 text-sm font-semibold text-[#1a3a5c] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Roles */}
      <section id="about" className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-semibold text-[#c8a44e] uppercase tracking-wider mb-4"
              >
                Multi-Role Access
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight"
              >
                Built for Every{' '}
                <span className="text-[#c8a44e]">Leader</span>
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

            <div className="space-y-4">
              {roles.map((role, i) => (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex gap-5 p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl ${role.color} flex items-center justify-center flex-shrink-0`}>
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

      {/* Locations */}
      <section id="locations" className="py-32 bg-[#1a3a5c]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold text-[#c8a44e] uppercase tracking-wider mb-4"
            >
              Our Locations
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-white tracking-tight"
            >
              Find a Congregation
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {branches.map((branch, i) => (
              <motion.div
                key={branch.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/15 transition-all group"
              >
                <h3 className="text-white font-bold text-lg">{branch.name}</h3>
                <p className="text-white/50 text-sm mt-2">{branch.address}</p>
                <p className="text-[#c8a44e] text-sm mt-3 font-medium">{branch.time}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/branches"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1a3a5c] rounded-xl text-sm font-semibold hover:bg-white/90 transition-all"
            >
              <MapPin size={16} />
              View All Locations
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
              Ready to Transform Your{' '}
              <span className="text-[#c8a44e]">Church?</span>
            </h2>
            <p className="text-lg text-slate-500 mt-6 max-w-xl mx-auto leading-relaxed">
              Join CACGM branches already using our platform to streamline their operations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link
                href="/dashboard"
                className="group flex items-center gap-3 px-8 py-4 bg-[#1a3a5c] text-white rounded-xl text-sm font-bold hover:bg-[#1a3a5c]/90 transition-all shadow-lg shadow-[#1a3a5c]/20"
              >
                Get Started
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/branches"
                className="group flex items-center gap-3 px-8 py-4 bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-all"
              >
                <MapPin size={18} />
                Visit a Branch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f2640] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#c8a44e] flex items-center justify-center">
                  <span className="text-[#1a3a5c] font-bold text-sm">CA</span>
                </div>
                <span className="font-bold text-lg">CACGM</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Christ Apostolic Church of God Mission. Unifying church management across all branches.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-white/70 mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {['Features', 'About', 'Find Branch', 'Dashboard'].map((link) => (
                  <li key={link}>
                    <Link href={link === 'Features' ? '#features' : link === 'About' ? '#about' : link === 'Find Branch' ? '/branches' : '/dashboard'} className="text-white/50 text-sm hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-white/70 mb-4">Account</h4>
              <ul className="space-y-3">
                {['Sign In', 'Register', 'Giving', 'Attendance'].map((link) => (
                  <li key={link}>
                    <Link href={link === 'Sign In' ? '/login' : link === 'Register' ? '/register' : `/dashboard/${link.toLowerCase()}`} className="text-white/50 text-sm hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-white/70 mb-4">Contact</h4>
              <ul className="space-y-3 text-white/50 text-sm">
                <li>12 Allen Avenue, Ikeja, Lagos</li>
                <li>+234 801 234 5678</li>
                <li>info@cacgm.org</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} CACGM. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/login" className="text-white/40 text-sm hover:text-white/70 transition-colors">Privacy</Link>
              <Link href="/login" className="text-white/40 text-sm hover:text-white/70 transition-colors">Terms</Link>
              <Link href="/login" className="text-white/40 text-sm hover:text-white/70 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
