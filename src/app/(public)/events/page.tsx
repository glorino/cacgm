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
      <section className="relative pt-[160px] pb-[100px] text-center" style={{ background: '#1A374F' }}>
        <div className="max-w-[992px] mx-auto px-5">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[12px] font-bold uppercase tracking-[2px] text-[#E46C63] mb-3">Events</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white font-['Arno_Pro',serif] leading-[1.3] mb-4" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>
            Upcoming Events
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/60 text-[18px] leading-[1.8] max-w-[700px] mx-auto">
            Stay connected with everything happening at CACGM.
          </motion.p>
        </div>
      </section>

      <section className="py-[100px]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-[30px]">
          <div className="space-y-[15px]">
            {events.map((event, i) => (
              <motion.div key={event.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-[30px] rounded-[15px] transition-all hover:shadow-[0_5px_20px_rgba(0,0,0,0.08)]" style={{ background: event.featured ? '#1A374F' : '#fff', border: event.featured ? 'none' : '1px solid #eee' }}>
              <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 text-[13px] mb-3">
                    <span className="flex items-center gap-1.5" style={{ color: event.featured ? 'rgba(255,255,255,0.5)' : '#69757B' }}><Calendar size={14} /> {event.date}</span>
                    <span className="flex items-center gap-1.5" style={{ color: event.featured ? 'rgba(255,255,255,0.5)' : '#69757B' }}><Clock size={14} /> {event.time}</span>
                    <span className="flex items-center gap-1.5" style={{ color: event.featured ? 'rgba(255,255,255,0.5)' : '#69757B' }}><MapPin size={14} /> {event.location}</span>
                  </div>
                  <h3 className="text-[20px] font-['Gotham',sans-serif] font-medium" style={{ color: event.featured ? '#fff' : '#222' }}>{event.title}</h3>
                  <p className="text-[15px] mt-1.5" style={{ color: event.featured ? 'rgba(255,255,255,0.5)' : '#69757B' }}>{event.desc}</p>
                </div>
                <Link href="/dashboard" className="inline-block px-[30px] py-[14px] text-[13px] font-bold uppercase tracking-[1px] rounded-[3px] transition-all duration-200 w-fit" style={{ background: event.featured ? '#fff' : '#E46C63', color: event.featured ? '#1A374F' : '#fff' }}>
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
