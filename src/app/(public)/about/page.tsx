'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Heart, Church, Globe, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';

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

      {/* General Overseer Welcome */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 60, flexWrap: 'wrap' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ flex: '1 1 40%', minWidth: 300 }}
            >
              <div style={{
                borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                position: 'relative',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                  alt="General Overseer"
                  style={{ width: '100%', height: 450, objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                  padding: '40px 30px 30px',
                }}>
                  <p style={{ color: '#fff', fontSize: 22, fontFamily: "'Arno Pro', serif", margin: 0 }}>Pastor J.A. Adelaja</p>
                  <p style={{ color: '#E46C63', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, margin: '4px 0 0' }}>General Overseer</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ flex: '1 1 50%', minWidth: 320 }}
            >
              <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#E46C63', marginBottom: 12 }}>A Word From Our Leader</p>
              <h2 style={{ fontFamily: "'Arno Pro', serif", lineHeight: 1.15, marginBottom: 30, fontSize: 'clamp(28px, 4vw, 42px)', color: '#222' }}>
                Welcome to CACGM
              </h2>
              <div style={{ fontSize: 16, color: '#69757B', lineHeight: 1.9 }}>
                <p style={{ marginBottom: 20 }}>
                  Dear beloved, it is my joy and privilege to welcome you to Christ Apostolic Church of God Mission. Since our founding, we have been committed to spreading the Gospel of Jesus Christ and building strong, faith-filled communities across Nigeria and beyond.
                </p>
                <p style={{ marginBottom: 20 }}>
                  Our mission is simple yet profound: to glorify God by winning souls, making disciples, and equipping believers with the tools they need to serve effectively in their communities.
                </p>
                <p>
                  Whether you are joining us for the first time or have been part of our family for years, we pray that you will experience the love of God and the warmth of Christian fellowship at CACGM.
                </p>
              </div>
              <div style={{ marginTop: 30, display: 'flex', gap: 12 }}>
                <Link href="/locations" style={{
                  display: 'inline-block', padding: '16px 32px', fontSize: 13, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '1px', borderRadius: 3,
                  background: '#1A374F', color: '#fff', textDecoration: 'none',
                }}>
                  Visit a Branch
                </Link>
                <Link href="/contact" style={{
                  display: 'inline-block', padding: '16px 32px', fontSize: 13, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '1px', borderRadius: 3,
                  border: '1px solid #ddd', color: '#222', textDecoration: 'none',
                }}>
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '100px 0', background: '#EFF4F4' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 50px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 30 }}>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ padding: 45, borderRadius: 15, background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <div style={{ width: 56, height: 56, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, background: '#1A374F', color: '#fff' }}><Target size={24} /></div>
              <h3 style={{ fontSize: 28, fontFamily: "'Arno Pro', serif", color: '#222', marginBottom: 16 }}>Our Mission</h3>
              <p style={{ fontSize: 16, color: '#69757B', lineHeight: 1.8 }}>To glorify God by winning souls, making disciples, and equipping believers with the tools they need to serve effectively in their communities.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ padding: 45, borderRadius: 15, background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <div style={{ width: 56, height: 56, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, background: '#E46C63', color: '#fff' }}><Eye size={24} /></div>
              <h3 style={{ fontSize: 28, fontFamily: "'Arno Pro', serif", color: '#222', marginBottom: 16 }}>Our Vision</h3>
              <p style={{ fontSize: 16, color: '#69757B', lineHeight: 1.8 }}>To be a globally recognized church mission that transforms lives, restores hope, and builds enduring communities of faith through the power of the Holy Spirit.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 50px' }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontFamily: "'Arno Pro', serif", textAlign: 'center', color: '#222', marginBottom: 55 }}>What We Stand For</motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30 }}>
            {[
              { icon: <Heart size={22} />, title: 'Love', desc: 'We love God and love one another as Christ loved us.', color: '#E46C63' },
              { icon: <Church size={22} />, title: 'Worship', desc: 'We worship God in spirit and in truth with reverence.', color: '#1A374F' },
              { icon: <Users size={22} />, title: 'Community', desc: 'We build strong relationships rooted in fellowship.', color: '#3364A0' },
              { icon: <Globe size={22} />, title: 'Outreach', desc: 'We share the Gospel locally and globally with urgency.', color: '#39A1B1' },
              { icon: <Target size={22} />, title: 'Excellence', desc: 'We pursue excellence in all we do for God\'s glory.', color: '#9EC73F' },
              { icon: <BookOpen size={22} />, title: 'Integrity', desc: 'We walk in honesty and transparency before God and man.', color: '#E46C63' },
            ].map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} style={{ padding: 35, background: '#fff', borderRadius: 15, border: '1px solid #f0f0f0', transition: 'box-shadow .3s, transform .3s' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ width: 50, height: 50, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, background: `${v.color}15`, color: v.color }}>{v.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#222', marginBottom: 12 }}>{v.title}</h3>
                <p style={{ fontSize: 15, color: '#69757B', lineHeight: 1.6 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section style={{ padding: '100px 0', background: '#EFF4F4' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 50px' }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontFamily: "'Arno Pro', serif", textAlign: 'center', color: '#222', marginBottom: 55 }}>Our Pastors</motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 30 }}>
            {pastors.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ textAlign: 'center', padding: 35, borderRadius: 15, background: '#fff', border: '1px solid #f0f0f0', transition: 'box-shadow .3s, transform .3s' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
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
