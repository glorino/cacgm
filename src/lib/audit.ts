import prisma from './prisma';

interface AuditLogParams {
  userId?: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'EXPORT';
  entity: string;
  entityId?: string;
  oldData?: Record<string, any>;
  newData?: Record<string, any>;
  ipAddress?: string;
}

export async function logAudit({ userId, action, entity, entityId, oldData, newData, ipAddress }: AuditLogParams) {
  try {
    await prisma.auditLog.create({
      data: { userId, action, entity, entityId, oldData, newData, ipAddress },
    });
  } catch {
    // Silently fail - audit logging should never break the main flow
  }
}

export async function getAuditLogs(options: {
  entity?: string;
  userId?: string;
  limit?: number;
  offset?: number;
} = {}) {
  const { entity, userId, limit = 50, offset = 0 } = options;
  const where: any = {};
  if (entity) where.entity = entity;
  if (userId) where.userId = userId;

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    }),
    prisma.auditLog.count({ where }),
  ]);

  return { logs, total };
}
