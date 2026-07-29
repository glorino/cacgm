'use client';

import { motion } from 'framer-motion';
import { Play, Youtube, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const liveStreams = [
  { title: 'Sunday Worship Service', time: 'Sundays 8:00 AM & 10:30 AM', channel: 'CACGM Headquarters', url: 'https://www.youtube.com/@CACGM', live: true },
  { title: 'Midweek Service', time: 'Wednesdays 6:00 PM', channel: 'CACGM Headquarters', url: 'https://www.youtube.com/@CACGM', live: false },
  { title: 'Youth Service', time: 'Fridays 6:30 PM', channel: 'CACGM Youth', url: 'https://www.youtube.com/@CACGM', live: false },
];

const pastSermons = [
  { title: 'Walking in Faith', speaker: 'Pastor J.A. Adelaja', date: 'July 27, 2026', thumbnail: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&q=80' },
  { title: 'The Power of Prayer', speaker: 'Pastor F.O. Adeyemi', date: 'July 20, 2026', thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
  { title: 'Building Strong Families', speaker: 'Pastor T.O. Balogun', date: 'July 13, 2026', thumbnail: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&q=80' },
  { title: 'Youth Empowerment', speaker: 'Pastor E.A. Okafor', date: 'July 6, 2026', thumbnail: 'https://images.unsplash.com/photo-1529070538774-1f59b6a5d8f2?w=600&q=80' },
];

export default function WatchPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', paddingTop: 200, paddingBottom: 80, textAlign: 'center', background: '#1A374F' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#E46C63', marginBottom: 16 }}>Watch Online</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ color: '#fff', fontFamily: "'Arno Pro', serif", lineHeight: 1.2, marginBottom: 20, fontSize: 'clamp(40px, 7vw, 68px)' }}>
            Experience CACGM Live
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.8, maxWidth: 650, margin: '0 auto' }}>
            Join our live services from anywhere in the world. No login required.
          </motion.p>
        </div>
      </section>

      {/* Live Now Banner */}
      <section style={{ padding: '40px 0 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 50px' }}>
          <motion.a
            href="https://www.youtube.com/@CACGM"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '24px 32px', borderRadius: 15, textDecoration: 'none',
              background: 'linear-gradient(135deg, #dc2626, #b91c1c)', color: '#fff',
              boxShadow: '0 8px 30px rgba(220,38,38,0.3)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'pulse 2s infinite',
              }}>
                <Play size={20} fill="#fff" color="#fff" />
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, margin: 0, opacity: 0.8 }}>Live Now</p>
                <h3 style={{ fontSize: 20, fontWeight: 600, margin: '4px 0 0' }}>Sunday Worship Service</h3>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600 }}>
              <Youtube size={20} /> Watch Live <ExternalLink size={16} />
            </div>
          </motion.a>
        </div>
      </section>

      {/* Upcoming Streams */}
      <section style={{ padding: '60px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 50px' }}>
          <h2 style={{ fontSize: 28, fontFamily: "'Arno Pro', serif", color: '#222', marginBottom: 30 }}>Upcoming Live Streams</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {liveStreams.map((stream, i) => (
              <motion.div
                key={stream.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ padding: 24, borderRadius: 12, border: '1px solid #eee', background: '#fff' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  {stream.live && (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                      textTransform: 'uppercase', background: '#dc2626', color: '#fff',
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', animation: 'pulse 1.5s infinite' }} /> Live
                    </span>
                  )}
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>{stream.time}</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: '#222', marginBottom: 4 }}>{stream.title}</h3>
                <p style={{ fontSize: 13, color: '#69757B', marginBottom: 16 }}>{stream.channel}</p>
                <a
                  href={stream.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '10px 20px', borderRadius: 6, fontSize: 13, fontWeight: 600,
                    background: stream.live ? '#dc2626' : '#1A374F', color: '#fff',
                    textDecoration: 'none', transition: 'opacity .2s',
                  }}
                >
                  <Youtube size={16} /> {stream.live ? 'Watch Now' : 'Set Reminder'}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Sermons */}
      <section style={{ padding: '60px 0 100px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 50px' }}>
          <h2 style={{ fontSize: 28, fontFamily: "'Arno Pro', serif", color: '#222', marginBottom: 30 }}>Past Sermons</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {pastSermons.map((sermon, i) => (
              <motion.div
                key={sermon.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ borderRadius: 12, overflow: 'hidden', background: '#fff', border: '1px solid #eee' }}
              >
                <div style={{ position: 'relative', paddingBottom: '56%', background: '#1A374F' }}>
                  <img src={sermon.thumbnail} alt={sermon.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.3)',
                  }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.9)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    }}>
                      <Play size={18} fill="#1A374F" color="#1A374F" style={{ marginLeft: 2 }} />
                    </div>
                  </div>
                </div>
                <div style={{ padding: 16 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: '#222', marginBottom: 4 }}>{sermon.title}</h3>
                  <p style={{ fontSize: 12, color: '#69757B', margin: 0 }}>{sermon.speaker} &middot; {sermon.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
}
