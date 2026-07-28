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
      <section className="bg-[#1a3a5c] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-white/40 text-sm font-medium tracking-wide uppercase mb-4">Our Locations</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Find a Congregation</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/50 text-lg mt-4 max-w-2xl leading-relaxed">
            We have 6 branches across Lagos. Visit any location for worship and fellowship.
          </motion.p>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((branch, i) => (
              <motion.div key={branch.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-7 bg-white rounded-2xl border border-slate-100 hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-300">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{branch.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-slate-300 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-500 text-sm">{branch.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-[#c8a44e] flex-shrink-0" />
                    <p className="text-sm font-medium" style={{ color: '#1a3a5c' }}>{branch.time}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-slate-300 flex-shrink-0" />
                    <p className="text-slate-500 text-sm">{branch.phone}</p>
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
