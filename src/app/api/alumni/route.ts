import { NextResponse } from 'next/server';
import { getAlumni } from '@/actions/alumni-actions';

export async function GET() {
  try {
    const result = await getAlumni();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in alumni API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch alumni' },
      { status: 500 }
    );
  }
}