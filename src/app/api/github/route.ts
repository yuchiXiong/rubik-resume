import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth-config"
import { getRepoInfo } from '@/services/github/api';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

const headers = {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
  'Content-Type': 'application/json',
};

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.accessToken) {
      console.log('No valid session found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers });
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'getRepoInfo':
        const repoInfo = await getRepoInfo(session.accessToken);
        return NextResponse.json(repoInfo, { headers });
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400, headers });
    }
  } catch (error) {
    console.error('Error in /api/github GET:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500, headers });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500, headers });
  }
}