'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';
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

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getCountdown(dateStr: string): Countdown | null {
  const now = new Date();
  let target: Date;

  if (dateStr.startsWith('Every')) return null;

  const year = now.getFullYear();
  const dateText = dateStr.replace(/\d{4}/, '').trim();

  target = new Date(`${dateStr}, ${year}`);
  if (isNaN(target.getTime())) {
    const match = dateText.match(/(\w+)\s+(\d+)/);
    if (match) {
      target = new Date(`${match[1]} ${match[2]}, ${year}`);
    }
  }

  if (isNaN(target.getTime())) return null;

  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function CountdownTimer({ dateStr, isMobile }: { dateStr: string; isMobile: boolean }) {
  const [countdown, setCountdown] = useState<Countdown | null>(null);

  useEffect(() => {
    setCountdown(getCountdown(dateStr));
    const timer = setInterval(() => {
      setCountdown(getCountdown(dateStr));
    }, 1000);
    return () => clearInterval(timer);
  }, [dateStr]);

  if (!countdown) return null;

  return (
    <div style={{ display: 'flex', gap: isMobile ? 6 : 8, marginTop: 12 }}>
      {[
        { val: countdown.days, label: 'Days' },
        { val: countdown.hours, label: 'Hrs' },
        { val: countdown.minutes, label: 'Min' },
        { val: countdown.seconds, label: 'Sec' },
      ].map((item) => (
        <div key={item.label} style={{ textAlign: 'center', minWidth: isMobile ? 42 : 50 }}>
          <div style={{
            padding: isMobile ? '5px 8px' : '6px 10px', borderRadius: 8,
            background: 'rgba(228,108,99,0.1)',
            color: '#E46C63', fontWeight: 700, fontSize: isMobile ? 15 : 18,
            fontVariantNumeric: 'tabular-nums',
          }}>
            {String(item.val).padStart(2, '0')}
          </div>
          <p style={{ fontSize: isMobile ? 9 : 10, color: '#999', marginTop: 4, textTransform: 'uppercase', letterSpacing: 1 }}>{item.label}</p>
        </div>
      ))}
    </div>
  );
}

const events = [
  { slug: 'sunday-worship-service', title: 'Sunday Worship Service', date: 'Every Sunday', time: '8:00 AM & 10:30 AM', location: 'All Locations', desc: 'Join us for powerful worship and the Word of God.', featured: true },
  { slug: 'midweek-service', title: 'Midweek Service', date: 'Every Wednesday', time: '6:00 PM', location: 'Headquarters', desc: 'Deeper teaching, prayer, and spiritual growth.', featured: false },
  { slug: 'youth-night', title: 'Youth Night', date: 'Every Friday', time: '6:30 PM', location: 'All Locations', desc: 'Dynamic worship and teaching for ages 13-18.', featured: false },
  { slug: 'youth-camp-2026', title: 'Youth Camp 2026', date: 'August 15', time: 'All Day', location: 'Irvine Camp', desc: 'Games, worship, and life-changing messages.', featured: true },
  { slug: 'womens-conference', title: "Women's Conference", date: 'September 5', time: '9:00 AM', location: 'Headquarters', desc: 'A weekend of worship and fellowship for women.', featured: false },
  { slug: 'mens-prayer-breakfast', title: "Men's Prayer Breakfast", date: 'First Saturday Monthly', time: '7:30 AM', location: 'Headquarters', desc: 'Prayer, fellowship, and a hearty breakfast.', featured: false },
];

export default function EventsPage() {
  const isMobile = useIsMobile();
  return (
    <>
      <section style={{ position: 'relative', paddingTop: isMobile ? 120 : 200, paddingBottom: isMobile ? 60 : 100, textAlign: 'center', background: '#1A374F' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: isMobile ? '0 20px' : '0 40px' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#E46C63', marginBottom: 16 }}>Events</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ color: '#fff', fontFamily: "'Arno Pro', serif", lineHeight: 1.2, marginBottom: 20, fontSize: isMobile ? '32px' : 'clamp(40px, 7vw, 68px)' }}>
            Upcoming Events
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'rgba(255,255,255,0.6)', fontSize: isMobile ? 16 : 18, lineHeight: 1.8, maxWidth: 650, margin: '0 auto' }}>
            Stay connected with everything happening at CACGM.
          </motion.p>
        </div>
      </section>

      <section style={{ padding: isMobile ? '50px 0' : '100px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 16px' : '0 50px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 12 : 20 }}>
            {events.map((event, i) => (
              <motion.div key={event.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} style={{ padding: isMobile ? 20 : 35, borderRadius: 15, background: event.featured ? '#1A374F' : '#fff', border: event.featured ? 'none' : '1px solid #eee' }}>
                <div style={{ display: 'flex', alignItems: isMobile ? 'stretch' : 'flex-start', gap: isMobile ? 14 : 20, flexDirection: isMobile ? 'column' : 'row', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: isMobile ? 'auto' : 200 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: isMobile ? 10 : 16, fontSize: isMobile ? 12 : 13, marginBottom: 10 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: event.featured ? 'rgba(255,255,255,0.5)' : '#69757B' }}><Calendar size={13} /> {event.date}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: event.featured ? 'rgba(255,255,255,0.5)' : '#69757B' }}><Clock size={13} /> {event.time}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: event.featured ? 'rgba(255,255,255,0.5)' : '#69757B' }}><MapPin size={13} /> {event.location}</span>
                    </div>
                    <h3 style={{ fontSize: isMobile ? 17 : 20, fontFamily: "'Gotham', sans-serif", fontWeight: 500, color: event.featured ? '#fff' : '#222', margin: 0 }}>{event.title}</h3>
                    <p style={{ fontSize: isMobile ? 14 : 15, marginTop: 6, color: event.featured ? 'rgba(255,255,255,0.5)' : '#69757B' }}>{event.desc}</p>
                    <CountdownTimer dateStr={event.date} isMobile={isMobile} />
                  </div>
                  <Link href={`/events/${event.slug}`} style={{
                    display: 'inline-block', padding: isMobile ? '12px 24px' : '14px 30px', fontSize: 13, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '1px', borderRadius: 3, textAlign: 'center',
                    background: event.featured ? '#fff' : '#E46C63',
                    color: event.featured ? '#1A374F' : '#fff',
                    textDecoration: 'none', whiteSpace: 'nowrap', alignSelf: isMobile ? 'flex-start' : 'center',
                  }}>
                    Learn More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
