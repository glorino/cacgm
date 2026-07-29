'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Heart, Church, Globe, Users } from 'lucide-react';

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
            <div style={{ padding: 45, borderRadius: 15, background: '#EFF4F4' }}>
              <div style={{ width: 56, height: 56, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, background: '#1A374F', color: '#fff' }}><Target size={24} /></div>
              <h3 style={{ fontSize: 28, fontFamily: "'Arno Pro', serif", color: '#222', marginBottom: 16 }}>Our Mission</h3>
              <p style={{ fontSize: 16, color: '#69757B', lineHeight: 1.8 }}>To glorify God by winning souls, making disciples, and equipping believers with the tools they need to serve effectively in their communities.</p>
            </div>
            <div style={{ padding: 45, borderRadius: 15, background: '#EFF4F4' }}>
              <div style={{ width: 56, height: 56, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, background: '#E46C63', color: '#fff' }}><Eye size={24} /></div>
              <h3 style={{ fontSize: 28, fontFamily: "'Arno Pro', serif", color: '#222', marginBottom: 16 }}>Our Vision</h3>
              <p style={{ fontSize: 16, color: '#69757B', lineHeight: 1.8 }}>To be a globally recognized church mission that transforms lives, restores hope, and builds enduring communities of faith through the power of the Holy Spirit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '100px 0', background: '#EFF4F4' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 50px' }}>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontFamily: "'Arno Pro', serif", textAlign: 'center', color: '#222', marginBottom: 55 }}>What We Stand For</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30 }}>
            {[
              { icon: <Heart size={22} />, title: 'Love', desc: 'We love God and love one another as Christ loved us.' },
              { icon: <Church size={22} />, title: 'Worship', desc: 'We worship God in spirit and in truth with reverence.' },
              { icon: <Users size={22} />, title: 'Community', desc: 'We build strong relationships rooted in fellowship.' },
              { icon: <Globe size={22} />, title: 'Outreach', desc: 'We share the Gospel locally and globally with urgency.' },
              { icon: <Target size={22} />, title: 'Excellence', desc: 'We pursue excellence in all we do for God\'s glory.' },
              { icon: <Eye size={22} />, title: 'Integrity', desc: 'We walk in honesty and transparency before God and man.' },
            ].map((v) => (
              <div key={v.title} style={{ padding: 35, background: '#fff', borderRadius: 15 }}>
                <div style={{ width: 50, height: 50, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, background: '#EFF4F4', color: '#1A374F' }}>{v.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#222', marginBottom: 12 }}>{v.title}</h3>
                <p style={{ fontSize: 15, color: '#69757B', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 50px' }}>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontFamily: "'Arno Pro', serif", textAlign: 'center', color: '#222', marginBottom: 55 }}>Our Pastors</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 30 }}>
            {[
              { name: 'Pastor J.A. Adelaja', role: 'General Overseer', desc: 'Provides overall spiritual leadership and vision.' },
              { name: 'Pastor F.O. Adeyemi', role: 'HQ Pastor', desc: 'Oversees the headquarters branch.' },
              { name: 'Pastor T.O. Balogun', role: 'Surulere Pastor', desc: 'Leads the Surulere congregation.' },
              { name: 'Pastor E.A. Okafor', role: 'Youth President', desc: 'Directs youth ministry across all branches.' },
            ].map((p) => (
              <div key={p.name} style={{ textAlign: 'center', padding: 35, borderRadius: 15, background: '#EFF4F4' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(26,55,79,0.1)', color: '#1A374F' }}><Church size={28} /></div>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: '#222' }}>{p.name}</h3>
                <p style={{ fontSize: 14, fontWeight: 500, marginTop: 6, color: '#E46C63' }}>{p.role}</p>
                <p style={{ fontSize: 14, color: '#69757B', marginTop: 12, lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
