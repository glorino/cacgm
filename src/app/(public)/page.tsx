'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, MapPin, Globe, Users, MonitorPlay } from 'lucide-react';

const heroImages = [
  'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=2000&q=80',
  'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=2000&q=80',
  'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=2000&q=80',
  'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=2000&q=80',
];

const heroTexts = [
  'Inspiring people to follow Jesus and fearlessly change the world.',
  'A community of faith, hope, and love.',
  'Join us in worship and service every week.',
];

const experienceCards = [
  { title: 'Find a Congregation', desc: 'We gather together for services each weekend', link: 'Locations', href: '/locations', icon: <MapPin size={28} />, color: '#1A374F', bg: 'linear-gradient(135deg, #1A374F, #254f6e)' },
  { title: 'Youth Ministry', desc: 'For young people ages 13-18', link: 'Learn More', href: '/ministries', icon: <Users size={28} />, color: '#E46C63', bg: 'linear-gradient(135deg, #E46C63, #c44f47)' },
  { title: 'Hosted Here', desc: 'Partner churches under CACGM', link: 'Learn More', href: '/about', icon: <Globe size={28} />, color: '#39A1B1', bg: 'linear-gradient(135deg, #39A1B1, #2d8a96)' },
  { title: 'Online', desc: 'Experience CACGM from anywhere', link: 'Learn More', href: '/watch', icon: <MonitorPlay size={28} />, color: '#3364A0', bg: 'linear-gradient(135deg, #3364A0, #254f8a)' },
];

const loopSteps = [
  { title: 'Follow Jesus', desc: 'Begin your faith journey with Christ and commit your life to Him.', color: '#3364A0' },
  { title: 'Grow Together', desc: 'Connect in community through small groups and fellowship.', color: '#9EC73F' },
  { title: 'Serve One Another', desc: 'Use your unique gifts to serve the church and bless others.', color: '#39A1B1' },
  { title: 'Change The World', desc: 'Impact lives through outreach, missions, and acts of love.', color: '#E46C63' },
];

const stories = [
  {
    name: 'Sunday Service',
    quote: 'Watch our latest Sunday service message and be blessed by the Word of God.',
    tag: 'Church Message',
    videoId: 'uq6UnTMPyUI',
  },
  {
    name: 'Midweek Service',
    quote: 'Join our midweek service for deeper teachings and spiritual growth.',
    tag: 'Church Message',
    videoId: 'ZBzolX8wOqY',
  },
  {
    name: 'Worship Night',
    quote: 'Experience the presence of God through our worship night sessions.',
    tag: 'Worship',
    videoId: 'rVnEYkrm7ac',
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#000', height: '100vh', minHeight: 700 }}>
        {/* Image Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <img
              src={heroImages[currentSlide]}
              alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
            />
          </motion.div>
        </AnimatePresence>

        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0))', zIndex: 5 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100%', background: 'linear-gradient(180deg, rgba(0,0,0,0) 18%, rgba(0,0,0,0.6) 63%)', zIndex: 5 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 350, opacity: 0.8, background: 'linear-gradient(180deg, rgba(0,0,0,0.0001) 0%, #000 100%)', zIndex: 5 }} />

        {/* Slider Controls */}
        <div style={{ position: 'absolute', bottom: 260, left: 0, right: 0, zIndex: 20, display: 'flex', justifyContent: 'center', gap: 12 }}>
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              style={{
                width: i === currentSlide ? 40 : 10, height: 10, borderRadius: 5,
                background: i === currentSlide ? '#E46C63' : 'rgba(255,255,255,0.4)',
                border: 'none', cursor: 'pointer', transition: 'all .3s',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
          style={{
            position: 'absolute', left: 30, top: '50%', transform: 'translateY(-50%)', zIndex: 20,
            width: 48, height: 48, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)',
            background: 'rgba(0,0,0,0.3)', color: '#fff', display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', transition: 'all .2s',
          }}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroImages.length)}
          style={{
            position: 'absolute', right: 30, top: '50%', transform: 'translateY(-50%)', zIndex: 20,
            width: 48, height: 48, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)',
            background: 'rgba(0,0,0,0.3)', color: '#fff', display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', transition: 'all .2s',
          }}
        >
          <ChevronRight size={24} />
        </button>

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 1280, margin: '0 auto', padding: '22vh 40px 40px' }}>
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              style={{ color: '#fff', lineHeight: 1.25, fontFamily: "'Arno Pro', serif", fontWeight: 400, fontSize: 'clamp(32px, 5vw, 60px)', marginBottom: 30 }}
            >
              {heroTexts[currentSlide]}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Experience Cards */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1400, margin: '0 auto', padding: '0 50px 50px' }}>
          <h2 style={{ color: '#fff', textAlign: 'center', fontFamily: "'Arno Pro', serif", fontWeight: 400, marginBottom: 30, fontSize: 'clamp(20px, 2.5vw, 30px)' }}>
            Ways to experience CACGM
          </h2>
          <div style={{ display: 'flex', gap: 15 }}>
            {experienceCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{
                  flex: 1, borderRadius: 15, padding: '22px 20px', display: 'flex', flexDirection: 'column', textAlign: 'left',
                  background: 'hsla(0,0%,100%,0.92)', backdropFilter: 'blur(20px)',
                  overflow: 'hidden', position: 'relative', cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                }}
              >
                {/* Color accent bar at top */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: card.bg }} />
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: card.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 12, color: '#fff',
                  boxShadow: `0 4px 12px ${card.color}30`,
                }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize: 16, fontFamily: "'Gotham', sans-serif", fontWeight: 600, color: '#222', marginBottom: 6 }}>{card.title}</h3>
                <p style={{ fontSize: 13, color: '#69757B', marginBottom: 16, lineHeight: 1.5 }}>{card.desc}</p>
                <div style={{ marginTop: 'auto' }}>
                  <Link href={card.href} style={{
                    display: 'inline-block', padding: '10px 18px',
                    fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px',
                    borderRadius: 3, background: card.color, color: '#fff', textDecoration: 'none',
                    transition: 'opacity .2s',
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    {card.link}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THE LOOP - ANIMATED */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 50px', display: 'flex', alignItems: 'center', gap: 64, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 60%', minWidth: 320, display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 500, height: 500 }}>
              {/* Dashed circle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px dashed hsl(188,51%,66%)' }}
              />
              {/* Animated dashed circle rotation */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px dashed rgba(57,161,177,0.2)' }}
              />
              {/* Center circle */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{
                  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                  width: '55%', height: '55%', borderRadius: '50%', background: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#69757B', marginBottom: 4 }}>The</p>
                  <h2 style={{ fontFamily: "'Arno Pro', serif", fontSize: 50, lineHeight: 1, color: '#222' }}>Loop</h2>
                </div>
              </motion.div>
              {/* Animated dots */}
              {loopSteps.map((step, i) => {
                const angle = (i * 90 - 90) * (Math.PI / 180);
                const radius = 42;
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.2, duration: 0.4, type: 'spring' }}
                    style={{
                      position: 'absolute', width: 16, height: 16, borderRadius: '50%',
                      background: step.color, left: `${x}%`, top: `${y}%`,
                      transform: 'translate(-50%,-50%)', zIndex: 20,
                      boxShadow: `0 2px 8px ${step.color}40`,
                    }}
                  />
                );
              })}
              {/* Animated connecting lines */}
              <motion.svg
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                viewBox="0 0 100 100"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                {loopSteps.map((step, i) => {
                  const angle1 = (i * 90 - 90) * (Math.PI / 180);
                  const angle2 = ((i + 1) * 90 - 90) * (Math.PI / 180);
                  const r = 42;
                  const cx = 50;
                  const cy = 50;
                  const x1 = cx + r * Math.cos(angle1);
                  const y1 = cy + r * Math.sin(angle1);
                  const x2 = cx + r * Math.cos(angle2);
                  const y2 = cy + r * Math.sin(angle2);
                  return (
                    <motion.line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={step.color}
                      strokeWidth="0.5"
                      strokeDasharray="2 2"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1 + i * 0.2, duration: 0.5 }}
                    />
                  );
                })}
              </motion.svg>
            </div>
          </div>

          <div style={{ flex: '1 1 35%', minWidth: 280 }}>
            <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#E46C63', marginBottom: 12 }}>Get Involved</p>
            <h2 style={{ fontFamily: "'Arno Pro', serif", lineHeight: 1.1, marginBottom: 50, fontSize: 'clamp(30px, 4vw, 47px)' }}>Experience The Loop</h2>
            <p style={{ fontSize: 18, color: '#69757B', lineHeight: 1.8, marginBottom: 32 }}>
              At CACGM, we refer to the discipleship journey as the Transformational Loop. Become more like Jesus as you grow in faith.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {loopSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
                >
                  <div style={{ width: 12, height: 12, borderRadius: '50%', marginTop: 6, flexShrink: 0, background: step.color }} />
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: 15, color: '#222', margin: 0 }}>{step.title}</h4>
                    <p style={{ fontSize: 14, color: '#69757B', marginTop: 2 }}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STORIES - REAL YOUTUBE VIDEOS */}
      <section style={{ padding: '100px 0', background: '#3364A0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 50px' }}>
          <h2 style={{ color: '#fff', fontFamily: "'Arno Pro', serif", textAlign: 'center', marginBottom: 48, fontSize: 'clamp(28px, 4vw, 42px)' }}>Our Stories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {/* Featured story */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ background: '#fff', borderRadius: 15, overflow: 'hidden' }}
            >
              <div style={{ position: 'relative', paddingBottom: '75%', background: '#000' }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${stories[0].videoId}`}
                  title={stories[0].name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
              </div>
              <div style={{ padding: 24 }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#E46C63', marginBottom: 8 }}>{stories[0].tag}</p>
                <h3 style={{ fontFamily: "'Arno Pro', serif", fontSize: 24, color: '#222', lineHeight: 1.2, marginBottom: 8 }}>{stories[0].name}&apos;s Story</h3>
                <p style={{ fontSize: 15, color: '#69757B', lineHeight: 1.6 }}>{stories[0].quote}</p>
              </div>
            </motion.div>
            {/* Other stories */}
            {stories.slice(1).map((story, idx) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx + 1) * 0.1 }}
                style={{ background: '#fff', borderRadius: 15, overflow: 'hidden' }}
              >
                <div style={{ position: 'relative', paddingBottom: '56%', background: '#000' }}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${story.videoId}`}
                    title={story.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  />
                </div>
                <div style={{ padding: 20 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#E46C63', marginBottom: 8 }}>{story.tag}</p>
                  <h3 style={{ fontFamily: "'Gotham', sans-serif", fontWeight: 500, fontSize: 20, color: '#222', lineHeight: 1.4, marginBottom: 8 }}>{story.name}&apos;s Story</h3>
                  <p style={{ fontSize: 14, color: '#69757B', lineHeight: 1.6 }}>{story.quote}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 40px' }}>
          <h2 style={{ fontFamily: "'Arno Pro', serif", fontSize: 'clamp(36px, 5vw, 48px)', color: '#222', marginBottom: 16 }}>Ready to Get Started?</h2>
          <p style={{ fontSize: 18, color: '#69757B', lineHeight: 1.6, marginBottom: 40 }}>
            Join CACGM branches already using our platform to streamline their operations.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/login" style={{
              display: 'inline-block', padding: '19px 30px', fontSize: 14, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '1px', borderRadius: 3,
              background: '#E46C63', color: '#fff', textDecoration: 'none',
            }}>
              Open Dashboard
            </Link>
            <Link href="/contact" style={{
              display: 'inline-block', padding: '19px 30px', fontSize: 14, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '1px', borderRadius: 3,
              background: '#39A1B1', color: '#fff', textDecoration: 'none',
            }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
