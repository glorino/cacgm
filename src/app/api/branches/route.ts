import { NextResponse } from 'next/server';
import { BRANCHES_DATA } from '@/lib/constants';

export async function GET() {
  return NextResponse.json(BRANCHES_DATA);
}
