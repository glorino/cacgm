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
      <section style={{ position: 'relative', paddingTop: 200, paddingBottom: 100, textAlign: 'center', background: '#1A374F' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#E46C63', marginBottom: 16 }}>Our Locations</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ color: '#fff', fontFamily: "'Arno Pro', serif", lineHeight: 1.2, marginBottom: 20, fontSize: 'clamp(40px, 7vw, 68px)' }}>
            Find a Congregation
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.8, maxWidth: 650, margin: '0 auto' }}>
            We have 6 branches across Lagos. Visit any location for worship and fellowship.
          </motion.p>
        </div>
      </section>

      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 50px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30 }}>
            {branches.map((branch, i) => (
              <motion.div key={branch.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} style={{ padding: 35, background: '#fff', borderRadius: 15, border: '1px solid #f0f0f0', transition: 'box-shadow .3s' }}>
                <h3 style={{ fontSize: 20, fontFamily: "'Gotham', sans-serif", fontWeight: 500, color: '#222', marginBottom: 20 }}>{branch.name}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <MapPin size={16} style={{ color: '#39A1B1', marginTop: 2, flexShrink: 0 }} />
                    <p style={{ fontSize: 15, color: '#69757B', margin: 0 }}>{branch.address}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Clock size={16} style={{ color: '#E46C63', flexShrink: 0 }} />
                    <p style={{ fontSize: 15, fontWeight: 500, color: '#1A374F', margin: 0 }}>{branch.time}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Phone size={16} style={{ color: '#39A1B1', flexShrink: 0 }} />
                    <p style={{ fontSize: 15, color: '#69757B', margin: 0 }}>{branch.phone}</p>
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
