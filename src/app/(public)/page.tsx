'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const experienceCards = [
  { title: 'Find a Congregation', desc: 'We gather together for services each weekend', link: 'Locations', href: '/locations' },
  { title: 'Youth Ministry', desc: 'For young people ages 13-18', link: 'Learn More', href: '/ministries' },
  { title: 'Hosted Here', desc: 'Partner churches under CACGM', link: 'Learn More', href: '/about' },
  { title: 'Online', desc: 'Experience CACGM from anywhere', link: 'Learn More', href: '/dashboard' },
];

const loopSteps = [
  { title: 'Follow Jesus', desc: 'Begin your faith journey with Christ and commit your life to Him.', color: '#3364A0' },
  { title: 'Grow Together', desc: 'Connect in community through small groups and fellowship.', color: '#9EC73F' },
  { title: 'Serve One Another', desc: 'Use your unique gifts to serve the church and bless others.', color: '#39A1B1' },
  { title: 'Change The World', desc: 'Impact lives through outreach, missions, and acts of love.', color: '#E46C63' },
];

const stories = [
  { name: 'Sarah', quote: 'CACGM changed my life. I found purpose and community here.', tag: 'Testimony' },
  { name: 'David', quote: 'God transformed my family through the ministry at this church.', tag: 'Testimony' },
  { name: 'Grace', quote: 'I went from being lost to leading a department. Only God!', tag: 'Testimony' },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#000' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1438032005730-c779502df39b?w=2000&q=80"
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }}
          />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0))' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100%', background: 'linear-gradient(180deg, rgba(0,0,0,0) 18%, rgba(0,0,0,0.6) 63%)', zIndex: 5 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 350, opacity: 0.8, background: 'linear-gradient(180deg, rgba(0,0,0,0.0001) 0%, #000 100%)', zIndex: 5 }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 1280, margin: '0 auto', padding: '28vh 40px 60px' }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ color: '#fff', lineHeight: 1.25, fontFamily: "'Arno Pro', serif", fontWeight: 400, fontSize: 'clamp(38px, 7vw, 76px)', marginBottom: 50 }}
          >
            Inspiring people to follow Jesus and fearlessly change the world.
          </motion.h1>
        </div>

        {/* Experience Cards */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1400, margin: '0 auto', padding: '0 50px 40px' }}>
          <h2 style={{ color: '#fff', textAlign: 'center', fontFamily: "'Arno Pro', serif", fontWeight: 400, marginBottom: 45, fontSize: 'clamp(24px, 3vw, 38px)' }}>
            Ways to experience CACGM
          </h2>
          <div style={{ display: 'flex', gap: 15 }}>
            {experienceCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                style={{
                  flex: 1, borderRadius: 15, padding: 30, display: 'flex', flexDirection: 'column', textAlign: 'left',
                  background: 'hsla(0,0%,100%,0.92)', backdropFilter: 'blur(20px)',
                }}
              >
                <h3 style={{ fontSize: 20, fontFamily: "'Gotham', sans-serif", fontWeight: 500, color: '#222', marginBottom: 8 }}>{card.title}</h3>
                <p style={{ fontSize: 15, color: '#69757B', marginBottom: 30, lineHeight: 1.6 }}>{card.desc}</p>
                <div style={{ marginTop: 'auto' }}>
                  <Link href={card.href} style={{
                    display: 'inline-block', minWidth: 170, textAlign: 'center', padding: '14px 22px',
                    fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px',
                    borderRadius: 3, border: '1px solid rgba(0,0,0,0.15)', color: '#222', textDecoration: 'none',
                  }}>
                    {card.link}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THE LOOP */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 50px', display: 'flex', alignItems: 'center', gap: 64, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 60%', minWidth: 320, display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 500, height: 500 }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px dashed hsl(188,51%,66%)' }} />
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                width: '55%', height: '55%', borderRadius: '50%', background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#69757B', marginBottom: 4 }}>The</p>
                  <h2 style={{ fontFamily: "'Arno Pro', serif", fontSize: 50, lineHeight: 1, color: '#222' }}>Loop</h2>
                </div>
              </div>
              {loopSteps.map((step, i) => {
                const angle = (i * 90 - 90) * (Math.PI / 180);
                const radius = 42;
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                return (
                  <div key={step.title} style={{
                    position: 'absolute', width: 16, height: 16, borderRadius: '50%',
                    background: step.color, left: `${x}%`, top: `${y}%`,
                    transform: 'translate(-50%,-50%)', zIndex: 20,
                  }} />
                );
              })}
            </div>
          </div>

          <div style={{ flex: '1 1 35%', minWidth: 280 }}>
            <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#E46C63', marginBottom: 12 }}>Get Involved</p>
            <h2 style={{ fontFamily: "'Arno Pro', serif", lineHeight: 1.1, marginBottom: 50, fontSize: 'clamp(30px, 4vw, 47px)' }}>Experience The Loop</h2>
            <p style={{ fontSize: 18, color: '#69757B', lineHeight: 1.8, marginBottom: 32 }}>
              At CACGM, we refer to the discipleship journey as the Transformational Loop. Become more like Jesus as you grow in faith.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {loopSteps.map((step) => (
                <div key={step.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', marginTop: 6, flexShrink: 0, background: step.color }} />
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: 15, color: '#222', margin: 0 }}>{step.title}</h4>
                    <p style={{ fontSize: 14, color: '#69757B', marginTop: 2 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section style={{ padding: '100px 0', background: '#3364A0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 50px' }}>
          <h2 style={{ color: '#fff', fontFamily: "'Arno Pro', serif", textAlign: 'center', marginBottom: 48, fontSize: 'clamp(28px, 4vw, 42px)' }}>Our Stories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            <div style={{ background: '#fff', borderRadius: 15, overflow: 'hidden' }}>
              <div style={{ position: 'relative', paddingBottom: '75%', background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#E46C63"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#E46C63', marginBottom: 8 }}>{stories[0].tag}</p>
                <h3 style={{ fontFamily: "'Arno Pro', serif", fontSize: 24, color: '#222', lineHeight: 1.2, marginBottom: 8 }}>{stories[0].name}&apos;s Story</h3>
                <p style={{ fontSize: 15, color: '#69757B', lineHeight: 1.6 }}>{stories[0].quote}</p>
              </div>
            </div>
            {stories.slice(1).map((story) => (
              <div key={story.name} style={{ background: '#fff', borderRadius: 15, overflow: 'hidden' }}>
                <div style={{ position: 'relative', paddingBottom: '56%', background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)' }}>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#E46C63"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                  </div>
                </div>
                <div style={{ padding: 20 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#E46C63', marginBottom: 8 }}>{story.tag}</p>
                  <h3 style={{ fontFamily: "'Gotham', sans-serif", fontWeight: 500, fontSize: 20, color: '#222', lineHeight: 1.4, marginBottom: 8 }}>{story.name}&apos;s Story</h3>
                  <p style={{ fontSize: 14, color: '#69757B', lineHeight: 1.6 }}>{story.quote}</p>
                </div>
              </div>
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
            <Link href="/dashboard" style={{
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
