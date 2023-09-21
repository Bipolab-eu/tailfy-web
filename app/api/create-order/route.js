import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request) {
  const { email, priceId, username } = await request.json()

  const response = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    customer: username,
    customer_email: email,
    success_url: 'http://localhost:3000',
    cancel_url: 'http://localhost:3000',
  })

  return NextResponse.json(response)
}