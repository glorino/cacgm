'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-16" style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #0f2640 100%)' }}>
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>Contact</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Get in Touch</motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg mt-4 max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Have a question or want to visit? We&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold mb-6" style={{ color: '#1a1a1a' }}>Contact Information</h2>
              <div className="space-y-5">
                {[
                  { icon: <MapPin size={17} />, label: 'Address', value: '12 Allen Avenue, Ikeja, Lagos, Nigeria' },
                  { icon: <Phone size={17} />, label: 'Phone', value: '+234 801 234 5678' },
                  { icon: <Mail size={17} />, label: 'Email', value: 'info@cacgm.org' },
                  { icon: <Clock size={17} />, label: 'Office Hours', value: 'Mon - Fri, 9:00 AM - 5:00 PM' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(26,58,92,0.06)', color: '#1a3a5c' }}>{item.icon}</div>
                    <div>
                      <p className="text-xs" style={{ color: '#8a8580' }}>{item.label}</p>
                      <p className="text-sm font-medium" style={{ color: '#4a4540' }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#4a4540' }}>First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors" style={{ background: '#f5f3ef', border: '1px solid #e8e5e0', color: '#1a1a1a' }} placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#4a4540' }}>Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors" style={{ background: '#f5f3ef', border: '1px solid #e8e5e0', color: '#1a1a1a' }} placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: '#4a4540' }}>Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors" style={{ background: '#f5f3ef', border: '1px solid #e8e5e0', color: '#1a1a1a' }} placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: '#4a4540' }}>Subject</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors" style={{ background: '#f5f3ef', border: '1px solid #e8e5e0', color: '#1a1a1a' }} placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: '#4a4540' }}>Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors resize-none" style={{ background: '#f5f3ef', border: '1px solid #e8e5e0', color: '#1a1a1a' }} placeholder="Tell us more..." />
                </div>
                <button type="button" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold" style={{ background: '#1a3a5c', color: 'white' }}>
                  <Send size={14} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
