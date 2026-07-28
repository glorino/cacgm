'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const events = [
  { title: 'Sunday Worship Service', date: 'Every Sunday', time: '8:00 AM & 10:30 AM', location: 'All Locations', desc: 'Join us for powerful worship and the Word of God across all our branches.', featured: true },
  { title: 'Midweek Service', date: 'Every Wednesday', time: '6:00 PM', location: 'Headquarters', desc: 'A midweek service for deeper teaching, prayer, and spiritual growth.', featured: false },
  { title: 'Youth Night', date: 'Every Friday', time: '6:30 PM', location: 'All Locations', desc: 'Dynamic worship, games, and teaching for young people ages 13-18.', featured: false },
  { title: 'Youth Camp 2026', date: 'August 15-20, 2026', time: 'All Day', location: 'Irvine Camp', desc: 'An out-of-this-world experience with games, worship, and life-changing messages.', featured: true },
  { title: 'Women\'s Conference', date: 'September 5-6, 2026', time: '9:00 AM', location: 'Headquarters', desc: 'A weekend of worship, teaching, and fellowship for women of all ages.', featured: false },
  { title: 'Men\'s Prayer Breakfast', date: 'First Saturday Monthly', time: '7:30 AM', location: 'Headquarters', desc: 'Start your month with prayer, fellowship, and a hearty breakfast.', featured: false },
];

export default function EventsPage() {
  return (
    <>
      <section className="bg-[#1a3a5c] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-white/40 text-sm font-medium tracking-wide uppercase mb-4">Events</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Upcoming Events</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/50 text-lg mt-4 max-w-2xl leading-relaxed">
            Stay connected with everything happening at CACGM. There&apos;s always something for everyone.
          </motion.p>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-5">
            {events.map((event, i) => (
              <motion.div key={event.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className={`p-7 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/40 ${event.featured ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-white border-slate-100'}`}>
                <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 text-sm mb-3">
                      <span className={`flex items-center gap-1.5 ${event.featured ? 'text-white/60' : 'text-slate-400'}`}><Calendar size={14} /> {event.date}</span>
                      <span className={`flex items-center gap-1.5 ${event.featured ? 'text-white/60' : 'text-slate-400'}`}><Clock size={14} /> {event.time}</span>
                      <span className={`flex items-center gap-1.5 ${event.featured ? 'text-white/60' : 'text-slate-400'}`}><MapPin size={14} /> {event.location}</span>
                    </div>
                    <h3 className={`text-xl font-bold ${event.featured ? 'text-white' : 'text-slate-900'}`}>{event.title}</h3>
                    <p className={`mt-2 leading-relaxed ${event.featured ? 'text-white/60' : 'text-slate-400'}`}>{event.desc}</p>
                  </div>
                  <Link href="/dashboard" className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-colors w-fit ${event.featured ? 'bg-white text-[#1a3a5c] hover:bg-white/90' : 'bg-[#1a3a5c] text-white hover:bg-[#1a3a5c]/90'}`}>
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
