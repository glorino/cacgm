'use client';

import { useSession } from 'next-auth/react';

export function useUser() {
  const { data: session } = useSession();
  const user = session?.user as any;
  return {
    userRole: user?.role || 'MEMBER',
    userName: user?.name || 'User',
    branchId: user?.branchId || '',
    email: user?.email || '',
  };
}
