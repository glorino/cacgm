'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Phone } from 'lucide-react';

const branches = [
  { name: 'Headquarters', address: '12 Allen Avenue, Ikeja, Lagos', time: 'Sundays 8:00 & 10:30 AM', phone: '+234 801 234 5678' },
  { name: 'Surulere', address: '45 Bode Thomas Street, Surulere', time: 'Sundays 9:00 AM', phone: '+234 801 234 5679' },
  { name: 'Yaba', address: '78 Herbert Macaulay Way, Yaba', time: 'Sundays 9:00 AM', phone: '+234 801 234 5680' },
  { name: 'Ikeja GRA', address: '23 Oba Akran Avenue, Ikeja GRA', time: 'Sundays 9:00 AM', phone: '+234 801 234 5681' },
  { name: 'Lekki', address: '15 Admiralty Way, Lekki Phase 1', time: 'Sundays 9:00 AM', phone: '+234 801 234 5682' },
  { name: 'Ikorodu', address: '33 Benson Street, Ikorodu', time: 'Sundays 9:00 AM', phone: '+234 801 234 5683' },
];

export default function LocationsPage() {
  return (
    <>
      <section className="pt-32 pb-16" style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #0f2640 100%)' }}>
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>Our Locations</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Find a Congregation</motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg mt-4 max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            We have 6 branches across Lagos. Visit any location for worship and fellowship.
          </motion.p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {branches.map((branch, i) => (
              <motion.div key={branch.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="p-7 rounded-3xl transition-all hover:shadow-lg" style={{ background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <h3 className="font-bold" style={{ color: '#1a1a1a' }}>{branch.name}</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: '#c8a44e' }} />
                    <p className="text-sm" style={{ color: '#8a8580' }}>{branch.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={15} className="flex-shrink-0" style={{ color: '#c8a44e' }} />
                    <p className="text-sm font-medium" style={{ color: '#1a3a5c' }}>{branch.time}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={15} className="flex-shrink-0" style={{ color: '#c8a44e' }} />
                    <p className="text-sm" style={{ color: '#8a8580' }}>{branch.phone}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
