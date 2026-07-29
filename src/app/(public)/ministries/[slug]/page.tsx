'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Heart, Globe, Church, Music, HandHeart, CheckCircle, Send } from 'lucide-react';
import Link from 'next/link';

const ministriesData: Record<string, { name: string; desc: string; longDesc: string; color: string; activities: string[]; meetingTime: string; leader: string; icon: React.ReactNode }> = {
  'mens-ministry': { name: "Men's Ministry", desc: 'Building men of integrity, faith, and leadership.', longDesc: "The Men's Ministry at CACGM is dedicated to raising men of integrity, faith, and spiritual leadership. We provide a space where men can connect, grow, and support one another in their journey of faith. Through Bible study, mentorship, and community service, we equip men to lead effectively in their families, churches, and communities.", color: '#3364A0', activities: ['Weekly Bible Study', 'Monthly Prayer Breakfast', 'Mentorship Program', 'Community Outreach', "Annual Men's Conference"], meetingTime: 'Saturdays 7:00 AM', leader: 'Chief Emmanuel Okonkwo', icon: <Users size={24} /> },
  'womens-ministry': { name: "Women's Ministry", desc: 'Empowering women to grow in faith and serve.', longDesc: "The Women's Ministry at CACGM empowers women to grow in their relationship with God, build meaningful relationships, and serve with purpose. We offer Bible studies, prayer groups, mentorship, and outreach programs designed to strengthen women spiritually and emotionally.", color: '#E46C63', activities: ['Weekly Prayer Meetings', 'Bible Study Groups', 'Sisterhood Fellowship', 'Outreach Programs', "Annual Women's Conference"], meetingTime: 'Saturdays 9:00 AM', leader: 'Mrs. Grace Adeleke', icon: <Heart size={24} /> },
  'youth-ministry': { name: 'Youth Ministry', desc: 'Dynamic programs for young people to discover purpose.', longDesc: "Our Youth Ministry is a vibrant community where young people encounter God, discover their purpose, and build lifelong friendships. With dynamic worship, relevant teaching, and fun activities, we create an environment where youth can thrive spiritually and socially.", color: '#39A1B1', activities: ['Friday Youth Night', 'Worship Practice', 'Bible Study', 'Outdoor Activities', 'Youth Camp Annual'], meetingTime: 'Fridays 6:30 PM', leader: 'Bro. David Nwachukwu', icon: <Globe size={24} /> },
  'childrens-ministry': { name: "Children's Ministry", desc: 'Nurturing the next generation with faith-based activities.', longDesc: "The Children's Ministry provides a safe, fun, and faith-filled environment for children to learn about God's love. Through age-appropriate lessons, songs, crafts, and activities, we help children build a strong foundation of faith from an early age.", color: '#9EC73F', activities: ['Sunday School', "Children's Choir", 'Bible Stories and Crafts', 'Holiday Programs', 'Family Events'], meetingTime: 'Sundays during Service', leader: 'Sister Bola Akintola', icon: <Church size={24} /> },
  'worship-ministry': { name: 'Worship Ministry', desc: 'Leading the congregation in heartfelt worship and music.', longDesc: "The Worship Ministry leads CACGM in heartfelt, Spirit-led worship. Our choir and musicians are dedicated to creating an atmosphere where God's presence is felt through music, song, and creative expression.", color: '#1A374F', activities: ['Choir Practice', 'Worship Nights', 'Music Training', 'Special Performances', 'Recording Projects'], meetingTime: 'Thursdays 6:00 PM', leader: 'Bro. Samuel Olatunde', icon: <Music size={24} /> },
  'outreach-ministry': { name: 'Outreach Ministry', desc: 'Serving the community through evangelism and charity.', longDesc: "The Outreach Ministry is CACGM's arm for community service, evangelism, and charitable activities. We share God's love through practical acts of kindness, community development projects, and evangelistic campaigns.", color: '#E46C63', activities: ['Community Evangelism', 'Hospital Visitation', 'Food Distribution', 'School Programs', 'Mission Trips'], meetingTime: '2nd Saturday Monthly', leader: 'Deacon Felix Okafor', icon: <HandHeart size={24} /> },
};

function JoinForm({ color }: { color: string }) {
  const [joined, setJoined] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  if (joined) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ padding: 40, borderRadius: 12, background: '#f0fdf4', border: '1px solid #bbf7d0', textAlign: 'center' }}>
        <CheckCircle size={48} style={{ color: '#16a34a', marginBottom: 16 }} />
        <h3 style={{ fontSize: 22, fontWeight: 700, color: '#166534', marginBottom: 8 }}>Welcome Aboard!</h3>
        <p style={{ fontSize: 15, color: '#15803d' }}>Thank you for joining. We will contact you soon with next steps.</p>
      </motion.div>
    );
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); setJoined(true); }} style={{ padding: 32, borderRadius: 12, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
      <h3 style={{ fontSize: 22, fontFamily: "'Arno Pro', serif", color: '#222', marginBottom: 8 }}>Join This Ministry</h3>
      <p style={{ fontSize: 14, color: '#69757B', marginBottom: 24 }}>Fill the form below and we will get in touch.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input placeholder="Full Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ padding: '14px 16px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 14, outline: 'none' }} />
        <input placeholder="Email Address" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ padding: '14px 16px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 14, outline: 'none' }} />
        <input placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={{ padding: '14px 16px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 14, outline: 'none' }} />
        <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px', borderRadius: 8, background: color, color: '#fff', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 1 }}>
          <Send size={16} /> Submit Application
        </button>
      </div>
    </form>
  );
}

export default function MinistryDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const m = ministriesData[slug] || ministriesData['mens-ministry'];
  return (
    <>
      <section style={{ position: 'relative', paddingTop: 200, paddingBottom: 80, textAlign: 'center', background: m.color }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Link href="/ministries" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', marginBottom: 20, fontWeight: 600 }}>
              <ArrowLeft size={16} /> Back to Ministries
            </Link>
          </motion.div>
          <div style={{ width: 72, height: 72, borderRadius: 16, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#fff' }}>{m.icon}</div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#fff', fontFamily: "'Arno Pro', serif", lineHeight: 1.2, marginBottom: 16, fontSize: 'clamp(36px, 6vw, 56px)' }}>{m.name}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, lineHeight: 1.8, maxWidth: 650, margin: '0 auto' }}>{m.desc}</motion.p>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 50px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'start' }}>
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 style={{ fontSize: 28, fontFamily: "'Arno Pro', serif", color: '#222', marginBottom: 20 }}>About This Ministry</h2>
                <p style={{ fontSize: 16, color: '#69757B', lineHeight: 1.8, marginBottom: 32 }}>{m.longDesc}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#222', marginBottom: 16 }}>Activities and Programs</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
                  {m.activities.map((act, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                      <CheckCircle size={16} style={{ color: m.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: '#444' }}>{act}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <div style={{ display: 'flex', gap: 32, padding: '20px 0', borderTop: '1px solid #eee' }}>
                <div><p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#94a3b8', marginBottom: 4 }}>Meeting Time</p><p style={{ fontSize: 15, fontWeight: 600, color: '#222' }}>{m.meetingTime}</p></div>
                <div><p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#94a3b8', marginBottom: 4 }}>Leader</p><p style={{ fontSize: 15, fontWeight: 600, color: '#222' }}>{m.leader}</p></div>
              </div>
            </div>
            <div><JoinForm color={m.color} /></div>
          </div>
        </div>
      </section>
    </>
  );
}
