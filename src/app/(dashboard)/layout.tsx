'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen bg-[#f8fafc] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  const user = session?.user as any;
  const userRole = user?.role || 'MEMBER';
  const userName = user?.name || 'User';
  const branchName = user?.branchId || '';

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar userRole={userRole} userName={userName} branchName={branchName} />
      <main className="flex-1 min-h-screen lg:ml-0">
        <div className="p-5 sm:p-6 lg:p-8 pt-16 lg:pt-8 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
