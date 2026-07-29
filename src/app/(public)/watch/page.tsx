'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, MonitorPlay, ExternalLink } from 'lucide-react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

const liveStreams = [
  { title: 'Sunday Worship Service', time: 'Sundays 8:00 AM & 10:30 AM', channel: 'CACGM Global', url: 'https://www.youtube.com/@CacgmGlobal', live: true },
  { title: 'Midweek Service', time: 'Wednesdays 6:00 PM', channel: 'CACGM Global', url: 'https://www.youtube.com/@CacgmGlobal', live: false },
  { title: 'Youth Service', time: 'Fridays 6:30 PM', channel: 'CACGM Global', url: 'https://www.youtube.com/@CacgmGlobal', live: false },
];

const pastSermons = [
  { title: 'Triumphant Half-Hour: Power of Resurrection', speaker: 'Apostle Dr. Matthew Ogbonmwan', date: 'April 2026', thumbnail: 'https://i.ytimg.com/vi/4RbO59Ad5do/maxresdefault.jpg', videoId: '4RbO59Ad5do' },
  { title: 'God Is Our Refuge', speaker: 'Apostle Dr. Matthew Ogbonmwan', date: 'February 2026', thumbnail: 'https://i.ytimg.com/vi/fOkbgRVN4lc/maxresdefault.jpg', videoId: 'fOkbgRVN4lc' },
  { title: 'Triumphant Half-Hour: Redemption', speaker: 'Apostle Dr. Matthew Ogbonmwan', date: 'January 2026', thumbnail: 'https://i.ytimg.com/vi/BOYyxkstHUc/maxresdefault.jpg', videoId: 'BOYyxkstHUc' },
  { title: 'Christ Our Refuge', speaker: 'Apostle Dr. Matthew Ogbonmwan', date: 'January 2026', thumbnail: 'https://i.ytimg.com/vi/1-u4hWayX2s/maxresdefault.jpg', videoId: '1-u4hWayX2s' },
];

export default function WatchPage() {
  const isMobile = useIsMobile();
  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', paddingTop: isMobile ? 120 : 200, paddingBottom: isMobile ? 50 : 80, textAlign: 'center', background: '#1A374F' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: isMobile ? '0 20px' : '0 40px' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#E46C63', marginBottom: 16 }}>Watch Online</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ color: '#fff', fontFamily: "'Arno Pro', serif", lineHeight: 1.2, marginBottom: 20, fontSize: isMobile ? '32px' : 'clamp(40px, 7vw, 68px)' }}>
            Experience CACGM Live
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'rgba(255,255,255,0.6)', fontSize: isMobile ? 16 : 18, lineHeight: 1.8, maxWidth: 650, margin: '0 auto' }}>
            Join our live services from anywhere in the world. No login required.
          </motion.p>
        </div>
      </section>

      {/* Live Now Banner */}
      <section style={{ padding: isMobile ? '24px 16px 0' : '40px 0 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0' : '0 50px' }}>
          <motion.a
            href="https://www.youtube.com/@CacgmGlobal/videos"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: isMobile ? 'flex-start' : 'space-between',
              padding: isMobile ? '18px 16px' : '24px 32px', borderRadius: 15, textDecoration: 'none',
              background: 'linear-gradient(135deg, #dc2626, #b91c1c)', color: '#fff',
              boxShadow: '0 8px 30px rgba(220,38,38,0.3)', flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 14 : 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'pulse 2s infinite',
              }}>
                <Play size={18} fill="#fff" color="#fff" />
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, margin: 0, opacity: 0.8 }}>Live Now</p>
                <h3 style={{ fontSize: isMobile ? 17 : 20, fontWeight: 600, margin: '4px 0 0' }}>Sunday Worship Service</h3>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600 }}>
              <MonitorPlay size={16} /> Watch Live <ExternalLink size={14} />
            </div>
          </motion.a>
        </div>
      </section>

      {/* Upcoming Streams */}
      <section style={{ padding: isMobile ? '36px 16px' : '60px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? 22 : 28, fontFamily: "'Arno Pro', serif", color: '#222', marginBottom: isMobile ? 20 : 30 }}>{isMobile ? 'Upcoming Streams' : 'Upcoming Live Streams'}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 12 : 20 }}>
            {liveStreams.map((stream, i) => (
              <motion.div
                key={stream.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ padding: isMobile ? 18 : 24, borderRadius: 12, border: '1px solid #eee', background: '#fff' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
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
                <h3 style={{ fontSize: isMobile ? 15 : 17, fontWeight: 600, color: '#222', marginBottom: 4 }}>{stream.title}</h3>
                <p style={{ fontSize: 13, color: '#69757B', marginBottom: 14 }}>{stream.channel}</p>
                <a
                  href={stream.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '10px 18px', borderRadius: 6, fontSize: 13, fontWeight: 600,
                    background: stream.live ? '#dc2626' : '#1A374F', color: '#fff',
                    textDecoration: 'none', transition: 'opacity .2s',
                  }}
                >
                  <MonitorPlay size={16} /> {stream.live ? 'Watch Now' : 'Set Reminder'}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Sermons */}
      <section style={{ padding: isMobile ? '36px 16px 60px' : '60px 0 100px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? 22 : 28, fontFamily: "'Arno Pro', serif", color: '#222', marginBottom: isMobile ? 20 : 30 }}>Past Sermons</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 12 : 20 }}>
            {pastSermons.map((sermon, i) => (
              <motion.a
                key={sermon.title}
                href={`https://www.youtube.com/watch?v=${sermon.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ borderRadius: 12, overflow: 'hidden', background: '#fff', border: '1px solid #eee', textDecoration: 'none', display: 'block' }}
              >
                <div style={{ position: 'relative', paddingBottom: '56%', background: '#1A374F' }}>
                  <img src={sermon.thumbnail} alt={sermon.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.3)',
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.9)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    }}>
                      <Play size={16} fill="#1A374F" color="#1A374F" style={{ marginLeft: 2 }} />
                    </div>
                  </div>
                </div>
                <div style={{ padding: isMobile ? 12 : 16 }}>
                  <h3 style={{ fontSize: isMobile ? 13 : 15, fontWeight: 600, color: '#222', marginBottom: 4 }}>{sermon.title}</h3>
                  <p style={{ fontSize: isMobile ? 11 : 12, color: '#69757B', margin: 0 }}>{sermon.speaker} &middot; {sermon.date}</p>
                </div>
              </motion.a>
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
