import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc, #eef2ff 30%, #f0f9ff 60%)',
      padding: '40px 20px',
    }}>
      {children}
    </div>
  );
}
