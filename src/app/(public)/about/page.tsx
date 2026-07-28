'use client';

import { motion } from 'framer-motion';
import { Heart, Eye, Target, Users, Church, Globe } from 'lucide-react';

const leadership = [
  { name: 'Pastor J.A. Adelaja', role: 'General Overseer', desc: 'Provides overall spiritual leadership and vision for all CACGM branches.' },
  { name: 'Pastor F.O. Adeyemi', role: 'Headquarters Pastor', desc: 'Oversees the headquarters branch and coordinates inter-branch activities.' },
  { name: 'Pastor T.O. Balogun', role: 'Surulere Branch Pastor', desc: 'Leads the Surulere congregation with a passion for community outreach.' },
  { name: 'Pastor E.A. Okafor', role: 'Youth President', desc: 'Directs youth ministry across all branches with dynamic programs.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#1a3a5c] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-white/40 text-sm font-medium tracking-wide uppercase mb-4">About Us</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Our Mission & Vision</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/50 text-lg mt-4 max-w-2xl leading-relaxed">
            Christ Apostolic Church of God Mission is dedicated to spreading the Gospel and building strong faith communities across Nigeria and beyond.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 bg-slate-50 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#1a3a5c] flex items-center justify-center text-white mb-5"><Target size={22} /></div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-500 leading-relaxed">To glorify God by winning souls, making disciples, and equipping believers with the tools they need to serve effectively in their communities.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#c8a44e] flex items-center justify-center text-white mb-5"><Eye size={22} /></div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-500 leading-relaxed">To be a globally recognized church mission that transforms lives, restores hope, and builds enduring communities of faith through the power of the Holy Spirit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-[#c8a44e] uppercase tracking-[0.2em] mb-4">Our Values</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Heart size={22} />, title: 'Love', desc: 'We love God and love one another as Christ loved us.' },
              { icon: <Church size={22} />, title: 'Worship', desc: 'We worship God in spirit and in truth with reverence.' },
              { icon: <Users size={22} />, title: 'Community', desc: 'We build strong relationships rooted in fellowship.' },
              { icon: <Globe size={22} />, title: 'Outreach', desc: 'We share the Gospel locally and globally with urgency.' },
              { icon: <Target size={22} />, title: 'Excellence', desc: 'We pursue excellence in all we do for God\'s glory.' },
              { icon: <Eye size={22} />, title: 'Integrity', desc: 'We walk in honesty and transparency before God and man.' },
            ].map((v) => (
              <div key={v.title} className="p-6 bg-white rounded-xl border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-[#1a3a5c]/5 flex items-center justify-center text-[#1a3a5c] mb-4">{v.icon}</div>
                <h3 className="font-semibold text-slate-800 mb-2">{v.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-[#c8a44e] uppercase tracking-[0.2em] mb-4">Leadership</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Our Pastors</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((p) => (
              <div key={p.name} className="text-center p-6 bg-slate-50 rounded-2xl">
                <div className="w-20 h-20 rounded-full bg-[#1a3a5c]/10 mx-auto mb-4 flex items-center justify-center text-[#1a3a5c]"><Church size={28} /></div>
                <h3 className="font-bold text-slate-800">{p.name}</h3>
                <p className="text-[#c8a44e] text-sm font-medium mt-1">{p.role}</p>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
