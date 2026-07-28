'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Users, Church, Globe, Heart, Calendar, Clock, BarChart3, Shield } from 'lucide-react';

const stats = [
  { value: '6+', label: 'Branches' },
  { value: '2,847', label: 'Members' },
  { value: '₦35.5M', label: 'Year-to-Date Giving' },
  { value: '8', label: 'Departments' },
];

const features = [
  { icon: <Users size={24} />, title: 'Member Management', desc: 'Track and manage all church members across branches.' },
  { icon: <MapPin size={24} />, title: 'Branch Locator', desc: 'Find the nearest CACGM branch with GPS navigation.' },
  { icon: <Heart size={24} />, title: 'Online Giving', desc: 'Give securely online with instant confirmation.' },
  { icon: <Calendar size={24} />, title: 'Attendance Tracking', desc: 'Record and monitor service attendance.' },
  { icon: <BarChart3 size={24} />, title: 'Analytics', desc: 'Comprehensive insights into church growth.' },
  { icon: <Shield size={24} />, title: 'Role-Based Access', desc: 'Multi-level dashboards for every leader.' },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#1a3a5c]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a5c] via-[#1a3a5c] to-[#0f2640]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <p className="text-white/40 text-sm font-medium tracking-wide uppercase mb-6">Christ Apostolic Church of God Mission</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              Church Management<br />Made Simple
            </h1>
            <p className="text-lg text-white/50 mt-6 max-w-lg leading-relaxed">
              A comprehensive platform to manage members, track attendance, process giving, and connect all CACGM branches.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-10">
              <Link href="/dashboard" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#1a3a5c] rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors">
                Open Dashboard <ArrowRight size={15} />
              </Link>
              <Link href="/about" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white border border-white/20 rounded-lg text-sm font-medium hover:bg-white/15 transition-colors">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative -mt-10 z-10 mb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 px-10 py-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-[#1a3a5c]">{stat.value}</p>
                <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold text-[#c8a44e] uppercase tracking-[0.2em] mb-4">About CACGM</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">A Mission Rooted in Faith</h2>
              <p className="text-slate-500 mt-5 leading-relaxed">
                Christ Apostolic Church of God Mission has been a beacon of hope and faith. Our management platform connects every branch under one unified system.
              </p>
              <Link href="/about" className="inline-flex items-center gap-1.5 text-[#1a3a5c] font-semibold text-sm mt-8 hover:underline">
                Read Our Story <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {features.slice(0, 4).map((f) => (
                <div key={f.title} className="p-5 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-[#1a3a5c]/5 flex items-center justify-center text-[#1a3a5c] mb-3">{f.icon}</div>
                  <h3 className="font-semibold text-slate-800 text-sm">{f.title}</h3>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BRANCHES PREVIEW */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-[#c8a44e] uppercase tracking-[0.2em] mb-4">Our Locations</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Find a Congregation</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: 'Headquarters', addr: '12 Allen Avenue, Ikeja, Lagos', time: 'Sundays 8:00 & 10:30 AM' },
              { name: 'Surulere', addr: '45 Bode Thomas Street, Surulere', time: 'Sundays 9:00 AM' },
              { name: 'Yaba', addr: '78 Herbert Macaulay Way, Yaba', time: 'Sundays 9:00 AM' },
              { name: 'Ikeja GRA', addr: '23 Oba Akran Avenue, Ikeja GRA', time: 'Sundays 9:00 AM' },
              { name: 'Lekki', addr: '15 Admiralty Way, Lekki Phase 1', time: 'Sundays 9:00 AM' },
              { name: 'Ikorodu', addr: '33 Benson Street, Ikorodu', time: 'Sundays 9:00 AM' },
            ].map((b) => (
              <div key={b.name} className="p-6 bg-white rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1a3a5c]/5 flex items-center justify-center text-[#1a3a5c] flex-shrink-0"><MapPin size={16} /></div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{b.name}</h3>
                    <p className="text-slate-400 text-sm mt-1">{b.addr}</p>
                    <p className="text-[#1a3a5c] text-sm font-medium mt-2 flex items-center gap-1.5"><Clock size={12} /> {b.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/locations" className="inline-flex items-center gap-1.5 text-[#1a3a5c] font-semibold text-sm hover:underline">
              View All Locations <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Ready to Get Started?</h2>
          <p className="text-slate-500 mt-4 max-w-lg mx-auto leading-relaxed">
            Join CACGM branches already using our platform to streamline their operations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link href="/dashboard" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1a3a5c] text-white rounded-lg text-sm font-semibold hover:bg-[#1a3a5c]/90 transition-colors">
              Open Dashboard <ArrowRight size={15} />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
