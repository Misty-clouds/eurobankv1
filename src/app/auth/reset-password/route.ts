import { supabase } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { token, password } = await request.json();

  if (!token || !password) {
    return NextResponse.json(
      { error: 'Token and password are required.' },
      { status: 400 }
    );
  }

  // Set the session using the reset token
  const { data: session, error: sessionError } = await supabase.auth.setSession({
    access_token: token,
    refresh_token: token,
  });

  if (sessionError) {
    return NextResponse.json(
      { error: 'Invalid or expired reset token.' },
      { status: 400 }
    );
  }

  // Update the user's password
  const { error: updateError } = await supabase.auth.updateUser({
    password,
  });

  if (updateError) {
    return NextResponse.json(
      { error: updateError.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: 'Password reset successfully.' });
}
