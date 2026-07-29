'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

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

export default function ContactPage() {
  const isMobile = useIsMobile();
  return (
    <>
      <section style={{ position: 'relative', paddingTop: isMobile ? 120 : 200, paddingBottom: isMobile ? 60 : 100, textAlign: 'center', background: '#1A374F' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: isMobile ? '0 20px' : '0 40px' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#E46C63', marginBottom: 16 }}>Contact</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ color: '#fff', fontFamily: "'Arno Pro', serif", lineHeight: 1.2, marginBottom: 20, fontSize: isMobile ? '32px' : 'clamp(40px, 7vw, 68px)' }}>
            Get in Touch
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'rgba(255,255,255,0.6)', fontSize: isMobile ? 16 : 18, lineHeight: 1.8, maxWidth: 650, margin: '0 auto' }}>
            Have a question or want to visit? We&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      <section style={{ padding: isMobile ? '50px 0' : '100px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 20px' : '0 50px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 3fr', gap: isMobile ? 40 : 60 }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ fontSize: isMobile ? 22 : 28, fontFamily: "'Arno Pro', serif", color: '#222', marginBottom: isMobile ? 24 : 35 }}>Contact Information</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 18 : 24 }}>
                {[
                  { icon: <MapPin size={18} />, label: 'Address', value: '12 Allen Avenue, Ikeja, Lagos, Nigeria' },
                  { icon: <Phone size={18} />, label: 'Phone', value: '+234 801 234 5678' },
                  { icon: <Mail size={18} />, label: 'Email', value: 'info@cacgm.org' },
                  { icon: <Clock size={18} />, label: 'Office Hours', value: 'Mon - Fri, 9:00 AM - 5:00 PM' },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: '#EFF4F4', color: '#1A374F' }}>{item.icon}</div>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#69757B', marginBottom: 4 }}>{item.label}</p>
                      <p style={{ fontSize: isMobile ? 15 : 16, color: '#222', margin: 0 }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 16 : 22 }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 12 : 22 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#69757B', marginBottom: 8 }}>First Name</label>
                    <input type="text" placeholder="John" style={{ width: '100%', padding: isMobile ? '12px 14px' : '14px 16px', borderRadius: 3, fontSize: isMobile ? 14 : 15, outline: 'none', border: '1px solid #e5e7eb', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#69757B', marginBottom: 8 }}>Last Name</label>
                    <input type="text" placeholder="Doe" style={{ width: '100%', padding: isMobile ? '12px 14px' : '14px 16px', borderRadius: 3, fontSize: isMobile ? 14 : 15, outline: 'none', border: '1px solid #e5e7eb', boxSizing: 'border-box' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#69757B', marginBottom: 8 }}>Email</label>
                  <input type="email" placeholder="john@example.com" style={{ width: '100%', padding: isMobile ? '12px 14px' : '14px 16px', borderRadius: 3, fontSize: isMobile ? 14 : 15, outline: 'none', border: '1px solid #e5e7eb', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#69757B', marginBottom: 8 }}>Subject</label>
                  <input type="text" placeholder="How can we help?" style={{ width: '100%', padding: isMobile ? '12px 14px' : '14px 16px', borderRadius: 3, fontSize: isMobile ? 14 : 15, outline: 'none', border: '1px solid #e5e7eb', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#69757B', marginBottom: 8 }}>Message</label>
                  <textarea rows={isMobile ? 4 : 5} placeholder="Tell us more..." style={{ width: '100%', padding: isMobile ? '12px 14px' : '14px 16px', borderRadius: 3, fontSize: isMobile ? 14 : 15, outline: 'none', border: '1px solid #e5e7eb', resize: 'none', boxSizing: 'border-box' }} />
                </div>
                <button type="button" style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: isMobile ? '14px 24px' : '19px 30px', fontSize: 14, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '1px', borderRadius: 3,
                  background: '#E46C63', color: '#fff', border: 'none', cursor: 'pointer',
                  width: isMobile ? '100%' : 'fit-content',
                }}>
                  <Send size={15} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
