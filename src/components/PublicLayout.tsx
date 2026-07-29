'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { label: 'Locations', href: '/locations', hasDropdown: true },
  { label: 'Watch', href: '/watch' },
  { label: 'About', href: '/about' },
  { label: 'Ministries', href: '/ministries' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
];

const branchLocations = [
  'Headquarters', 'Surulere', 'Yaba', 'Ikeja GRA', 'Lekki', 'Ikorodu',
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
  }, []);

  useEffect(() => { setMobileOpen(false); setDropdownOpen(false); }, [pathname]);

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Gotham', sans-serif" }}>
      {/* HEADER */}
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99,
          background: scrolled ? '#fff' : 'rgba(0,0,0,0.4)',
          boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.08)' : 'none',
          transition: 'all .35s ease',
        }}
      >
        <div style={{
          maxWidth: 1400, margin: '0 auto', padding: '0 50px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: scrolled ? 65 : 80, transition: 'height .35s ease',
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src="/logo.png"
              alt="CACGM"
              style={{
                height: scrolled ? 38 : 46,
                width: 'auto',
                objectFit: 'contain',
                transition: 'all .35s ease',
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 0 }} className={isMobile ? 'hidden-mobile' : ''}>
            <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {navLinks.map((link) => (
                <li
                  key={link.label}
                  style={{ position: 'relative', marginLeft: 30 }}
                  onMouseEnter={() => link.hasDropdown && handleDropdownEnter()}
                  onMouseLeave={() => link.hasDropdown && handleDropdownLeave()}
                >
                  <Link
                    href={link.href}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      color: scrolled ? '#222' : '#fff', textDecoration: 'none',
                      padding: '8px 0', transition: 'color .2s',
                    }}
                  >
                    {link.label}
                    {link.hasDropdown && <ChevronDown size={12} style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .2s' }} />}
                  </Link>

                  {link.hasDropdown && dropdownOpen && (
                    <div
                      style={{
                        position: 'absolute', top: '100%', left: -20,
                        paddingTop: 12,
                        zIndex: 50,
                      }}
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <div style={{
                        background: '#fff', borderRadius: 8,
                        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                        padding: '12px 0', minWidth: 220,
                      }}>
                        <div style={{ padding: '0 20px 8px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#999' }}>Our Locations</div>
                        {branchLocations.map((loc) => (
                          <Link key={loc} href="/locations" style={{
                            display: 'block', padding: '10px 20px', fontSize: 14,
                            color: '#444', textDecoration: 'none', transition: 'background .15s',
                          }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                          >
                            {loc}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Auth buttons */}
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 40, gap: 16 }}>
              <Link href={session ? '/dashboard' : '/login'} style={{
                color: scrolled ? '#222' : '#fff', textDecoration: 'none',
                fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px',
                padding: '8px 0', whiteSpace: 'nowrap',
              }}>
                {session ? 'Dashboard' : 'Sign In'}
              </Link>
              <Link href="/give" style={{
                background: '#E46C63', color: '#fff', textDecoration: 'none',
                fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px',
                padding: '13px 24px', borderRadius: 3, transition: 'opacity .2s',
              }}>
                Give
              </Link>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{
            display: isMobile ? 'flex' : 'none', padding: 8,
            color: scrolled ? '#222' : '#fff', background: 'none', border: 'none', cursor: 'pointer', alignItems: 'center', justifyContent: 'center',
          }}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ background: '#fff', overflow: 'hidden', borderTop: '1px solid #eee' }}
            >
              <div style={{ padding: '24px 24px' }}>
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} style={{
                    display: 'block', padding: '12px 16px', color: '#555', textDecoration: 'none',
                    fontWeight: 700, textTransform: 'uppercase', fontSize: 14, letterSpacing: '0.5px',
                  }}>
                    {link.label}
                  </Link>
                ))}
                <Link href={session ? '/dashboard' : '/login'} style={{
                  display: 'block', padding: '12px 16px', color: '#555', textDecoration: 'none',
                  fontWeight: 700, textTransform: 'uppercase', fontSize: 14,
                }}>{session ? 'Dashboard' : 'Sign In'}</Link>
                <Link href="/give" style={{
                  display: 'block', padding: '12px 16px', textAlign: 'center',
                  fontWeight: 700, textTransform: 'uppercase', fontSize: 14, letterSpacing: '1px',
                  marginTop: 12, background: '#E46C63', color: '#fff', borderRadius: 3, textDecoration: 'none',
                }}>Give</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <style>{`
        @media (max-width: 1023px) {
          nav > ul, nav > div:last-child { display: none !important; }
        }
      `}</style>

      <main>{children}</main>

      {/* FOOTER */}
      <footer>
        {/* Newsletter */}
        <div style={{ padding: isMobile ? '40px 20px' : '60px 50px', textAlign: 'center', background: '#39A1B1' }}>
          <div style={{ maxWidth: 500, margin: '0 auto' }}>
            <h3 style={{ color: '#fff', fontFamily: "'Arno Pro', serif", fontSize: isMobile ? 26 : 32, marginBottom: 12 }}>The Weekly</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: isMobile ? 14 : 15, marginBottom: 24 }}>Sign up to stay in the loop with everything happening at CACGM.</p>
            <Link href="/contact" style={{
              display: 'inline-block', padding: isMobile ? '14px 28px' : '16px 40px', fontSize: 13, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '1px', borderRadius: 3,
              background: '#fff', color: '#39A1B1', textDecoration: 'none',
            }}>
              Receive The Weekly
            </Link>
          </div>
        </div>

        {/* Footer Content */}
        <div style={{ padding: isMobile ? '40px 20px' : '60px 50px', background: '#222' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ marginBottom: 32 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                height: 45, padding: '0 24px', fontWeight: 700, fontSize: 16,
                borderRadius: 4, background: '#E46C63', color: '#fff',
              }}>CACGM</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(5, 1fr)', gap: isMobile ? 24 : 40, marginBottom: 40 }}>
              {[
                { name: 'Headquarters', addr: '12 Allen Avenue, Ikeja, Lagos', time: 'Sundays 8:00 & 10:30 AM' },
                { name: 'Surulere', addr: '45 Bode Thomas Street', time: 'Sundays 9:00 AM' },
                { name: 'Yaba', addr: '78 Herbert Macaulay Way', time: 'Sundays 9:00 AM' },
                { name: 'Ikeja GRA', addr: '23 Oba Akran Avenue', time: 'Sundays 9:00 AM' },
                { name: 'Lekki', addr: '15 Admiralty Way', time: 'Sundays 9:00 AM' },
              ].map((loc) => (
                <div key={loc.name}>
                  <h3 style={{ color: '#fff', fontSize: isMobile ? 15 : 17, fontWeight: 500, marginBottom: 8 }}>{loc.name}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: isMobile ? 13 : 14, margin: '0 0 6px', lineHeight: 1.6 }}>{loc.addr}</p>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: isMobile ? 13 : 14, margin: 0 }}>{loc.time}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 20 : 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap' }}>
              {['Instagram', 'Facebook', 'YouTube'].map((social) => (
                <a key={social} href="#" style={{ color: '#39A1B1', textDecoration: 'none', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{social}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Info Bar */}
        <div style={{
          padding: isMobile ? '16px 20px' : '20px 50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: isMobile ? 10 : 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px',
          background: '#191919', color: 'rgba(255,255,255,0.5)',
          flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 0, textAlign: isMobile ? 'center' : 'left',
        }}>
          <span>&copy; {new Date().getFullYear()} CACGM. All Rights Reserved.</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 16 : 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contact Us</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
