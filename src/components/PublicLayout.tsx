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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <div className="min-h-screen" style={{ background: '#faf9f7' }}>
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`} style={{ background: scrolled ? 'rgba(250,249,247,0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none', boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.04)' : 'none' }}>
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs" style={{ background: '#1a3a5c', color: 'white' }}>CA</div>
              <span className="font-bold text-base tracking-tight" style={{ color: '#1a3a5c' }}>CACGM</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="px-4 py-2 text-sm font-medium rounded-xl transition-all" style={{ color: pathname === link.href ? '#1a3a5c' : '#6b6560', background: pathname === link.href ? 'rgba(26,58,92,0.06)' : 'transparent' }}>{link.label}</Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium px-4 py-2 rounded-xl transition-colors" style={{ color: '#6b6560' }}>Sign In</Link>
              <Link href="/dashboard" className="flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all" style={{ background: '#1a3a5c', color: 'white' }}>Dashboard <ArrowRight size={14} /></Link>
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-xl" style={{ color: '#1a3a5c' }}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden overflow-hidden" style={{ background: 'white' }}>
              <div className="px-5 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="block px-4 py-3 rounded-xl font-medium transition-colors" style={{ color: pathname === link.href ? '#1a3a5c' : '#6b6560', background: pathname === link.href ? 'rgba(26,58,92,0.06)' : 'transparent' }}>{link.label}</Link>
                ))}
                <Link href="/login" className="block px-4 py-3 rounded-xl font-medium" style={{ color: '#6b6560' }}>Sign In</Link>
                <Link href="/dashboard" className="block px-4 py-3 rounded-xl text-center font-semibold mt-2" style={{ background: '#1a3a5c', color: 'white' }}>Dashboard</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>{children}</main>

      {/* FOOTER */}
      <footer style={{ background: '#1a3a5c' }}>
        <div className="max-w-6xl mx-auto px-5 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs" style={{ background: '#c8a44e', color: '#1a3a5c' }}>CA</div>
                <span className="font-bold text-base text-white">CACGM</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>Christ Apostolic Church of God Mission. Unifying church management across all branches.</p>
            </div>
            {[
              { title: 'Navigate', links: [{ label: 'Home', href: '/' }, ...navLinks.map(l => ({ label: l.label, href: l.href }))] },
              { title: 'Account', links: [{ label: 'Sign In', href: '/login' }, { label: 'Register', href: '/register' }, { label: 'Dashboard', href: '/dashboard' }, { label: 'Give Online', href: '/dashboard/giving' }] },
              { title: 'Contact', links: [{ label: '12 Allen Avenue, Ikeja, Lagos', href: '#' }, { label: '+234 801 234 5678', href: '#' }, { label: 'info@cacgm.org', href: '#' }] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-xs uppercase tracking-wider mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}><Link href={link.href} className="text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.4)' }}>{link.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>&copy; {new Date().getFullYear()} CACGM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
