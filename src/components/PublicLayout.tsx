'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Locations', href: '/locations' },
  { label: 'Ministries', href: '/ministries' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-xs transition-colors ${scrolled ? 'bg-[#1a3a5c] text-white' : 'bg-white text-[#1a3a5c]'}`}>CA</div>
              <span className={`font-bold text-base tracking-tight transition-colors ${scrolled ? 'text-[#1a3a5c]' : 'text-white'}`}>CACGM</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={`px-3.5 py-2 text-sm font-medium rounded transition-colors ${pathname === link.href ? (scrolled ? 'text-[#1a3a5c] bg-[#1a3a5c]/5' : 'text-white bg-white/10') : (scrolled ? 'text-slate-500 hover:text-[#1a3a5c]' : 'text-white/70 hover:text-white')}`}>{link.label}</Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <Link href="/login" className={`text-sm font-medium px-4 py-2 rounded transition-colors ${scrolled ? 'text-slate-500 hover:text-[#1a3a5c]' : 'text-white/70 hover:text-white'}`}>Sign In</Link>
              <Link href="/dashboard" className={`flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded transition-colors ${scrolled ? 'bg-[#1a3a5c] text-white hover:bg-[#1a3a5c]/90' : 'bg-white text-[#1a3a5c] hover:bg-white/90'}`}>Dashboard <ArrowRight size={14} /></Link>
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)} className={`lg:hidden p-2 rounded ${scrolled ? 'text-slate-600' : 'text-white'}`}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-t border-slate-100 overflow-hidden">
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={`block px-4 py-3 rounded-lg font-medium transition-colors ${pathname === link.href ? 'text-[#1a3a5c] bg-[#1a3a5c]/5' : 'text-slate-500 hover:bg-slate-50'}`}>{link.label}</Link>
                ))}
                <Link href="/login" className="block px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-50 font-medium">Sign In</Link>
                <Link href="/dashboard" className="block px-4 py-3 rounded-lg bg-[#1a3a5c] text-white text-center font-semibold mt-2">Dashboard</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN */}
      <main>{children}</main>

      {/* FOOTER */}
      <footer className="bg-[#0f2640] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded bg-[#c8a44e] flex items-center justify-center"><span className="text-[#1a3a5c] font-bold text-xs">CA</span></div>
                <span className="font-bold text-base">CACGM</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">Christ Apostolic Church of God Mission. Unifying church management across all branches.</p>
            </div>
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-white/50 mb-4">Quick Links</h4>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-white/40 text-sm hover:text-white transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-white/50 mb-4">Account</h4>
              <ul className="space-y-2.5">
                {['Sign In', 'Register', 'Dashboard', 'Give Online'].map((item) => (
                  <li key={item}><Link href={item === 'Sign In' ? '/login' : item === 'Register' ? '/register' : item === 'Dashboard' ? '/dashboard' : '/dashboard/giving'} className="text-white/40 text-sm hover:text-white transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-white/50 mb-4">Contact</h4>
              <ul className="space-y-2.5 text-white/40 text-sm">
                <li>12 Allen Avenue, Ikeja, Lagos</li>
                <li>+234 801 234 5678</li>
                <li>info@cacgm.org</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">&copy; {new Date().getFullYear()} CACGM. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/30 text-sm hover:text-white/60 transition-colors">Privacy</a>
              <a href="#" className="text-white/30 text-sm hover:text-white/60 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
