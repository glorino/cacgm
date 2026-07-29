import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { user: { select: { name: true } }, branch: { select: { name: true } } },
    });

    return NextResponse.json(transactions.map((tx) => ({
      id: tx.id,
      name: tx.user.name,
      type: tx.type,
      amount: tx.amount,
      date: tx.createdAt.toISOString().split('T')[0],
      status: tx.status,
      ref: tx.txRef,
      branch: tx.branch.name,
    })));
  } catch {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, type, branchId, txRef } = body;

    if (!amount || !branchId) {
      return NextResponse.json({ error: 'amount and branchId are required' }, { status: 400 });
    }

    const users = await prisma.user.findMany({ take: 1 });
    const userId = users[0]?.id;

    if (!userId) {
      return NextResponse.json({ error: 'No users found' }, { status: 400 });
    }

    const tx = await prisma.transaction.create({
      data: {
        userId,
        branchId,
        amount: Number(amount),
        type: type || 'OFFERING',
        txRef: txRef || `CACGM-${Date.now()}`,
        status: 'SUCCESSFUL',
      },
    });

    return NextResponse.json(tx, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to create transaction' }, { status: 500 });
  }
}
