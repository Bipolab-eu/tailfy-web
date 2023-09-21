import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function GET() {
  const { data } = await stripe.prices.list()

  return NextResponse.json(data)
}