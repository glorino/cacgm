import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { logAudit } from '@/lib/audit';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const member = await prisma.user.findUnique({
      where: { id: params.id },
      include: { branch: true, department: true, transactions: true },
    });
    if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(member);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch member' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { name, email, phone, branchId, departmentId, role } = await req.json();
    const old = await prisma.user.findUnique({ where: { id: params.id } });
    const member = await prisma.user.update({
      where: { id: params.id },
      data: { name, email, phone, branchId, departmentId, role },
      include: { branch: true, department: true },
    });
    logAudit({ action: 'UPDATE', entity: 'User', entityId: params.id, oldData: old ? { name: old.name, email: old.email, phone: old.phone } : undefined, newData: { name, email, phone, branchId, departmentId } });
    return NextResponse.json(member);
  } catch (e: any) {
    if (e?.code === 'P2002') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to update member' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const old = await prisma.user.findUnique({ where: { id: params.id } });
    await prisma.user.delete({ where: { id: params.id } });
    logAudit({ action: 'DELETE', entity: 'User', entityId: params.id, oldData: old ? { name: old.name, email: old.email } : undefined });
    return NextResponse.json({ message: 'Member deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 });
  }
}
