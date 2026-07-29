'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Globe, Church, Music, HandHeart } from 'lucide-react';
import Link from 'next/link';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

const departments = [
  { slug: 'mens-ministry', name: "Men's Ministry", desc: 'Building men of integrity, faith, and leadership through fellowship.', icon: <Users size={24} />, color: '#3364A0', bgGradient: 'linear-gradient(135deg, #3364A0, #1A374F)' },
  { slug: 'womens-ministry', name: "Women's Ministry", desc: 'Empowering women to grow in faith, build community, and serve.', icon: <Heart size={24} />, color: '#E46C63', bgGradient: 'linear-gradient(135deg, #E46C63, #c44f47)' },
  { slug: 'youth-ministry', name: 'Youth Ministry', desc: 'Dynamic programs for young people to discover their purpose.', icon: <Globe size={24} />, color: '#39A1B1', bgGradient: 'linear-gradient(135deg, #39A1B1, #2d8a96)' },
  { slug: 'childrens-ministry', name: "Children's Ministry", desc: 'Nurturing the next generation with age-appropriate activities.', icon: <Church size={24} />, color: '#9EC73F', bgGradient: 'linear-gradient(135deg, #9EC73F, #7da832)' },
  { slug: 'worship-ministry', name: 'Worship Ministry', desc: 'Leading the congregation in heartfelt worship and music.', icon: <Music size={24} />, color: '#1A374F', bgGradient: 'linear-gradient(135deg, #1A374F, #254f6e)' },
  { slug: 'outreach-ministry', name: 'Outreach Ministry', desc: 'Serving the community through evangelism and charity.', icon: <HandHeart size={24} />, color: '#7c3aed', bgGradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)' },
];

export default function MinistriesPage() {
  const isMobile = useIsMobile();
  return (
    <>
      <section style={{ position: 'relative', paddingTop: isMobile ? 120 : 200, paddingBottom: isMobile ? 60 : 100, textAlign: 'center', background: '#1A374F' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: isMobile ? '0 20px' : '0 40px' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#E46C63', marginBottom: 16 }}>Ministries</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ color: '#fff', fontFamily: "'Arno Pro', serif", lineHeight: 1.2, marginBottom: 20, fontSize: isMobile ? '32px' : 'clamp(40px, 7vw, 68px)' }}>
            Our Ministries
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'rgba(255,255,255,0.6)', fontSize: isMobile ? 16 : 18, lineHeight: 1.8, maxWidth: 650, margin: '0 auto' }}>
            Every ministry is designed to help you grow in faith, connect with others, and serve.
          </motion.p>
        </div>
      </section>

      <section style={{ padding: isMobile ? '50px 0' : '100px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 20px' : '0 50px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 16 : 30 }}>
            {departments.map((dept, i) => (
              <motion.div key={dept.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ padding: isMobile ? 24 : 35, background: '#fff', borderRadius: 15, border: '1px solid #f0f0f0', transition: 'box-shadow .3s, transform .3s', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: dept.bgGradient }} />
                <div style={{ width: isMobile ? 48 : 56, height: isMobile ? 48 : 56, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, background: `${dept.color}12`, color: dept.color }}>{dept.icon}</div>
                <h3 style={{ fontSize: isMobile ? 17 : 20, fontFamily: "'Gotham', sans-serif", fontWeight: 500, color: '#222', marginBottom: 10 }}>{dept.name}</h3>
                <p style={{ fontSize: isMobile ? 14 : 15, color: '#69757B', lineHeight: 1.6, marginBottom: 16 }}>{dept.desc}</p>
                <Link href={`/ministries/${dept.slug}`} style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: dept.color, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  Learn More
                  <span style={{ display: 'inline-block' }}>&rarr;</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: isMobile ? '50px 20px' : '100px 0', textAlign: 'center', background: '#1A374F' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ color: '#fff', fontFamily: "'Arno Pro', serif", fontSize: isMobile ? '26px' : 'clamp(36px, 5vw, 48px)', marginBottom: 20 }}>Get Involved</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: isMobile ? 16 : 18, lineHeight: 1.6, marginBottom: 32 }}>Ready to join a ministry? Contact us to find the right fit.</p>
          <Link href="/contact" style={{
            display: 'inline-block', padding: isMobile ? '14px 24px' : '19px 30px', fontSize: 14, fontWeight: 700,
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
