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
      <section className="relative pt-[160px] pb-[100px] text-center" style={{ background: '#1A374F' }}>
        <div className="max-w-[992px] mx-auto px-5">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[12px] font-bold uppercase tracking-[2px] text-[#E46C63] mb-3">Our Locations</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white font-['Arno_Pro',serif] leading-[1.3] mb-4" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>
            Find a Congregation
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/60 text-[18px] leading-[1.8] max-w-[700px] mx-auto">
            We have 6 branches across Lagos. Visit any location for worship and fellowship.
          </motion.p>
        </div>
      </section>

      <section className="py-[100px]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-[30px]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {branches.map((branch, i) => (
              <motion.div key={branch.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-[30px] bg-white rounded-[15px] border border-gray-100 hover:shadow-[0_5px_20px_rgba(0,0,0,0.08)] transition-all duration-300">
                <h3 className="text-[20px] font-['Gotham',sans-serif] font-medium text-[#222] mb-4">{branch.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-[#39A1B1] mt-0.5 flex-shrink-0" />
                    <p className="text-[15px] text-[#69757B]">{branch.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-[#E46C63] flex-shrink-0" />
                    <p className="text-[15px] font-medium text-[#1A374F]">{branch.time}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-[#39A1B1] flex-shrink-0" />
                    <p className="text-[15px] text-[#69757B]">{branch.phone}</p>
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
