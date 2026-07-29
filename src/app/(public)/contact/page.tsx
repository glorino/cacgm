'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <section style={{ position: 'relative', paddingTop: 200, paddingBottom: 100, textAlign: 'center', background: '#1A374F' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#E46C63', marginBottom: 16 }}>Contact</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ color: '#fff', fontFamily: "'Arno Pro', serif", lineHeight: 1.2, marginBottom: 20, fontSize: 'clamp(40px, 7vw, 68px)' }}>
            Get in Touch
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.8, maxWidth: 650, margin: '0 auto' }}>
            Have a question or want to visit? We&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 50px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 60 }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ fontSize: 28, fontFamily: "'Arno Pro', serif", color: '#222', marginBottom: 35 }}>Contact Information</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {[
                  { icon: <MapPin size={18} />, label: 'Address', value: '12 Allen Avenue, Ikeja, Lagos, Nigeria' },
                  { icon: <Phone size={18} />, label: 'Phone', value: '+234 801 234 5678' },
                  { icon: <Mail size={18} />, label: 'Email', value: 'info@cacgm.org' },
                  { icon: <Clock size={18} />, label: 'Office Hours', value: 'Mon - Fri, 9:00 AM - 5:00 PM' },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{ width: 50, height: 50, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: '#EFF4F4', color: '#1A374F' }}>{item.icon}</div>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#69757B', marginBottom: 4 }}>{item.label}</p>
                      <p style={{ fontSize: 16, color: '#222', margin: 0 }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#69757B', marginBottom: 8 }}>First Name</label>
                    <input type="text" placeholder="John" style={{ width: '100%', padding: '14px 16px', borderRadius: 3, fontSize: 15, outline: 'none', border: '1px solid #e5e7eb' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#69757B', marginBottom: 8 }}>Last Name</label>
                    <input type="text" placeholder="Doe" style={{ width: '100%', padding: '14px 16px', borderRadius: 3, fontSize: 15, outline: 'none', border: '1px solid #e5e7eb' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#69757B', marginBottom: 8 }}>Email</label>
                  <input type="email" placeholder="john@example.com" style={{ width: '100%', padding: '14px 16px', borderRadius: 3, fontSize: 15, outline: 'none', border: '1px solid #e5e7eb' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#69757B', marginBottom: 8 }}>Subject</label>
                  <input type="text" placeholder="How can we help?" style={{ width: '100%', padding: '14px 16px', borderRadius: 3, fontSize: 15, outline: 'none', border: '1px solid #e5e7eb' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#69757B', marginBottom: 8 }}>Message</label>
                  <textarea rows={5} placeholder="Tell us more..." style={{ width: '100%', padding: '14px 16px', borderRadius: 3, fontSize: 15, outline: 'none', border: '1px solid #e5e7eb', resize: 'none' }} />
                </div>
                <button type="button" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '19px 30px', fontSize: 14, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '1px', borderRadius: 3,
                  background: '#E46C63', color: '#fff', border: 'none', cursor: 'pointer',
                  width: 'fit-content',
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
