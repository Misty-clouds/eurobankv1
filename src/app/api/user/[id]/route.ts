import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const userId = params.id;

  const { data: user, error } = await supabase
    .from('users')
    .select('total_dp, profit_balance')
    .eq('user_id', userId)
    .single();

  if (error || !user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ total_profit: user.total_dp, profit_balance: user.profit_balance });
}
