export type UserRole =
  | 'GENERAL_OVERSEER'
  | 'BRANCH_PASTOR'
  | 'ACCOUNTANT'
  | 'HEAD_USHER'
  | 'MEN_PRESIDENT'
  | 'WOMEN_PRESIDENT'
  | 'YOUTH_PRESIDENT'
  | 'MEMBER';

export type Permission =
  | 'dashboard:view'
  | 'members:view'
  | 'members:create'
  | 'members:edit'
  | 'members:delete'
  | 'attendance:view'
  | 'attendance:create'
  | 'attendance:edit'
  | 'giving:view'
  | 'giving:create'
  | 'transactions:view'
  | 'transactions:create'
  | 'departments:view'
  | 'departments:edit'
  | 'analytics:view'
  | 'settings:view'
  | 'settings:edit'
  | 'branches:view';

const rolePermissions: Record<UserRole, Permission[]> = {
  GENERAL_OVERSEER: [
    'dashboard:view', 'members:view', 'members:create', 'members:edit', 'members:delete',
    'attendance:view', 'attendance:create', 'attendance:edit',
    'giving:view', 'giving:create', 'transactions:view', 'transactions:create',
    'departments:view', 'departments:edit', 'analytics:view',
    'settings:view', 'settings:edit', 'branches:view',
  ],
  BRANCH_PASTOR: [
    'dashboard:view', 'members:view', 'members:create', 'members:edit',
    'attendance:view', 'attendance:create', 'attendance:edit',
    'giving:view', 'giving:create', 'transactions:view',
    'departments:view', 'departments:edit', 'analytics:view',
    'settings:view', 'settings:edit', 'branches:view',
  ],
  ACCOUNTANT: [
    'dashboard:view', 'members:view',
    'giving:view', 'giving:create', 'transactions:view', 'transactions:create',
    'analytics:view', 'branches:view',
  ],
  HEAD_USHER: [
    'dashboard:view', 'members:view',
    'attendance:view', 'attendance:create', 'attendance:edit',
    'branches:view',
  ],
  MEN_PRESIDENT: [
    'dashboard:view', 'members:view', 'members:create',
    'attendance:view', 'giving:view',
    'departments:view', 'departments:edit',
    'branches:view',
  ],
  WOMEN_PRESIDENT: [
    'dashboard:view', 'members:view', 'members:create',
    'attendance:view', 'giving:view',
    'departments:view', 'departments:edit',
    'branches:view',
  ],
  YOUTH_PRESIDENT: [
    'dashboard:view', 'members:view', 'members:create',
    'attendance:view', 'giving:view',
    'departments:view', 'departments:edit',
    'branches:view',
  ],
  MEMBER: [
    'dashboard:view', 'giving:view', 'branches:view',
  ],
};

export function hasPermission(role: string, permission: Permission): boolean {
  const userRole = role as UserRole;
  const perms = rolePermissions[userRole];
  if (!perms) return false;
  return perms.includes(permission);
}

export function hasAnyPermission(role: string, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p));
}

export function getRolePermissions(role: string): Permission[] {
  return rolePermissions[role as UserRole] || [];
}

export function getRoleDashboardTitle(role: string): string {
  const titles: Record<string, string> = {
    GENERAL_OVERSEER: 'General Overseer Dashboard',
    BRANCH_PASTOR: 'Branch Pastor Dashboard',
    ACCOUNTANT: 'Accountant Dashboard',
    HEAD_USHER: 'Head Usher Dashboard',
    MEN_PRESIDENT: "Men's Fellowship Dashboard",
    WOMEN_PRESIDENT: "Women's Ministry Dashboard",
    YOUTH_PRESIDENT: 'Youth Department Dashboard',
    MEMBER: 'Member Dashboard',
  };
  return titles[role] || 'Dashboard';
}

export function getRoleSubtitle(role: string): string {
  const subtitles: Record<string, string> = {
    GENERAL_OVERSEER: 'Full access across all branches',
    BRANCH_PASTOR: 'Manage your branch operations',
    ACCOUNTANT: 'Financial management and reporting',
    HEAD_USHER: 'Track and manage service attendance',
    MEN_PRESIDENT: "Lead and organize Men's Fellowship",
    WOMEN_PRESIDENT: "Lead and organize Women's Ministry",
    YOUTH_PRESIDENT: 'Lead and organize Youth Department',
    MEMBER: 'Welcome to CACGM',
  };
  return subtitles[role] || 'Church management';
}
