'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userRole] = useState('GENERAL_OVERSEER');
  const [userName] = useState('Pastor Adebayo Johnson');
  const [branchName] = useState('CACGM Headquarters');

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
