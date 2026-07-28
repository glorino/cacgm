'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Users, Church, Globe, ArrowRight, ChevronRight } from 'lucide-react';

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
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden" style={{ background: '#000' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1438032005730-c779502df39b?w=2000&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.75 }}
          />
          <div className="absolute top-0 left-0 right-0 h-[200px]" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0))' }} />
          <div className="absolute bottom-0 left-0 right-0" style={{ height: '100%', background: 'linear-gradient(180deg, rgba(0,0,0,0) 18.38%, rgba(0,0,0,0.6) 63.02%)', zIndex: 5 }} />
          <div className="absolute bottom-0 left-0 right-0" style={{ height: 350, opacity: 0.8, background: 'linear-gradient(180deg, rgba(0,0,0,0.0001) 0%, #000000 100%)', zIndex: 5 }} />
        </div>

        <div className="relative z-10 text-center max-w-[1280px] mx-auto px-8 pt-[28vh] pb-[60px]">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white leading-[1.25] font-['Arno_Pro',serif] font-normal"
            style={{ fontSize: 'clamp(38px, 7vw, 76px)', marginBottom: 50 }}
          >
            Inspiring people to follow Jesus and fearlessly change the world.
          </motion.h1>
        </div>

        {/* Experience Cards */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-[50px] pb-10">
          <h2 className="text-white text-center font-['Arno_Pro',serif] font-normal mb-[45px]" style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}>
            Ways to experience CACGM
          </h2>
          <div className="flex flex-col md:flex-row gap-[15px]">
            {experienceCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex-1 rounded-[15px] p-[30px] flex flex-col text-left"
                style={{ background: 'hsla(0,0%,100%,0.92)', backdropFilter: 'blur(20px)' }}
              >
                <h3 className="text-[20px] font-['Gotham',sans-serif] font-medium text-[#222] mb-2">{card.title}</h3>
                <p className="text-[15px] text-[#69757B] mb-[30px] leading-relaxed">{card.desc}</p>
                <div className="mt-auto">
                  <Link
                    href={card.href}
                    className="inline-block min-w-[170px] text-center px-[22px] py-[14px] text-[13px] font-bold uppercase tracking-[1px] rounded-[3px] transition-all duration-200"
                    style={{ border: '1px solid rgba(0,0,0,0.15)', color: '#222' }}
                  >
                    {card.link}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE LOOP ===== */}
      <section className="py-[100px]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-[50px] flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:order-1 w-full lg:w-[67%] flex justify-center">
            <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]">
              <div className="absolute inset-0 rounded-full" style={{ border: '1px dashed hsl(188,51%,66%)' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] rounded-full bg-white flex items-center justify-center z-10 shadow-lg">
                <div className="text-center">
                  <p className="text-[11px] font-bold uppercase tracking-[2px] text-[#69757B] mb-1">The</p>
                  <h2 className="font-['Arno_Pro',serif] text-[42px] md:text-[50px] leading-none text-[#222]">Loop</h2>
                </div>
              </div>
              {loopSteps.map((step, i) => {
                const angle = (i * 90 - 90) * (Math.PI / 180);
                const radius = 42;
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                return (
                  <div
                    key={step.title}
                    className="absolute w-4 h-4 rounded-full z-20"
                    style={{ background: step.color, left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  />
                );
              })}
            </div>
          </div>

          <div className="lg:order-2 lg:w-[40%]">
            <p className="text-[12px] font-bold uppercase tracking-[2px] text-[#E46C63] mb-3">Get Involved</p>
            <h2 className="font-['Arno_Pro',serif] leading-[1.1] mb-[30px] md:mb-[50px]" style={{ fontSize: 'clamp(30px, 4vw, 47px)' }}>
              Experience The Loop
            </h2>
            <p className="text-[18px] text-[#69757B] leading-[1.8] mb-8">
              At CACGM, we refer to the discipleship journey as the Transformational Loop. Become more like Jesus as you grow in faith.
            </p>
            <div className="space-y-4">
              {loopSteps.map((step) => (
                <div key={step.title} className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0" style={{ background: step.color }} />
                  <div>
                    <h4 className="font-bold text-[15px] text-[#222]">{step.title}</h4>
                    <p className="text-[14px] text-[#69757B] mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== STORIES ===== */}
      <section className="py-[85px] lg:py-[100px]" style={{ background: '#3364A0' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-[50px]">
          <h2 className="text-white font-['Arno_Pro',serif] text-center mb-14" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>Our Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-white rounded-[15px] overflow-hidden">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-200 to-slate-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#E46C63"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[11px] font-bold uppercase tracking-[1px] text-[#E46C63] mb-2">{stories[0].tag}</p>
                <h3 className="font-['Arno_Pro',serif] text-[24px] text-[#222] leading-[1.2] mb-2">{stories[0].name}&apos;s Story</h3>
                <p className="text-[15px] text-[#69757B] leading-relaxed">{stories[0].quote}</p>
              </div>
            </div>
            {stories.slice(1).map((story) => (
              <div key={story.name} className="bg-white rounded-[15px] overflow-hidden">
                <div className="relative aspect-[16/9] bg-gradient-to-br from-slate-200 to-slate-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#E46C63"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[1px] text-[#E46C63] mb-2">{story.tag}</p>
                  <h3 className="font-['Gotham',sans-serif] font-medium text-[20px] text-[#222] leading-[1.4] mb-2">{story.name}&apos;s Story</h3>
                  <p className="text-[14px] text-[#69757B] leading-relaxed">{story.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-[100px] text-center">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="font-['Arno_Pro',serif] text-[36px] md:text-[48px] text-[#222] mb-4">Ready to Get Started?</h2>
          <p className="text-[18px] text-[#69757B] leading-relaxed mb-10">
            Join CACGM branches already using our platform to streamline their operations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/dashboard" className="inline-block px-[30px] py-[19px] text-[14px] font-bold uppercase tracking-[1px] rounded-[3px] transition-all duration-200" style={{ background: '#E46C63', color: '#fff' }}>
              Open Dashboard
            </Link>
            <Link href="/contact" className="inline-block px-[30px] py-[19px] text-[14px] font-bold uppercase tracking-[1px] rounded-[3px] transition-all duration-200" style={{ background: '#39A1B1', color: '#fff' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
