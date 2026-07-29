'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({ children, className = '', delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay,
      }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={`bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: ReactNode;
  delay?: number;
  gradient?: string;
}

const gradients = [
  'linear-gradient(135deg, #1e3a5f, #3b6ea0)',
  'linear-gradient(135deg, #E46C63, #f09090)',
  'linear-gradient(135deg, #39A1B1, #5bc0c9)',
  'linear-gradient(135deg, #3364A0, #5a8bc7)',
];

const iconBgs = ['#1e3a5f20', '#E46C6320', '#39A1B120', '#3364A020'];
const iconColors = ['#1e3a5f', '#E46C63', '#39A1B1', '#3364A0'];

export function MetricCard({ title, value, change, changeType = 'neutral', icon, delay = 0, gradient }: MetricCardProps) {
  const grad = gradient || gradients[Math.floor(delay * 10) % gradients.length];
  const idx = Math.floor(delay * 10) % gradients.length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay,
      }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      style={{
        background: grad,
        borderRadius: 16,
        padding: 24,
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
      }}
    >
      {/* Decorative circle */}
      <div style={{
        position: 'absolute', top: -20, right: -20,
        width: 100, height: 100, borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)',
      }} />
      <div style={{
        position: 'absolute', bottom: -30, left: -10,
        width: 60, height: 60, borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, fontWeight: 500, opacity: 0.85, margin: 0 }}>{title}</p>
          <p style={{ fontSize: 32, fontWeight: 700, margin: '8px 0 0', lineHeight: 1 }}>{value}</p>
          {change && (
            <p style={{
              fontSize: 12, marginTop: 8, fontWeight: 500,
              color: changeType === 'positive' ? '#a7f3d0' : changeType === 'negative' ? '#fca5a5' : 'rgba(255,255,255,0.7)',
            }}>
              {change}
            </p>
          )}
        </div>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: 'rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', flexShrink: 0,
        }}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
}

export function StaggerContainer({ children, className = '' }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 p-6 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-slate-200 rounded w-24" />
          <div className="h-8 bg-slate-200 rounded w-32" />
          <div className="h-3 bg-slate-200 rounded w-20" />
        </div>
        <div className="w-12 h-12 rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 p-6 animate-pulse">
      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-40" />
              <div className="h-3 bg-slate-200 rounded w-24" />
            </div>
            <div className="h-6 bg-slate-200 rounded w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
