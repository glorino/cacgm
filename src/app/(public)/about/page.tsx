'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Heart, Church, Globe, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-[200px] pb-[100px] text-center" style={{ background: '#1A374F' }}>
        <div className="max-w-[900px] mx-auto px-8">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[12px] font-bold uppercase tracking-[2px] text-[#E46C63] mb-4">About Us</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white font-['Arno_Pro',serif] leading-[1.2] mb-5" style={{ fontSize: 'clamp(40px, 7vw, 68px)' }}>
            Our Mission &amp; Vision
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/60 text-[18px] leading-[1.8] max-w-[650px] mx-auto">
            Christ Apostolic Church of God Mission is dedicated to spreading the Gospel and building strong faith communities across Nigeria.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-[100px]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-[50px]">
          <div className="grid md:grid-cols-2 gap-[30px]">
            <div className="p-[45px] rounded-[15px]" style={{ background: '#EFF4F4' }}>
              <div className="w-[56px] h-[56px] rounded-[3px] flex items-center justify-center mb-6" style={{ background: '#1A374F', color: '#fff' }}><Target size={24} /></div>
              <h3 className="text-[28px] font-['Arno_Pro',serif] text-[#222] mb-4">Our Mission</h3>
              <p className="text-[16px] text-[#69757B] leading-[1.8]">To glorify God by winning souls, making disciples, and equipping believers with the tools they need to serve effectively in their communities.</p>
            </div>
            <div className="p-[45px] rounded-[15px]" style={{ background: '#EFF4F4' }}>
              <div className="w-[56px] h-[56px] rounded-[3px] flex items-center justify-center mb-6" style={{ background: '#E46C63', color: '#fff' }}><Eye size={24} /></div>
              <h3 className="text-[28px] font-['Arno_Pro',serif] text-[#222] mb-4">Our Vision</h3>
              <p className="text-[16px] text-[#69757B] leading-[1.8]">To be a globally recognized church mission that transforms lives, restores hope, and builds enduring communities of faith through the power of the Holy Spirit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-[100px]" style={{ background: '#EFF4F4' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-[50px]">
          <h2 className="text-[36px] md:text-[48px] font-['Arno_Pro',serif] text-center text-[#222] mb-[55px]">What We Stand For</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {[
              { icon: <Heart size={22} />, title: 'Love', desc: 'We love God and love one another as Christ loved us.' },
              { icon: <Church size={22} />, title: 'Worship', desc: 'We worship God in spirit and in truth with reverence.' },
              { icon: <Users size={22} />, title: 'Community', desc: 'We build strong relationships rooted in fellowship.' },
              { icon: <Globe size={22} />, title: 'Outreach', desc: 'We share the Gospel locally and globally with urgency.' },
              { icon: <Target size={22} />, title: 'Excellence', desc: 'We pursue excellence in all we do for God\'s glory.' },
              { icon: <Eye size={22} />, title: 'Integrity', desc: 'We walk in honesty and transparency before God and man.' },
            ].map((v) => (
              <div key={v.title} className="p-[35px] bg-white rounded-[15px]">
                <div className="w-[50px] h-[50px] rounded-[3px] flex items-center justify-center mb-5" style={{ background: '#EFF4F4', color: '#1A374F' }}>{v.icon}</div>
                <h3 className="text-[18px] font-bold text-[#222] mb-3">{v.title}</h3>
                <p className="text-[15px] text-[#69757B] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-[100px]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-[50px]">
          <h2 className="text-[36px] md:text-[48px] font-['Arno_Pro',serif] text-center text-[#222] mb-[55px]">Our Pastors</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
            {[
              { name: 'Pastor J.A. Adelaja', role: 'General Overseer', desc: 'Provides overall spiritual leadership and vision.' },
              { name: 'Pastor F.O. Adeyemi', role: 'HQ Pastor', desc: 'Oversees the headquarters branch.' },
              { name: 'Pastor T.O. Balogun', role: 'Surulere Pastor', desc: 'Leads the Surulere congregation.' },
              { name: 'Pastor E.A. Okafor', role: 'Youth President', desc: 'Directs youth ministry across all branches.' },
            ].map((p) => (
              <div key={p.name} className="text-center p-[35px] rounded-[15px]" style={{ background: '#EFF4F4' }}>
                <div className="w-[80px] h-[80px] rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: 'rgba(26,55,79,0.1)', color: '#1A374F' }}><Church size={28} /></div>
                <h3 className="font-bold text-[16px] text-[#222]">{p.name}</h3>
                <p className="text-[14px] font-medium mt-1.5" style={{ color: '#E46C63' }}>{p.role}</p>
                <p className="text-[14px] text-[#69757B] mt-3 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
