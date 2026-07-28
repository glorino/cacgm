'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Globe, Church, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const departments = [
  { name: "Men's Ministry", desc: 'Building men of integrity, faith, and leadership through fellowship and spiritual growth.', icon: <Users size={24} />, color: 'bg-blue-50 text-blue-600' },
  { name: "Women's Ministry", desc: 'Empowering women to grow in faith, build community, and serve with purpose.', icon: <Heart size={24} />, color: 'bg-rose-50 text-rose-600' },
  { name: 'Youth Ministry', desc: 'Dynamic programs for young people to discover their purpose and follow Jesus.', icon: <Globe size={24} />, color: 'bg-emerald-50 text-emerald-600' },
  { name: "Children's Ministry", desc: 'Nurturing the next generation with age-appropriate teaching and activities.', icon: <Church size={24} />, color: 'bg-amber-50 text-amber-600' },
  { name: 'Worship Ministry', desc: 'Leading the congregation in heartfelt worship through music and creative arts.', icon: <Calendar size={24} />, color: 'bg-violet-50 text-violet-600' },
  { name: 'Outreach Ministry', desc: 'Serving the community through evangelism, charity, and social impact programs.', icon: <Heart size={24} />, color: 'bg-indigo-50 text-indigo-600' },
];

export default function MinistriesPage() {
  return (
    <>
      <section className="bg-[#1a3a5c] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-white/40 text-sm font-medium tracking-wide uppercase mb-4">Ministries</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Our Ministries</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/50 text-lg mt-4 max-w-2xl leading-relaxed">
            Every ministry at CACGM is designed to help you grow in faith, connect with others, and serve with your gifts.
          </motion.p>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, i) => (
              <motion.div key={dept.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group p-7 bg-white rounded-2xl border border-slate-100 hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl ${dept.color} flex items-center justify-center mb-5`}>{dept.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{dept.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{dept.desc}</p>
                <Link href="/dashboard/departments" className="inline-flex items-center gap-1 text-[#1a3a5c] font-semibold text-sm mt-5 hover:underline">
                  Learn More <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-[#1a3a5c]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Get Involved</h2>
          <p className="text-white/50 mt-4 leading-relaxed">Ready to join a ministry? Contact us to find the right fit for your gifts and calling.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#1a3a5c] rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors mt-8">
            Contact Us <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
