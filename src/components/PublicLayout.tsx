'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Locations', href: '/locations', hasDropdown: true },
  { label: 'Watch', href: '/dashboard' },
  { label: 'About', href: '/about' },
  { label: 'Ministries', href: '/ministries' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
];

const branchLocations = [
  'Headquarters', 'Surulere', 'Yaba', 'Ikeja GRA', 'Lekki', 'Ikorodu'
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setDropdownOpen(false); }, [pathname]);

  return (
    <div className="min-h-screen bg-white font-['Gotham',sans-serif]">
      {/* HEADER */}
      <header
        className="fixed top-0 left-0 right-0 z-[99] transition-all duration-[350ms]"
        style={{
          background: scrolled ? '#fff' : 'transparent',
          boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-[30px] flex items-center justify-between" style={{ height: scrolled ? 70 : 80 }}>
          {/* Logo */}
          <Link href="/" className="flex items-center transition-all duration-[350ms]">
            <div
              className="flex items-center justify-center font-bold text-sm rounded"
              style={{
                width: scrolled ? 40 : 50,
                height: scrolled ? 40 : 50,
                background: scrolled ? '#1a3a5c' : '#fff',
                color: scrolled ? '#fff' : '#1a3a5c',
                transition: 'all .35s ease',
              }}
            >
              CA
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex list-none m-0 p-0 font-bold uppercase text-[13px] tracking-[0.5px]">
              {navLinks.map((link) => (
                <li
                  key={link.label}
                  className="relative"
                  style={{ marginLeft: 30 }}
                  onMouseEnter={() => link.hasDropdown && setDropdownOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setDropdownOpen(false)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 transition-colors duration-200"
                    style={{ color: scrolled ? '#222' : '#fff' }}
                  >
                    {link.label}
                    {link.hasDropdown && <ChevronDown size={12} />}
                  </Link>

                  {/* Locations Dropdown */}
                  {link.hasDropdown && dropdownOpen && (
                    <div
                      className="absolute top-[calc(100%+20px)] left-[-20px] bg-white rounded shadow-[0_5px_20px_rgba(0,0,0,0.2)] py-3 min-w-[200px] z-50"
                    >
                      <div className="px-5 pb-2 text-[11px] font-bold uppercase tracking-[1px] text-gray-400">Locations</div>
                      {branchLocations.map((loc) => (
                        <Link key={loc} href="/locations" className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          {loc}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex items-center ml-[30px] gap-3">
              <Link href="/login" className="text-[13px] font-bold uppercase tracking-[0.5px] px-4 py-2 transition-colors" style={{ color: scrolled ? '#222' : '#fff' }}>
                Sign In
              </Link>
              <Link
                href="/dashboard"
                className="text-[13px] font-bold uppercase tracking-[1px] px-[22px] py-[14px] rounded-[3px] transition-all duration-200"
                style={{ background: '#E46C63', color: '#fff' }}
              >
                Dashboard
              </Link>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2" style={{ color: scrolled ? '#222' : '#fff' }}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white overflow-hidden">
              <div className="px-5 py-6 space-y-1">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="block px-4 py-3 rounded text-gray-600 hover:bg-gray-50 font-bold uppercase text-sm tracking-[0.5px]">
                    {link.label}
                  </Link>
                ))}
                <Link href="/login" className="block px-4 py-3 rounded text-gray-600 hover:bg-gray-50 font-bold uppercase text-sm tracking-[0.5px]">Sign In</Link>
                <Link href="/dashboard" className="block px-4 py-3 rounded text-center font-bold uppercase text-sm tracking-[1px] mt-2" style={{ background: '#E46C63', color: '#fff' }}>Dashboard</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>{children}</main>

      {/* FOOTER */}
      <footer>
        {/* Newsletter */}
        <div className="py-12 px-5 text-center" style={{ background: '#39A1B1' }}>
          <div className="max-w-[480px] mx-auto">
            <h3 className="text-white font-['Arno_Pro',serif] text-[28px] mb-3">The Weekly</h3>
            <p className="text-white/80 text-sm mb-6">Sign up to stay in the loop with everything happening at CACGM.</p>
            <Link href="/contact" className="inline-block px-8 py-[14px] text-[13px] font-bold uppercase tracking-[1px] rounded-[3px] transition-all duration-200" style={{ background: '#fff', color: '#39A1B1' }}>
              Receive The Weekly
            </Link>
          </div>
        </div>

        {/* Footer Content */}
        <div className="py-12 px-5 md:px-8 lg:px-[7.8%]" style={{ background: '#222' }}>
          <div className="max-w-[1400px] mx-auto">
            {/* Logo */}
            <div className="mb-8">
              <div className="w-[250px] h-[50px] flex items-center justify-center font-bold text-lg rounded" style={{ background: '#E46C63', color: '#fff' }}>CACGM</div>
            </div>

            {/* Locations Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
              {[
                { name: 'Headquarters', addr: '12 Allen Avenue, Ikeja, Lagos', time: 'Sundays 8:00 & 10:30 AM' },
                { name: 'Surulere', addr: '45 Bode Thomas Street', time: 'Sundays 9:00 AM' },
                { name: 'Yaba', addr: '78 Herbert Macaulay Way', time: 'Sundays 9:00 AM' },
                { name: 'Ikeja GRA', addr: '23 Oba Akran Avenue', time: 'Sundays 9:00 AM' },
                { name: 'Lekki', addr: '15 Admiralty Way', time: 'Sundays 9:00 AM' },
              ].map((loc) => (
                <div key={loc.name}>
                  <h3 className="text-white text-[18px] font-['Gotham',sans-serif] font-medium mb-3">{loc.name}</h3>
                  <div className="flex items-start gap-2 mb-2">
                    <MapPin size={14} className="text-[#39A1B1] mt-0.5 flex-shrink-0" />
                    <span className="text-white/70 text-[14px] leading-relaxed">{loc.addr}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#39A1B1" strokeWidth="2" className="mt-0.5 flex-shrink-0"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span className="text-white/70 text-[14px]">{loc.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-8 mb-8">
              {['Instagram', 'Facebook', 'YouTube'].map((social) => (
                <a key={social} href="#" className="text-[#39A1B1] hover:text-white transition-colors text-sm font-bold uppercase tracking-[0.5px]">{social}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Info Bar */}
        <div className="py-6 px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] font-medium uppercase tracking-[1px]" style={{ background: '#191919', color: 'rgba(255,255,255,0.5)' }}>
          <span>&copy; {new Date().getFullYear()} CACGM. All Rights Reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
            <a href="#" className="hover:text-white transition-colors">About Us</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
