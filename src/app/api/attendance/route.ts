import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const records = await prisma.attendance.findMany({
      orderBy: { date: 'desc' },
      take: 50,
      include: { branch: { select: { name: true } } },
    });
    return NextResponse.json(records);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { branchId, date, serviceType, maleCount, femaleCount, childrenCount } = body;

    if (!branchId || !date || !serviceType) {
      return NextResponse.json({ error: 'branchId, date, and serviceType are required' }, { status: 400 });
    }

    const totalCount = (maleCount || 0) + (femaleCount || 0) + (childrenCount || 0);

    const record = await prisma.attendance.upsert({
      where: {
        branchId_date_serviceType: {
          branchId,
          date: new Date(date),
          serviceType,
        },
      },
      update: { maleCount, femaleCount, childrenCount, totalCount },
      create: { branchId, date: new Date(date), serviceType, maleCount, femaleCount, childrenCount, totalCount },
    });

    return NextResponse.json(record, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to save attendance' }, { status: 500 });
  }
}
