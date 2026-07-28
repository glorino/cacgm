'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <section className="relative pt-[200px] pb-[100px] text-center" style={{ background: '#1A374F' }}>
        <div className="max-w-[900px] mx-auto px-8">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[12px] font-bold uppercase tracking-[2px] text-[#E46C63] mb-4">Contact</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white font-['Arno_Pro',serif] leading-[1.2] mb-5" style={{ fontSize: 'clamp(40px, 7vw, 68px)' }}>
            Get in Touch
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/60 text-[18px] leading-[1.8] max-w-[650px] mx-auto">
            Have a question or want to visit? We&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      <section className="py-[100px]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-[50px]">
          <div className="grid lg:grid-cols-5 gap-[60px]">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-[28px] font-['Arno_Pro',serif] text-[#222] mb-[35px]">Contact Information</h2>
              <div className="space-y-6">
                {[
                  { icon: <MapPin size={18} />, label: 'Address', value: '12 Allen Avenue, Ikeja, Lagos, Nigeria' },
                  { icon: <Phone size={18} />, label: 'Phone', value: '+234 801 234 5678' },
                  { icon: <Mail size={18} />, label: 'Email', value: 'info@cacgm.org' },
                  { icon: <Clock size={18} />, label: 'Office Hours', value: 'Mon - Fri, 9:00 AM - 5:00 PM' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-[50px] h-[50px] rounded-[3px] flex items-center justify-center flex-shrink-0" style={{ background: '#EFF4F4', color: '#1A374F' }}>{item.icon}</div>
                    <div>
                      <p className="text-[12px] font-bold uppercase tracking-[1px] text-[#69757B] mb-1">{item.label}</p>
                      <p className="text-[16px] text-[#222]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form className="space-y-[22px]">
                <div className="grid sm:grid-cols-2 gap-[22px]">
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-[1px] text-[#69757B] mb-2">First Name</label>
                    <input type="text" className="w-full px-4 py-[14px] rounded-[3px] text-[15px] outline-none border border-gray-200 focus:border-[#1A374F] transition-colors" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-[1px] text-[#69757B] mb-2">Last Name</label>
                    <input type="text" className="w-full px-4 py-[14px] rounded-[3px] text-[15px] outline-none border border-gray-200 focus:border-[#1A374F] transition-colors" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-[1px] text-[#69757B] mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-[14px] rounded-[3px] text-[15px] outline-none border border-gray-200 focus:border-[#1A374F] transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-[1px] text-[#69757B] mb-2">Subject</label>
                  <input type="text" className="w-full px-4 py-[14px] rounded-[3px] text-[15px] outline-none border border-gray-200 focus:border-[#1A374F] transition-colors" placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-[1px] text-[#69757B] mb-2">Message</label>
                  <textarea rows={5} className="w-full px-4 py-[14px] rounded-[3px] text-[15px] outline-none border border-gray-200 focus:border-[#1A374F] transition-colors resize-none" placeholder="Tell us more..." />
                </div>
                <button type="button" className="inline-flex items-center gap-2 px-[30px] py-[19px] text-[14px] font-bold uppercase tracking-[1px] rounded-[3px] transition-all duration-200 hover:opacity-90" style={{ background: '#E46C63', color: '#fff' }}>
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
