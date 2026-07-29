'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const eventsData: Record<string, {
  title: string; date: string; time: string; location: string; desc: string;
  longDesc: string; why: string[]; featured: boolean;
}> = {
  'sunday-worship-service': {
    title: 'Sunday Worship Service', date: 'Every Sunday', time: '8:00 AM & 10:30 AM', location: 'All Locations',
    desc: 'Join us for powerful worship and the Word of God.',
    longDesc: 'Our Sunday Worship Service is the heart of CACGM. Experience powerful praise and worship led by our anointed choir, receive transformative teachings from God\'s Word, and connect with a community of believers who are passionate about following Jesus.',
    why: ['Powerful praise and worship', 'Transformative Bible teaching', 'Prayer ministry available', 'Children\'s church during service', 'Fellowship and connection'],
    featured: true,
  },
  'midweek-service': {
    title: 'Midweek Service', date: 'Every Wednesday', time: '6:00 PM', location: 'Headquarters',
    desc: 'Deeper teaching, prayer, and spiritual growth.',
    longDesc: 'Our Midweek Service offers a more intimate setting for deeper Bible study, fervent prayer, and spiritual renewal. It\'s the perfect midweek refreshment for your soul.',
    why: ['In-depth Bible study', 'Extended prayer time', 'Small group connections', 'Spiritual growth focus', 'Midweek encouragement'],
    featured: false,
  },
  'youth-night': {
    title: 'Youth Night', date: 'Every Friday', time: '6:30 PM', location: 'All Locations',
    desc: 'Dynamic worship and teaching for ages 13-18.',
    longDesc: 'Youth Night is where young people encounter God in a real and relevant way. With dynamic worship, practical teaching, and fun activities, it\'s the highlight of the week for teens.',
    why: ['Age-relevant teaching', 'Dynamic youth worship', 'Mentorship opportunities', 'Fun activities and games', 'Safe and welcoming environment'],
    featured: false,
  },
  'youth-camp-2026': {
    title: 'Youth Camp 2026', date: 'August 15-20', time: 'All Day', location: 'Irvine Camp',
    desc: 'Games, worship, and life-changing messages.',
    longDesc: 'Youth Camp 2026 is an unforgettable 6-day experience of worship, teaching, outdoor activities, and community. This annual retreat is designed to help young people encounter God and build lasting friendships.',
    why: ['6 days of immersive worship', 'Guest speakers and workshops', 'Outdoor adventure activities', 'Lifelong friendships', 'Spiritual breakthrough'],
    featured: true,
  },
  'womens-conference': {
    title: "Women's Conference", date: 'September 5-6', time: '9:00 AM', location: 'Headquarters',
    desc: 'A weekend of worship and fellowship for women.',
    longDesc: 'The CACGM Women\'s Conference brings together women from all branches for a weekend of worship, empowerment, and sisterhood. Discover your purpose and connect with women of faith.',
    why: ['Inspiring female speakers', 'Worship and prayer sessions', 'Sisterhood networking', 'Workshops on faith and life', 'Special guest ministers'],
    featured: false,
  },
  'mens-prayer-breakfast': {
    title: "Men's Prayer Breakfast", date: 'First Saturday Monthly', time: '7:30 AM', location: 'Headquarters',
    desc: 'Prayer, fellowship, and a hearty breakfast.',
    longDesc: 'The Men\'s Prayer Breakfast is a monthly gathering of men committed to prayer, accountability, and spiritual growth. Start your month with prayer and fellowship over a hearty breakfast.',
    why: ['Strategic prayer for families', 'Brotherhood and accountability', 'Leadership development', 'Hearty breakfast included', 'Monthly spiritual refreshment'],
    featured: false,
  },
};

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = eventsData[slug] || eventsData['sunday-worship-service'];

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', paddingTop: 200, paddingBottom: 80, textAlign: 'center', background: event.featured ? '#1A374F' : '#222' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Link href="/events" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#E46C63', textDecoration: 'none', marginBottom: 20, fontWeight: 600 }}>
              <ArrowLeft size={16} /> Back to Events
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 24, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.6)', fontSize: 14 }}><Calendar size={16} /> {event.date}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.6)', fontSize: 14 }}><Clock size={16} /> {event.time}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.6)', fontSize: 14 }}><MapPin size={16} /> {event.location}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ color: '#fff', fontFamily: "'Arno Pro', serif", lineHeight: 1.2, marginBottom: 20, fontSize: 'clamp(36px, 6vw, 60px)' }}>
            {event.title}
          </motion.h1>
        </div>
      </section>

      {/* Countdown Timer */}
      {event.featured && (
        <section style={{ padding: '40px 0', background: '#f8fafc', borderBottom: '1px solid #eee' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
            <CountdownTimer />
          </div>
        </section>
      )}

      {/* Content */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 40px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontSize: 28, fontFamily: "'Arno Pro', serif", color: '#222', marginBottom: 20 }}>About This Event</h2>
            <p style={{ fontSize: 16, color: '#69757B', lineHeight: 1.8, marginBottom: 40 }}>{event.longDesc}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h2 style={{ fontSize: 28, fontFamily: "'Arno Pro', serif", color: '#222', marginBottom: 20 }}>Why You Should Attend</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
              {event.why.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E46C63', flexShrink: 0 }} />
                  <span style={{ fontSize: 15, color: '#444' }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 32px', borderRadius: 6, fontSize: 14, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '1px',
              background: '#E46C63', color: '#fff', textDecoration: 'none',
            }}>
              <Users size={18} /> Register Now
            </Link>
            <Link href="/locations" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 32px', borderRadius: 6, fontSize: 14, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '1px',
              border: '2px solid #1A374F', color: '#1A374F', textDecoration: 'none',
            }}>
              <MapPin size={18} /> Find a Location
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const nextSunday = new Date();
    nextSunday.setDate(nextSunday.getDate() + (7 - nextSunday.getDay()) % 7 || 7);
    nextSunday.setHours(8, 0, 0, 0);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = nextSunday.getTime() - now.getTime();
      if (diff <= 0) { clearInterval(timer); return; }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
      {units.map((u) => (
        <div key={u.label} style={{ textAlign: 'center' }}>
          <div style={{
            width: 72, height: 72, borderRadius: 12,
            background: '#fff', border: '2px solid #E46C63',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 700, color: '#1A374F',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            {String(u.value).padStart(2, '0')}
          </div>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: '#94a3b8', marginTop: 8 }}>{u.label}</p>
        </div>
      ))}
    </div>
  );
}

import React from 'react';
