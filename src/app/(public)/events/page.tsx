'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const events = [
  { title: 'Sunday Worship Service', date: 'Every Sunday', time: '8:00 AM & 10:30 AM', location: 'All Locations', desc: 'Join us for powerful worship and the Word of God.', featured: true },
  { title: 'Midweek Service', date: 'Every Wednesday', time: '6:00 PM', location: 'Headquarters', desc: 'Deeper teaching, prayer, and spiritual growth.', featured: false },
  { title: 'Youth Night', date: 'Every Friday', time: '6:30 PM', location: 'All Locations', desc: 'Dynamic worship and teaching for ages 13-18.', featured: false },
  { title: 'Youth Camp 2026', date: 'August 15-20', time: 'All Day', location: 'Irvine Camp', desc: 'Games, worship, and life-changing messages.', featured: true },
  { title: "Women's Conference", date: 'September 5-6', time: '9:00 AM', location: 'Headquarters', desc: 'A weekend of worship and fellowship for women.', featured: false },
  { title: "Men's Prayer Breakfast", date: 'First Saturday Monthly', time: '7:30 AM', location: 'Headquarters', desc: 'Prayer, fellowship, and a hearty breakfast.', featured: false },
];

export default function EventsPage() {
  return (
    <>
      <section className="pt-32 pb-16" style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #0f2640 100%)' }}>
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>Events</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Upcoming Events</motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg mt-4 max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Stay connected with everything happening at CACGM.
          </motion.p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="space-y-4">
            {events.map((event, i) => (
              <motion.div key={event.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-7 rounded-3xl transition-all hover:shadow-lg" style={{ background: event.featured ? '#1a3a5c' : 'white', boxShadow: event.featured ? 'none' : '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
                      <span className="flex items-center gap-1.5" style={{ color: event.featured ? 'rgba(255,255,255,0.5)' : '#8a8580' }}><Calendar size={13} /> {event.date}</span>
                      <span className="flex items-center gap-1.5" style={{ color: event.featured ? 'rgba(255,255,255,0.5)' : '#8a8580' }}><Clock size={13} /> {event.time}</span>
                      <span className="flex items-center gap-1.5" style={{ color: event.featured ? 'rgba(255,255,255,0.5)' : '#8a8580' }}><MapPin size={13} /> {event.location}</span>
                    </div>
                    <h3 className="text-lg font-bold" style={{ color: event.featured ? 'white' : '#1a1a1a' }}>{event.title}</h3>
                    <p className="text-sm mt-1.5" style={{ color: event.featured ? 'rgba(255,255,255,0.5)' : '#8a8580' }}>{event.desc}</p>
                  </div>
                  <Link href="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all w-fit" style={{ background: event.featured ? 'white' : '#1a3a5c', color: event.featured ? '#1a3a5c' : 'white' }}>
                    Learn More <ArrowRight size={14} />
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
