import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const branchId = searchParams.get('branchId');
    const search = searchParams.get('search');
    const departmentId = searchParams.get('departmentId');

    const where: any = { role: 'MEMBER' };
    if (branchId) where.branchId = branchId;
    if (departmentId) where.departmentId = departmentId;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const members = await prisma.user.findMany({
      where,
      include: { branch: true, department: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(members);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, phone, branchId, departmentId, role } = await req.json();
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const bcrypt = await import('bcryptjs');
    const defaultPassword = await bcrypt.hash('password123', 12);

    const member = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        branchId,
        departmentId,
        role: role || 'MEMBER',
        password: defaultPassword,
      },
      include: { branch: true, department: true },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (e: any) {
    if (e?.code === 'P2002') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 });
  }
}
