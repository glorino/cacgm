'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  MapPin,
  Heart,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Church,
  Users,
  Globe,
  Play,
  Mail,

  ExternalLink,
  Calendar,
  Clock,
} from 'lucide-react';

const navItems = [
  { label: 'Locations', href: '#locations', hasDropdown: true },
  { label: 'Watch', href: '/dashboard' },
  { label: 'Join a Group', href: '#get-involved' },
  { label: 'Plan A Visit', href: '#locations' },
  { label: 'Give', href: '/dashboard/giving' },
];

const experienceCards = [
  {
    icon: <MapPin size={28} />,
    title: 'Find a Congregation',
    desc: 'We gather together for services each weekend',
    link: 'View Locations',
    href: '#locations',
  },
  {
    icon: <Users size={28} />,
    title: 'Youth Ministry',
    desc: 'For young people ages 13-18',
    link: 'Learn More',
    href: '#get-involved',
  },
  {
    icon: <Church size={28} />,
    title: 'Hosted Here',
    desc: 'Partner churches under CACGM',
    link: 'Learn More',
    href: '#about',
  },
  {
    icon: <Globe size={28} />,
    title: 'Online',
    desc: 'Experience CACGM from anywhere',
    link: 'Learn More',
    href: '/dashboard',
  },
];

const events = [
  {
    title: 'Sunday Worship Service',
    date: 'Every Sunday',
    location: 'All Locations',
    description: 'Join us for powerful worship and the Word of God across all our branches.',
    color: 'from-[#1a3a5c] to-[#0f2640]',
  },
  {
    title: 'Midweek Service',
    date: 'Every Wednesday',
    location: 'Headquarters',
    description: 'A midweek service for deeper teaching, prayer, and spiritual growth.',
    color: 'from-[#c8a44e] to-[#b8943e]',
  },
  {
    title: 'Youth Camp 2026',
    date: 'August 15-20',
    location: 'Irvine Camp',
    description: 'An out-of-this-world experience with games, worship, and life-changing messages.',
    color: 'from-emerald-600 to-emerald-700',
  },
];

const involvedCards = [
  { title: 'Follow Jesus', desc: 'Begin your faith journey with Christ', image: 'bg-gradient-to-br from-blue-500 to-blue-700', icon: <Church size={40} /> },
  { title: 'Grow Together', desc: 'Connect in community and small groups', image: 'bg-gradient-to-br from-emerald-500 to-emerald-700', icon: <Users size={40} /> },
  { title: 'Serve One Another', desc: 'Use your gifts to serve the church', image: 'bg-gradient-to-br from-amber-500 to-amber-700', icon: <Heart size={40} /> },
  { title: 'Change The World', desc: 'Impact lives through outreach and missions', image: 'bg-gradient-to-br from-rose-500 to-rose-700', icon: <Globe size={40} /> },
];

const stories = [
  { name: 'Sarah', quote: 'CACGM changed my life. I found purpose and community here.', tag: 'Testimony' },
  { name: 'David', quote: 'God transformed my family through the ministry at this church.', tag: 'Testimony' },
  { name: 'Grace', quote: 'I went from being lost to leading a department. Only God!', tag: 'Testimony' },
  { name: 'Emmanuel', quote: 'The teaching here is deep and practical. I grow every week.', tag: 'Testimony' },
];

const branches = [
  { name: 'Headquarters', address: '12 Allen Avenue, Ikeja, Lagos', time: 'Sundays 8:00 & 10:30 AM', phone: '+234 801 234 5678' },
  { name: 'Surulere', address: '45 Bode Thomas Street, Surulere', time: 'Sundays 9:00 AM', phone: '+234 801 234 5679' },
  { name: 'Yaba', address: '78 Herbert Macaulay Way, Yaba', time: 'Sundays 9:00 AM', phone: '+234 801 234 5680' },
  { name: 'Ikeja GRA', address: '23 Oba Akran Avenue, Ikeja GRA', time: 'Sundays 9:00 AM', phone: '+234 801 234 5681' },
  { name: 'Lekki', address: '15 Admiralty Way, Lekki Phase 1', time: 'Sundays 9:00 AM', phone: '+234 801 234 5682' },
  { name: 'Ikorodu', address: '33 Benson Street, Ikorodu', time: 'Sundays 9:00 AM', phone: '+234 801 234 5683' },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ========== HEADER ========== */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                scrolled ? 'bg-[#1a3a5c] text-white' : 'bg-white text-[#1a3a5c]'
              }`}>
                CA
              </div>
              <span className={`font-bold text-lg tracking-tight hidden sm:block ${
                scrolled ? 'text-[#1a3a5c]' : 'text-white'
              }`}>
                CACGM
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-2 text-[15px] font-medium transition-colors rounded-lg ${
                    scrolled
                      ? 'text-slate-600 hover:text-[#1a3a5c] hover:bg-slate-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className={`hidden sm:flex px-5 py-2.5 text-[15px] font-medium rounded-lg transition-colors ${
                  scrolled ? 'text-slate-600 hover:text-[#1a3a5c]' : 'text-white/90 hover:text-white'
                }`}
              >
                Sign In
              </Link>
              <Link
                href="/dashboard"
                className={`hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-lg text-[15px] font-semibold transition-all ${
                  scrolled
                    ? 'bg-[#1a3a5c] text-white hover:bg-[#1a3a5c]/90'
                    : 'bg-white text-[#1a3a5c] hover:bg-white/90'
                }`}
              >
                Dashboard
                <ArrowRight size={16} />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg ${
                  scrolled ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                }`}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="px-6 py-6 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 font-medium"
                  >
                    {item.label}
                  </a>
                ))}
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 font-medium">
                  Sign In
                </Link>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg bg-[#1a3a5c] text-white text-center font-semibold mt-2">
                  Open Dashboard
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1920&q=80)',
            }}
          />
          <div className="absolute inset-0 bg-[#1a3a5c]/60" />
        </div>

        {/* Hero Content */}
        <div className="relative flex-1 flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full pt-32 pb-20">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] max-w-3xl"
            >
              Unifying church management across every CACGM branch.
            </motion.h1>
          </div>
        </div>

        {/* Experience Cards - Bottom of Hero */}
        <div className="relative z-10">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-10">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/70 text-sm font-medium mb-4 tracking-wide uppercase"
            >
              Ways to experience CACGM
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {experienceCards.map((card, i) => (
                <motion.a
                  key={card.title}
                  href={card.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="group flex items-start gap-4 p-5 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl hover:bg-white/20 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-white flex-shrink-0">
                    {card.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-[15px]">{card.title}</h3>
                    <p className="text-white/50 text-sm mt-1 leading-snug">{card.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-white/70 text-sm font-medium mt-3 group-hover:text-white transition-colors">
                      {card.link}
                      <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== EVENTS CAROUSEL ========== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="relative rounded-2xl overflow-hidden min-h-[400px]">
            {events.map((event, i) => (
              <div
                key={event.title}
                className={`absolute inset-0 bg-gradient-to-br ${event.color} transition-opacity duration-700 ${
                  i === currentEvent ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex flex-col justify-center h-full px-10 lg:px-16 py-16">
                  <div className="flex items-center gap-3 text-white/60 text-sm mb-4">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                    <span className="text-white/30">|</span>
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-xl">
                    {event.title}
                  </h2>
                  <p className="text-white/70 text-lg max-w-lg mb-8 leading-relaxed">
                    {event.description}
                  </p>
                  <div>
                    <a
                      href="#locations"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1a3a5c] rounded-xl font-semibold text-sm hover:bg-white/90 transition-colors"
                    >
                      Learn More
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentEvent((prev) => (prev - 1 + events.length) % events.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentEvent((prev) => (prev + 1) % events.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {events.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentEvent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentEvent ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== GET INVOLVED ========== */}
      <section id="get-involved" className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold text-[#c8a44e] uppercase tracking-wider mb-3"
            >
              Get Involved
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900"
            >
              Your Next Step
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto"
            >
              At CACGM, we refer to the discipleship journey as the Transformational Loop. Become more like Jesus as you grow in faith.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {involvedCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group relative ${card.image} rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-5">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                  <p className="text-white/80 text-sm">{card.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-flex items-center gap-1.5 text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                    Learn More
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== STORIES ========== */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-semibold text-[#c8a44e] uppercase tracking-wider mb-3"
              >
                Our Stories
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl font-bold text-slate-900"
              >
                Lives Changed
              </motion.h2>
            </div>
            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              href="#"
              className="hidden sm:flex items-center gap-1.5 text-[#1a3a5c] font-semibold text-sm hover:underline"
            >
              Watch More Stories
              <ArrowRight size={14} />
            </motion.a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stories.map((story, i) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all cursor-pointer"
              >
                <div className="relative aspect-video bg-gradient-to-br from-slate-200 to-slate-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center text-[#1a3a5c] group-hover:scale-110 transition-transform shadow-lg">
                      <Play size={22} fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-[#1a3a5c] text-white text-xs font-semibold rounded-full">
                      {story.tag}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-slate-800 text-lg">{story.name}&apos;s Story</h4>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed line-clamp-2">{story.quote}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="sm:hidden mt-8 text-center">
            <a href="#" className="inline-flex items-center gap-1.5 text-[#1a3a5c] font-semibold text-sm">
              Watch More Stories <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ========== NEWSLETTER ========== */}
      <section className="py-20 bg-[#1a3a5c]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">The Weekly</h2>
              <p className="text-white/60 text-lg">
                Sign up to stay in the loop with everything happening at CACGM.
              </p>
            </div>
            <div className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 rounded-l-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/15 transition-colors"
              />
              <button className="px-6 py-3.5 bg-[#c8a44e] text-[#1a3a5c] rounded-r-xl font-semibold text-sm hover:bg-[#c8a44e]/90 transition-colors flex items-center gap-2 whitespace-nowrap">
                <Mail size={16} />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== LOCATIONS ========== */}
      <section id="locations" className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold text-[#c8a44e] uppercase tracking-wider mb-3"
            >
              Our Locations
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900"
            >
              Find a Congregation
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {branches.map((branch, i) => (
              <motion.div
                key={branch.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1a3a5c]/5 flex items-center justify-center text-[#1a3a5c] flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{branch.name}</h3>
                    <p className="text-slate-500 text-sm mt-1">{branch.address}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Clock size={14} className="text-[#c8a44e]" />
                      <span className="text-[#1a3a5c] text-sm font-medium">{branch.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-[#0f2640] text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#c8a44e] flex items-center justify-center">
                  <span className="text-[#1a3a5c] font-bold text-sm">CA</span>
                </div>
                <span className="font-bold text-lg">CACGM</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Christ Apostolic Church of God Mission. Unifying church management across all branches.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                </a>
              </div>
            </div>

            {/* About */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-white/70 mb-5">About</h4>
              <ul className="space-y-3">
                {['About CACGM', 'Statement of Faith', 'Leadership', 'Careers', 'Contact Us'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get Involved */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-white/70 mb-5">Get Involved</h4>
              <ul className="space-y-3">
                {['I\'m New', 'Join a Group', 'Volunteer', 'Events', 'Baptism'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ministries */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-white/70 mb-5">Ministries</h4>
              <ul className="space-y-3">
                {['Men\'s Ministry', 'Women\'s Ministry', 'Youth Ministry', 'Children\'s Ministry', 'Worship'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-white/70 mb-5">Locations</h4>
              <ul className="space-y-3">
                {branches.map((b) => (
                  <li key={b.name}>
                    <a href="#locations" className="text-white/50 text-sm hover:text-white transition-colors">{b.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} CACGM. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/40 text-sm hover:text-white/70 transition-colors">Contact Us</a>
              <a href="#" className="text-white/40 text-sm hover:text-white/70 transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/40 text-sm hover:text-white/70 transition-colors">About Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
