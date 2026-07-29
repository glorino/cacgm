import { NextResponse } from 'next/server';

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY || '';

export async function POST(request: Request) {
  try {
    const { amount, currency = 'NGN', email, name, phone, txRef } = await request.json();

    if (!amount || !email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, email, name' },
        { status: 400 }
      );
    }

    const reference = txRef || `CACGM-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const response = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tx_ref: reference,
        amount,
        currency,
        redirect_url: `${process.env.NEXTAUTH_URL || 'https://cacgm.vercel.app'}/give?status=successful&ref=${reference}`,
        customer: {
          email,
          name,
          phone_number: phone || '',
        },
        customizations: {
          title: 'Christ Apostolic Church of God Mission',
          description: `Church Giving - ${name}`,
          logo: 'https://cacgm.vercel.app/logo.png',
        },
      }),
    });

    const data = await response.json();

    if (data.status === 'success') {
      return NextResponse.json({
        status: 'success',
        data: {
          link: data.data.link,
          ref: reference,
        },
      });
    }

    return NextResponse.json(
      { error: 'Payment initialization failed', details: data.message },
      { status: 400 }
    );
  } catch (error) {
    console.error('Payment init error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
