'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Globe, Church, Music, HandHeart } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const departments = [
  { name: "Men's Ministry", desc: 'Building men of integrity, faith, and leadership through fellowship.', icon: <Users size={22} />, bg: 'rgba(26,58,92,0.06)', color: '#1a3a5c' },
  { name: "Women's Ministry", desc: 'Empowering women to grow in faith, build community, and serve.', icon: <Heart size={22} />, bg: 'rgba(200,164,78,0.1)', color: '#c8a44e' },
  { name: 'Youth Ministry', desc: 'Dynamic programs for young people to discover their purpose.', icon: <Globe size={22} />, bg: 'rgba(72,160,120,0.08)', color: '#48a078' },
  { name: "Children's Ministry", desc: 'Nurturing the next generation with age-appropriate activities.', icon: <Church size={22} />, bg: 'rgba(180,120,60,0.08)', color: '#b4783c' },
  { name: 'Worship Ministry', desc: 'Leading the congregation in heartfelt worship and music.', icon: <Music size={22} />, bg: 'rgba(130,100,180,0.08)', color: '#8264b4' },
  { name: 'Outreach Ministry', desc: 'Serving the community through evangelism and charity.', icon: <HandHeart size={22} />, bg: 'rgba(180,80,80,0.08)', color: '#b45050' },
];

export default function MinistriesPage() {
  return (
    <>
      <section className="pt-32 pb-16" style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #0f2640 100%)' }}>
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>Ministries</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Our Ministries</motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg mt-4 max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Every ministry is designed to help you grow in faith, connect with others, and serve.
          </motion.p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {departments.map((dept, i) => (
              <motion.div key={dept.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="p-7 rounded-3xl transition-all hover:shadow-lg" style={{ background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5" style={{ background: dept.bg, color: dept.color }}>{dept.icon}</div>
                <h3 className="font-bold" style={{ color: '#1a1a1a' }}>{dept.name}</h3>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: '#8a8580' }}>{dept.desc}</p>
                <Link href="/dashboard/departments" className="inline-flex items-center gap-1 font-semibold text-sm mt-4 hover:underline" style={{ color: '#1a3a5c' }}>
                  Learn More <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #0f2640 100%)' }}>
        <div className="max-w-2xl mx-auto px-5 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Get Involved</h2>
          <p className="mt-3 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>Ready to join a ministry? Contact us to find the right fit.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold mt-8" style={{ background: 'white', color: '#1a3a5c' }}>
            Contact Us <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
