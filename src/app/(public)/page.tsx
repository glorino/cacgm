'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Users, Heart, Calendar, Clock } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-center" style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #0f2640 100%)' }}>
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-6xl mx-auto px-5 lg:px-8 py-28 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8" style={{ background: 'rgba(200,164,78,0.15)', color: '#c8a44e' }}>
              Christ Apostolic Church of God Mission
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              Church Management<br />
              <span style={{ color: '#c8a44e' }}>Made Simple</span>
            </h1>
            <p className="text-lg mt-6 max-w-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Manage members, track attendance, process giving, and connect all CACGM branches from one place.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-10">
              <Link href="/dashboard" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold transition-all" style={{ background: 'white', color: '#1a3a5c' }}>
                Open Dashboard <ArrowRight size={15} />
              </Link>
              <Link href="/about" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-medium transition-all" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.15)' }}>
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative -mt-8 z-10 mb-20">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <div className="rounded-3xl px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6" style={{ background: 'white', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            {[
              { value: '6+', label: 'Branches' },
              { value: '2,847', label: 'Members' },
              { value: '₦35.5M', label: 'Year-to-Date Giving' },
              { value: '8', label: 'Departments' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold" style={{ color: '#1a3a5c' }}>{s.value}</p>
                <p className="text-xs mt-1" style={{ color: '#8a8580' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#c8a44e' }}>About CACGM</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: '#1a1a1a' }}>A Mission Rooted in Faith</h2>
              <p className="mt-4 leading-relaxed" style={{ color: '#8a8580' }}>
                Christ Apostolic Church of God Mission has been a beacon of hope and faith. Our management platform connects every branch under one unified system.
              </p>
              <Link href="/about" className="inline-flex items-center gap-1.5 font-semibold text-sm mt-6 hover:underline" style={{ color: '#1a3a5c' }}>
                Read Our Story <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Users size={20} />, title: 'Member Management', desc: 'Track members across branches' },
                { icon: <MapPin size={20} />, title: 'Branch Locator', desc: 'Find the nearest congregation' },
                { icon: <Heart size={20} />, title: 'Online Giving', desc: 'Secure giving with receipts' },
                { icon: <Calendar size={20} />, title: 'Attendance', desc: 'Record service attendance' },
              ].map((f) => (
                <div key={f.title} className="p-5 rounded-2xl" style={{ background: '#f5f3ef' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(26,58,92,0.06)', color: '#1a3a5c' }}>{f.icon}</div>
                  <h3 className="font-semibold text-sm" style={{ color: '#1a1a1a' }}>{f.title}</h3>
                  <p className="text-xs mt-1" style={{ color: '#8a8580' }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BRANCHES PREVIEW */}
      <section className="py-20 lg:py-28" style={{ background: '#f5f3ef' }}>
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#c8a44e' }}>Our Locations</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: '#1a1a1a' }}>Find a Congregation</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Headquarters', addr: '12 Allen Avenue, Ikeja, Lagos', time: 'Sundays 8:00 & 10:30 AM' },
              { name: 'Surulere', addr: '45 Bode Thomas Street, Surulere', time: 'Sundays 9:00 AM' },
              { name: 'Yaba', addr: '78 Herbert Macaulay Way, Yaba', time: 'Sundays 9:00 AM' },
              { name: 'Ikeja GRA', addr: '23 Oba Akran Avenue, Ikeja GRA', time: 'Sundays 9:00 AM' },
              { name: 'Lekki', addr: '15 Admiralty Way, Lekki Phase 1', time: 'Sundays 9:00 AM' },
              { name: 'Ikorodu', addr: '33 Benson Street, Ikorodu', time: 'Sundays 9:00 AM' },
            ].map((b) => (
              <div key={b.name} className="p-6 rounded-2xl transition-all hover:shadow-md" style={{ background: 'white' }}>
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(26,58,92,0.06)', color: '#1a3a5c' }}><MapPin size={15} /></div>
                  <div>
                    <h3 className="font-semibold text-sm" style={{ color: '#1a1a1a' }}>{b.name}</h3>
                    <p className="text-xs mt-1" style={{ color: '#8a8580' }}>{b.addr}</p>
                    <p className="text-xs font-medium mt-2 flex items-center gap-1" style={{ color: '#1a3a5c' }}><Clock size={11} /> {b.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/locations" className="inline-flex items-center gap-1.5 font-semibold text-sm hover:underline" style={{ color: '#1a3a5c' }}>
              View All Locations <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-5 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: '#1a1a1a' }}>Ready to Get Started?</h2>
          <p className="mt-3 leading-relaxed" style={{ color: '#8a8580' }}>
            Join CACGM branches already using our platform to streamline their operations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Link href="/dashboard" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold" style={{ background: '#1a3a5c', color: 'white' }}>
              Open Dashboard <ArrowRight size={15} />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-medium" style={{ background: '#f5f3ef', color: '#4a4540' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
