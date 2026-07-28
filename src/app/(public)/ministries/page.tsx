'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Globe, Church, Music, HandHeart } from 'lucide-react';
import Link from 'next/link';

const departments = [
  { name: "Men's Ministry", desc: 'Building men of integrity, faith, and leadership through fellowship.', icon: <Users size={22} />, color: '#3364A0' },
  { name: "Women's Ministry", desc: 'Empowering women to grow in faith, build community, and serve.', icon: <Heart size={22} />, color: '#E46C63' },
  { name: 'Youth Ministry', desc: 'Dynamic programs for young people to discover their purpose.', icon: <Globe size={22} />, color: '#39A1B1' },
  { name: "Children's Ministry", desc: 'Nurturing the next generation with age-appropriate activities.', icon: <Church size={22} />, color: '#9EC73F' },
  { name: 'Worship Ministry', desc: 'Leading the congregation in heartfelt worship and music.', icon: <Music size={22} />, color: '#1A374F' },
  { name: 'Outreach Ministry', desc: 'Serving the community through evangelism and charity.', icon: <HandHeart size={22} />, color: '#E46C63' },
];

export default function MinistriesPage() {
  return (
    <>
      <section className="relative pt-[160px] pb-[100px] text-center" style={{ background: '#1A374F' }}>
        <div className="max-w-[992px] mx-auto px-5">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[12px] font-bold uppercase tracking-[2px] text-[#E46C63] mb-3">Ministries</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white font-['Arno_Pro',serif] leading-[1.3] mb-4" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>
            Our Ministries
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/60 text-[18px] leading-[1.8] max-w-[700px] mx-auto">
            Every ministry is designed to help you grow in faith, connect with others, and serve.
          </motion.p>
        </div>
      </section>

      <section className="py-[100px]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-[30px]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {departments.map((dept, i) => (
              <motion.div key={dept.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-[30px] bg-white rounded-[15px] border border-gray-100 hover:shadow-[0_5px_20px_rgba(0,0,0,0.08)] transition-all duration-300">
                <div className="w-[50px] h-[50px] rounded-[3px] flex items-center justify-center mb-5" style={{ background: `${dept.color}15`, color: dept.color }}>{dept.icon}</div>
                <h3 className="text-[20px] font-['Gotham',sans-serif] font-medium text-[#222] mb-3">{dept.name}</h3>
                <p className="text-[15px] text-[#69757B] leading-relaxed mb-5">{dept.desc}</p>
                <Link href="/dashboard/departments" className="text-[13px] font-bold uppercase tracking-[1px] hover:underline" style={{ color: '#E46C63' }}>
                  Learn More
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[100px] text-center" style={{ background: '#1A374F' }}>
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-white font-['Arno_Pro',serif] text-[36px] md:text-[48px] mb-4">Get Involved</h2>
          <p className="text-white/60 text-[18px] leading-relaxed mb-8">Ready to join a ministry? Contact us to find the right fit.</p>
          <Link href="/contact" className="inline-block px-[30px] py-[19px] text-[14px] font-bold uppercase tracking-[1px] rounded-[3px] transition-all duration-200" style={{ background: '#E46C63', color: '#fff' }}>
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
