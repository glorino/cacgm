'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

const events = [
  { slug: 'sunday-worship-service', title: 'Sunday Worship Service', date: 'Every Sunday', time: '8:00 AM & 10:30 AM', location: 'All Locations', desc: 'Join us for powerful worship and the Word of God.', featured: true },
  { slug: 'midweek-service', title: 'Midweek Service', date: 'Every Wednesday', time: '6:00 PM', location: 'Headquarters', desc: 'Deeper teaching, prayer, and spiritual growth.', featured: false },
  { slug: 'youth-night', title: 'Youth Night', date: 'Every Friday', time: '6:30 PM', location: 'All Locations', desc: 'Dynamic worship and teaching for ages 13-18.', featured: false },
  { slug: 'youth-camp-2026', title: 'Youth Camp 2026', date: 'August 15-20', time: 'All Day', location: 'Irvine Camp', desc: 'Games, worship, and life-changing messages.', featured: true },
  { slug: 'womens-conference', title: "Women's Conference", date: 'September 5-6', time: '9:00 AM', location: 'Headquarters', desc: 'A weekend of worship and fellowship for women.', featured: false },
  { slug: 'mens-prayer-breakfast', title: "Men's Prayer Breakfast", date: 'First Saturday Monthly', time: '7:30 AM', location: 'Headquarters', desc: 'Prayer, fellowship, and a hearty breakfast.', featured: false },
];

export default function EventsPage() {
  return (
    <>
      <section style={{ position: 'relative', paddingTop: 200, paddingBottom: 100, textAlign: 'center', background: '#1A374F' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#E46C63', marginBottom: 16 }}>Events</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ color: '#fff', fontFamily: "'Arno Pro', serif", lineHeight: 1.2, marginBottom: 20, fontSize: 'clamp(40px, 7vw, 68px)' }}>
            Upcoming Events
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.8, maxWidth: 650, margin: '0 auto' }}>
            Stay connected with everything happening at CACGM.
          </motion.p>
        </div>
      </section>

      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 50px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {events.map((event, i) => (
              <motion.div key={event.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} style={{ padding: 35, borderRadius: 15, background: event.featured ? '#1A374F' : '#fff', border: event.featured ? 'none' : '1px solid #eee' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, fontSize: 13, marginBottom: 12 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: event.featured ? 'rgba(255,255,255,0.5)' : '#69757B' }}><Calendar size={14} /> {event.date}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: event.featured ? 'rgba(255,255,255,0.5)' : '#69757B' }}><Clock size={14} /> {event.time}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: event.featured ? 'rgba(255,255,255,0.5)' : '#69757B' }}><MapPin size={14} /> {event.location}</span>
                    </div>
                    <h3 style={{ fontSize: 20, fontFamily: "'Gotham', sans-serif", fontWeight: 500, color: event.featured ? '#fff' : '#222', margin: 0 }}>{event.title}</h3>
                    <p style={{ fontSize: 15, marginTop: 8, color: event.featured ? 'rgba(255,255,255,0.5)' : '#69757B' }}>{event.desc}</p>
                  </div>
                  <Link href={`/events/${event.slug}`} style={{
                    display: 'inline-block', padding: '14px 30px', fontSize: 13, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '1px', borderRadius: 3,
                    background: event.featured ? '#fff' : '#E46C63',
                    color: event.featured ? '#1A374F' : '#fff',
                    textDecoration: 'none', whiteSpace: 'nowrap',
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
