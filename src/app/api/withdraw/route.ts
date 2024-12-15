import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function POST(request: Request) {
  const { user_id, amount } = await request.json();

  // Validate inputs
  if (!user_id || !amount || amount <= 0) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  // Fetch user data
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('total_dp, amount_withdrawn, profit_balance')
    .eq('user_id', user_id)
    .single();

  if (userError || !user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const { total_dp, amount_withdrawn, profit_balance } = user;

  // Check if withdrawal is allowed
  if (total_dp <= profit_balance) {
    return NextResponse.json({ error: 'Insufficient withdrawal balance' }, { status: 400 });
  }

  // Update user table with new withdrawal
  const newAmountWithdrawn = amount_withdrawn + amount;

  const { error: updateError } = await supabase
    .from('users')
    .update({ amount_withdrawn: newAmountWithdrawn })
    .eq('user_id', user_id);

  if (updateError) {
    return NextResponse.json({ error: 'Failed to update user data' }, { status: 500 });
  }

  // Insert withdrawal details into the withdrawal_queue table
  const { error: insertError } = await supabase
    .from('withdrawal_queue')
    .insert([{ user_id, amount }]);

  if (insertError) {
    return NextResponse.json({ error: 'Failed to add withdrawal request' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Withdrawal request processed successfully' });
}
