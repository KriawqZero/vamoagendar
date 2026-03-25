import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ error: 'Endpoint deprecated. Authentication is handled natively by Supabase SSR.' }, { status: 404 });
}

export async function POST() {
  return NextResponse.json({ error: 'Endpoint deprecated. Authentication is handled natively by Supabase SSR.' }, { status: 404 });
}
