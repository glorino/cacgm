import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const hash = crypto
      .createHmac('sha512', FLW_SECRET_KEY)
      .update(JSON.stringify(body))
      .digest('hex');

    const signature = request.headers.get('verif-hash');

    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const { event, data } = body;

    if (event === 'charge.completed') {
      const { tx_ref, flw_ref, amount, currency, status, customer } = data;

      if (status === 'successful') {
        console.log(`Payment successful: ${tx_ref}, Amount: ${amount} ${currency}`);

        // In production, update database:
        // await prisma.transaction.update({
        //   where: { txRef: tx_ref },
        //   data: {
        //     status: 'SUCCESSFUL',
        //     flwId: flw_ref,
        //   },
        // });
      } else {
        console.log(`Payment failed: ${tx_ref}`);

        // In production:
        // await prisma.transaction.update({
        //   where: { txRef: tx_ref },
        //   data: { status: 'FAILED' },
        // });
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
