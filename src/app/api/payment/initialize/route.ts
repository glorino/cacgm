import { NextResponse } from 'next/server';

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY || '';
const FLW_ENCRYPTION_KEY = process.env.FLW_ENCRYPTION_KEY || '';

export async function POST(request: Request) {
  try {
    const { amount, currency = 'NGN', email, name, phone, txRef } = await request.json();

    if (!amount || !email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, email, name' },
        { status: 400 }
      );
    }

    // Initialize Flutterwave payment
    const response = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tx_ref: txRef || `CACGM-${Date.now()}`,
        amount,
        currency,
        redirect_url: `${process.env.NEXTAUTH_URL}/dashboard/giving?status=successful`,
        customer: {
          email,
          name,
          phone_number: phone || '',
        },
        meta: {
          church: 'CACGM',
        },
        customizations: {
          title: 'Christ Apostolic Church of God Mission',
          description: 'Secure Church Giving',
          logo: '/logo.svg',
        },
      }),
    });

    const data = await response.json();

    if (data.status === 'success') {
      return NextResponse.json({
        status: 'success',
        data: {
          link: data.data.link,
          ref: data.data.tx_ref,
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
