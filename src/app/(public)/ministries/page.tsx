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
      <section style={{ position: 'relative', paddingTop: 200, paddingBottom: 100, textAlign: 'center', background: '#1A374F' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#E46C63', marginBottom: 16 }}>Ministries</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ color: '#fff', fontFamily: "'Arno Pro', serif", lineHeight: 1.2, marginBottom: 20, fontSize: 'clamp(40px, 7vw, 68px)' }}>
            Our Ministries
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.8, maxWidth: 650, margin: '0 auto' }}>
            Every ministry is designed to help you grow in faith, connect with others, and serve.
          </motion.p>
        </div>
      </section>

      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 50px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30 }}>
            {departments.map((dept, i) => (
              <motion.div key={dept.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} style={{ padding: 35, background: '#fff', borderRadius: 15, border: '1px solid #f0f0f0', transition: 'box-shadow .3s' }}>
                <div style={{ width: 50, height: 50, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, background: `${dept.color}15`, color: dept.color }}>{dept.icon}</div>
                <h3 style={{ fontSize: 20, fontFamily: "'Gotham', sans-serif", fontWeight: 500, color: '#222', marginBottom: 12 }}>{dept.name}</h3>
                <p style={{ fontSize: 15, color: '#69757B', lineHeight: 1.6, marginBottom: 20 }}>{dept.desc}</p>
                <Link href="/dashboard/departments" style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#E46C63', textDecoration: 'none' }}>
                  Learn More
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0', textAlign: 'center', background: '#1A374F' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 40px' }}>
          <h2 style={{ color: '#fff', fontFamily: "'Arno Pro', serif", fontSize: 'clamp(36px, 5vw, 48px)', marginBottom: 20 }}>Get Involved</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.6, marginBottom: 40 }}>Ready to join a ministry? Contact us to find the right fit.</p>
          <Link href="/contact" style={{
            display: 'inline-block', padding: '19px 30px', fontSize: 14, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '1px', borderRadius: 3,
            background: '#E46C63', color: '#fff', textDecoration: 'none',
          }}>
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
