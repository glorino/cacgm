'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const eventsData: Record<string, {
  title: string; date: string; time: string; location: string; desc: string;
  longDesc: string; why: string[]; featured: boolean; nextDate: string;
}> = {
  'sunday-worship-service': {
    title: 'Sunday Worship Service', date: 'Every Sunday', time: '8:00 AM & 10:30 AM', location: 'All Locations',
    desc: 'Join us for powerful worship and the Word of God.',
    longDesc: 'Our Sunday Worship Service is the heart of CACGM. Experience powerful praise and worship led by our anointed choir, receive transformative teachings from God\u2019s Word, and connect with a community of believers who are passionate about following Jesus. With two service times, there\u2019s a place for everyone.',
    why: ['Powerful praise and worship led by our choir', 'Transformative Bible-based teaching', 'Prayer ministry and altar call', 'Children\u2019s church during service', 'Fellowship and community connection', 'Live stream available online'],
    featured: true, nextDate: 'nextSunday',
  },
  'midweek-service': {
    title: 'Midweek Service', date: 'Every Wednesday', time: '6:00 PM', location: 'Headquarters',
    desc: 'Deeper teaching, prayer, and spiritual growth.',
    longDesc: 'Our Midweek Service offers a more intimate setting for deeper Bible study, fervent prayer, and spiritual renewal. It\u2019s the perfect midweek refreshment for your soul. Join us as we dig deeper into God\u2019s Word and intercede for our families, nation, and the world.',
    why: ['In-depth verse-by-verse Bible study', 'Extended time for prayer and intercession', 'Small group connections', 'Spiritual growth and accountability', 'Midweek encouragement and fellowship'],
    featured: false, nextDate: 'nextWednesday',
  },
  'youth-night': {
    title: 'Youth Night', date: 'Every Friday', time: '6:30 PM', location: 'All Locations',
    desc: 'Dynamic worship and teaching for ages 13-18.',
    longDesc: 'Youth Night is where young people encounter God in a real and relevant way. With dynamic worship, practical teaching, and fun activities, it\u2019s the highlight of the week for teens. Our youth pastors are passionate about helping young people discover their purpose.',
    why: ['Age-relevant and practical teaching', 'Dynamic youth-led worship', 'Mentorship and discipleship', 'Fun activities and games', 'Safe and welcoming environment'],
    featured: false, nextDate: 'nextFriday',
  },
  'youth-camp-2026': {
    title: 'Youth Camp 2026', date: 'August 15-20, 2026', time: 'All Day', location: 'Irvine Camp, Lagos',
    desc: 'Games, worship, and life-changing messages.',
    longDesc: 'Youth Camp 2026 is an unforgettable 6-day experience of worship, teaching, outdoor activities, and community. This annual retreat is designed to help young people encounter God, build lasting friendships, and return transformed. Don\u2019t miss this life-changing event!',
    why: ['6 days of immersive worship and teaching', 'Guest speakers and workshops', 'Outdoor adventure activities', 'Lifelong friendships and community', 'Spiritual breakthrough and renewal'],
    featured: true, nextDate: '2026-08-15',
  },
  'womens-conference': {
    title: "Women's Conference", date: 'September 5-6, 2026', time: '9:00 AM', location: 'Headquarters',
    desc: 'A weekend of worship and fellowship for women.',
    longDesc: 'The CACGM Women\u2019s Conference brings together women from all branches for a weekend of worship, empowerment, and sisterhood. Discover your purpose, connect with women of faith, and be inspired by powerful female speakers.',
    why: ['Inspiring female speakers and ministers', 'Worship and prayer sessions', 'Sisterhood networking and fellowship', 'Workshops on faith, family, and career', 'Special guest ministers and worship leaders'],
    featured: false, nextDate: '2026-09-05',
  },
  'mens-prayer-breakfast': {
    title: "Men's Prayer Breakfast", date: 'First Saturday of Every Month', time: '7:30 AM', location: 'Headquarters',
    desc: 'Prayer, fellowship, and a hearty breakfast.',
    longDesc: 'The Men\u2019s Prayer Breakfast is a monthly gathering of men committed to prayer, accountability, and spiritual growth. Start your month with prayer and fellowship over a hearty breakfast. Build brotherhood and sharpen your faith.',
    why: ['Strategic prayer for families and nation', 'Brotherhood and accountability', 'Leadership development and mentoring', 'Hearty breakfast included', 'Monthly spiritual refreshment'],
    featured: false, nextDate: 'nextSaturday',
  },
};

function getNextDate(dateKey: string): Date {
  const now = new Date();
  if (dateKey === 'nextSunday') {
    const d = new Date(now);
    d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7));
    d.setHours(8, 0, 0, 0);
    return d;
  }
  if (dateKey === 'nextWednesday') {
    const d = new Date(now);
    d.setDate(d.getDate() + ((3 - d.getDay() + 7) % 7 || 7));
    d.setHours(18, 0, 0, 0);
    return d;
  }
  if (dateKey === 'nextFriday') {
    const d = new Date(now);
    d.setDate(d.getDate() + ((5 - d.getDay() + 7) % 7 || 7));
    d.setHours(18, 30, 0, 0);
    return d;
  }
  if (dateKey === 'nextSaturday') {
    const d = new Date(now);
    d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7 || 7));
    d.setHours(7, 30, 0, 0);
    return d;
  }
  return new Date(dateKey);
}

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const target = getNextDate(targetDate);
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) return null;

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
      {units.map((u) => (
        <div key={u.label} style={{ textAlign: 'center' }}>
          <div style={{
            width: 80, height: 80, borderRadius: 12,
            background: '#fff', border: '2px solid #E46C63',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, fontWeight: 700, color: '#1A374F',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          }}>
            {String(u.value).padStart(2, '0')}
          </div>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: '#94a3b8', marginTop: 8 }}>{u.label}</p>
        </div>
      ))}
    </div>
  );
}

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const event = eventsData[slug] || eventsData['sunday-worship-service'];

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', paddingTop: 200, paddingBottom: 80, textAlign: 'center', background: event.featured ? '#1A374F' : '#1A374F' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Link href="/events" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#E46C63', textDecoration: 'none', marginBottom: 20, fontWeight: 600 }}>
              <ArrowLeft size={16} /> Back to Events
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.6)', fontSize: 14 }}><Calendar size={16} /> {event.date}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.6)', fontSize: 14 }}><Clock size={16} /> {event.time}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.6)', fontSize: 14 }}><MapPin size={16} /> {event.location}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ color: '#fff', fontFamily: "'Arno Pro', serif", lineHeight: 1.2, marginBottom: 20, fontSize: 'clamp(36px, 6vw, 60px)' }}>
            {event.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'rgba(255,255,255,0.5)', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
            {event.desc}
          </motion.p>
        </div>
      </section>

      {/* Countdown */}
      <section style={{ padding: '50px 0', background: '#f8fafc', borderBottom: '1px solid #eee' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#E46C63', marginBottom: 20 }}>Countdown to Next Event</p>
          <CountdownTimer targetDate={event.nextDate} />
        </div>
      </section>

      {/* About & Why */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 40px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontSize: 32, fontFamily: "'Arno Pro', serif", color: '#222', marginBottom: 20 }}>About This Event</h2>
            <p style={{ fontSize: 17, color: '#69757B', lineHeight: 1.8, marginBottom: 50 }}>{event.longDesc}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h2 style={{ fontSize: 32, fontFamily: "'Arno Pro', serif", color: '#222', marginBottom: 24 }}>Why You Should Attend</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 50 }}>
              {event.why.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderRadius: 10, background: '#fff', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E46C63', flexShrink: 0 }} />
                  <span style={{ fontSize: 15, color: '#444', lineHeight: 1.5 }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', paddingTop: 20, borderTop: '1px solid #eee' }}>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '18px 36px', borderRadius: 6, fontSize: 14, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '1px',
              background: '#E46C63', color: '#fff', textDecoration: 'none',
            }}>
              <Users size={18} /> Register Now
            </Link>
            <Link href="/locations" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '18px 36px', borderRadius: 6, fontSize: 14, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '1px',
              border: '2px solid #1A374F', color: '#1A374F', textDecoration: 'none', background: 'transparent',
            }}>
              <MapPin size={18} /> Find a Location
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
