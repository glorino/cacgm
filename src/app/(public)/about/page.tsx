'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Heart, Church, Globe, Users } from 'lucide-react';

const pastors = [
  { name: 'Pastor J.A. Adelaja', role: 'General Overseer', desc: 'Provides overall spiritual leadership and vision for CACGM worldwide.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Pastor F.O. Adeyemi', role: 'HQ Pastor', desc: 'Oversees the headquarters branch and pastoral operations.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  { name: 'Pastor T.O. Balogun', role: 'Surulere Pastor', desc: 'Leads the Surulere congregation with passion and dedication.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
  { name: 'Pastor E.A. Okafor', role: 'Youth President', desc: 'Directs youth ministry across all branches with dynamic leadership.', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section style={{ position: 'relative', paddingTop: 200, paddingBottom: 100, textAlign: 'center', background: '#1A374F' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#E46C63', marginBottom: 16 }}>About Us</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ color: '#fff', fontFamily: "'Arno Pro', serif", lineHeight: 1.2, marginBottom: 20, fontSize: 'clamp(40px, 7vw, 68px)' }}>
            Our Mission &amp; Vision
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.8, maxWidth: 650, margin: '0 auto' }}>
            Christ Apostolic Church of God Mission is dedicated to spreading the Gospel and building strong faith communities across Nigeria.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 50px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 30 }}>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ padding: 45, borderRadius: 15, background: '#EFF4F4' }}>
              <div style={{ width: 56, height: 56, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, background: '#1A374F', color: '#fff' }}><Target size={24} /></div>
              <h3 style={{ fontSize: 28, fontFamily: "'Arno Pro', serif", color: '#222', marginBottom: 16 }}>Our Mission</h3>
              <p style={{ fontSize: 16, color: '#69757B', lineHeight: 1.8 }}>To glorify God by winning souls, making disciples, and equipping believers with the tools they need to serve effectively in their communities.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ padding: 45, borderRadius: 15, background: '#EFF4F4' }}>
              <div style={{ width: 56, height: 56, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, background: '#E46C63', color: '#fff' }}><Eye size={24} /></div>
              <h3 style={{ fontSize: 28, fontFamily: "'Arno Pro', serif", color: '#222', marginBottom: 16 }}>Our Vision</h3>
              <p style={{ fontSize: 16, color: '#69757B', lineHeight: 1.8 }}>To be a globally recognized church mission that transforms lives, restores hope, and builds enduring communities of faith through the power of the Holy Spirit.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '100px 0', background: '#EFF4F4' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 50px' }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontFamily: "'Arno Pro', serif", textAlign: 'center', color: '#222', marginBottom: 55 }}>What We Stand For</motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30 }}>
            {[
              { icon: <Heart size={22} />, title: 'Love', desc: 'We love God and love one another as Christ loved us.' },
              { icon: <Church size={22} />, title: 'Worship', desc: 'We worship God in spirit and in truth with reverence.' },
              { icon: <Users size={22} />, title: 'Community', desc: 'We build strong relationships rooted in fellowship.' },
              { icon: <Globe size={22} />, title: 'Outreach', desc: 'We share the Gospel locally and globally with urgency.' },
              { icon: <Target size={22} />, title: 'Excellence', desc: 'We pursue excellence in all we do for God\'s glory.' },
              { icon: <Eye size={22} />, title: 'Integrity', desc: 'We walk in honesty and transparency before God and man.' },
            ].map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} style={{ padding: 35, background: '#fff', borderRadius: 15 }}>
                <div style={{ width: 50, height: 50, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, background: '#EFF4F4', color: '#1A374F' }}>{v.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#222', marginBottom: 12 }}>{v.title}</h3>
                <p style={{ fontSize: 15, color: '#69757B', lineHeight: 1.6 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 50px' }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontFamily: "'Arno Pro', serif", textAlign: 'center', color: '#222', marginBottom: 55 }}>Our Pastors</motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 30 }}>
            {pastors.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ textAlign: 'center', padding: 35, borderRadius: 15, background: '#EFF4F4' }}>
                <div style={{ width: 100, height: 100, borderRadius: '50%', margin: '0 auto 20px', overflow: 'hidden', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: '#222', marginBottom: 4 }}>{p.name}</h3>
                <p style={{ fontSize: 14, fontWeight: 500, color: '#E46C63', marginBottom: 10 }}>{p.role}</p>
                <p style={{ fontSize: 14, color: '#69757B', lineHeight: 1.6 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
