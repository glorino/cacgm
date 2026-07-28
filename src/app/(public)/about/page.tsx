'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Heart, Church, Globe, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-16" style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #0f2640 100%)' }}>
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>About Us</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Our Mission & Vision</motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg mt-4 max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Christ Apostolic Church of God Mission is dedicated to spreading the Gospel and building strong faith communities.
          </motion.p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl" style={{ background: '#f5f3ef' }}>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5" style={{ background: '#1a3a5c', color: 'white' }}><Target size={20} /></div>
              <h3 className="text-xl font-bold" style={{ color: '#1a1a1a' }}>Our Mission</h3>
              <p className="mt-3 leading-relaxed text-sm" style={{ color: '#8a8580' }}>To glorify God by winning souls, making disciples, and equipping believers with the tools they need to serve effectively in their communities.</p>
            </div>
            <div className="p-8 rounded-3xl" style={{ background: '#f5f3ef' }}>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5" style={{ background: '#c8a44e', color: 'white' }}><Eye size={20} /></div>
              <h3 className="text-xl font-bold" style={{ color: '#1a1a1a' }}>Our Vision</h3>
              <p className="mt-3 leading-relaxed text-sm" style={{ color: '#8a8580' }}>To be a globally recognized church mission that transforms lives, restores hope, and builds enduring communities of faith through the power of the Holy Spirit.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: '#f5f3ef' }}>
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#c8a44e' }}>Our Values</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: '#1a1a1a' }}>What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <Heart size={20} />, title: 'Love', desc: 'We love God and love one another as Christ loved us.' },
              { icon: <Church size={20} />, title: 'Worship', desc: 'We worship God in spirit and in truth with reverence.' },
              { icon: <Users size={20} />, title: 'Community', desc: 'We build strong relationships rooted in fellowship.' },
              { icon: <Globe size={20} />, title: 'Outreach', desc: 'We share the Gospel locally and globally with urgency.' },
              { icon: <Target size={20} />, title: 'Excellence', desc: "We pursue excellence in all we do for God's glory." },
              { icon: <Eye size={20} />, title: 'Integrity', desc: 'We walk in honesty and transparency before God and man.' },
            ].map((v) => (
              <div key={v.title} className="p-6 rounded-2xl" style={{ background: 'white' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(26,58,92,0.06)', color: '#1a3a5c' }}>{v.icon}</div>
                <h3 className="font-semibold text-sm" style={{ color: '#1a1a1a' }}>{v.title}</h3>
                <p className="text-xs mt-2 leading-relaxed" style={{ color: '#8a8580' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#c8a44e' }}>Leadership</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: '#1a1a1a' }}>Our Pastors</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Pastor J.A. Adelaja', role: 'General Overseer', desc: 'Provides overall spiritual leadership and vision.' },
              { name: 'Pastor F.O. Adeyemi', role: 'HQ Pastor', desc: 'Oversees the headquarters branch.' },
              { name: 'Pastor T.O. Balogun', role: 'Surulere Pastor', desc: 'Leads the Surulere congregation.' },
              { name: 'Pastor E.A. Okafor', role: 'Youth President', desc: 'Directs youth ministry across all branches.' },
            ].map((p) => (
              <div key={p.name} className="text-center p-6 rounded-3xl" style={{ background: '#f5f3ef' }}>
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(26,58,92,0.08)', color: '#1a3a5c' }}><Church size={24} /></div>
                <h3 className="font-bold text-sm" style={{ color: '#1a1a1a' }}>{p.name}</h3>
                <p className="text-xs font-medium mt-1" style={{ color: '#c8a44e' }}>{p.role}</p>
                <p className="text-xs mt-2 leading-relaxed" style={{ color: '#8a8580' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
