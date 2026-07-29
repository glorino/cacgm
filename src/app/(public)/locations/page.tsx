'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { BRANCHES_DATA } from '@/lib/constants';

declare global {
  interface Window {
    google: typeof google;
    initLocationsMap?: () => void;
  }
}

export default function LocationsPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const loadMap = () => {
      if (typeof window !== 'undefined' && window.google && window.google.maps) {
        initMap();
        return;
      }

      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initLocationsMap`;
      script.async = true;
      script.defer = true;
      window.initLocationsMap = initMap;
      document.head.appendChild(script);
    };

    const initMap = () => {
      if (!mapRef.current || mapInstanceRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 6.5244, lng: 3.3792 },
        zoom: 11,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        styles: [
          { featureType: 'poi', stylers: [{ visibility: 'off' }] },
          { featureType: 'transit', stylers: [{ visibility: 'off' }] },
        ],
      });

      mapInstanceRef.current = map;

      BRANCHES_DATA.forEach((branch) => {
        const marker = new google.maps.Marker({
          map,
          position: { lat: branch.latitude, lng: branch.longitude },
          title: branch.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#1e3a5f',
            fillOpacity: 1,
            strokeColor: '#E46C63',
            strokeWeight: 3,
          },
          label: {
            text: 'CA',
            color: '#ffffff',
            fontSize: '9px',
            fontWeight: 'bold',
          },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding:8px;font-family:sans-serif;">
              <h3 style="margin:0 0 4px;font-size:14px;font-weight:600;">${branch.name}</h3>
              <p style="margin:0 0 4px;font-size:12px;color:#666;">${branch.address}</p>
              <p style="margin:0;font-size:12px;color:#E46C63;">Pastor: ${branch.pastorName}</p>
            </div>
          `,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    };

    loadMap();
  }, []);

  return (
    <>
      <section style={{ position: 'relative', paddingTop: 200, paddingBottom: 100, textAlign: 'center', background: '#1A374F' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#E46C63', marginBottom: 16 }}>Our Locations</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ color: '#fff', fontFamily: "'Arno Pro', serif", lineHeight: 1.2, marginBottom: 20, fontSize: 'clamp(40px, 7vw, 68px)' }}>
            Find a Congregation
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.8, maxWidth: 650, margin: '0 auto' }}>
            We have 6 branches across Lagos. Visit any location for worship and fellowship.
          </motion.p>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ padding: '60px 0 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 50px' }}>
          <div ref={mapRef} style={{ width: '100%', height: 400, borderRadius: 15, overflow: 'hidden', border: '1px solid #e2e8f0' }} />
        </div>
      </section>

      {/* Branch Cards */}
      <section style={{ padding: '60px 0 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 50px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30 }}>
            {branches.map((branch, i) => (
              <motion.div key={branch.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ padding: 35, background: '#fff', borderRadius: 15, border: '1px solid #f0f0f0', transition: 'box-shadow .3s, transform .3s', cursor: 'default' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: '#1A374F', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <MapPin size={22} color="#E46C63" />
                </div>
                <h3 style={{ fontSize: 20, fontFamily: "'Gotham', sans-serif", fontWeight: 500, color: '#222', marginBottom: 20 }}>{branch.name}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <MapPin size={16} style={{ color: '#39A1B1', marginTop: 2, flexShrink: 0 }} />
                    <p style={{ fontSize: 15, color: '#69757B', margin: 0 }}>{branch.address}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Clock size={16} style={{ color: '#E46C63', flexShrink: 0 }} />
                    <p style={{ fontSize: 15, fontWeight: 500, color: '#1A374F', margin: 0 }}>{branch.time}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Phone size={16} style={{ color: '#39A1B1', flexShrink: 0 }} />
                    <p style={{ fontSize: 15, color: '#69757B', margin: 0 }}>{branch.phone}</p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    marginTop: 24, padding: '12px 20px', borderRadius: 3,
                    background: '#1A374F', color: '#fff', textDecoration: 'none',
                    fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px',
                    transition: 'opacity .2s',
                  }}
                >
                  <Navigation size={16} />
                  Get Directions
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const branches = [
  { name: 'Headquarters', address: '12 Allen Avenue, Ikeja, Lagos', time: 'Sundays 8:00 & 10:30 AM', phone: '+234 801 234 5678' },
  { name: 'Surulere', address: '45 Bode Thomas Street, Surulere', time: 'Sundays 9:00 AM', phone: '+234 801 234 5679' },
  { name: 'Yaba', address: '78 Herbert Macaulay Way, Yaba', time: 'Sundays 9:00 AM', phone: '+234 801 234 5680' },
  { name: 'Ikeja GRA', address: '23 Oba Akran Avenue, Ikeja GRA', time: 'Sundays 9:00 AM', phone: '+234 801 234 5681' },
  { name: 'Lekki', address: '15 Admiralty Way, Lekki Phase 1', time: 'Sundays 9:00 AM', phone: '+234 801 234 5682' },
  { name: 'Ikorodu', address: '33 Benson Street, Ikorodu', time: 'Sundays 9:00 AM', phone: '+234 801 234 5683' },
];
