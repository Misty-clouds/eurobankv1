'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const token = searchParams.get('token');
    if (!token) {
      setError('Invalid or missing reset token.');
      return;
    }

    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
    } else {
      setSuccess(true);
      setTimeout(() => router.push('/auth/login'), 3000); // Redirect to login after success
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      {success ? (
        <p>Your password has been reset successfully! Redirecting to login...</p>
      ) : (
        <form onSubmit={handleResetPassword}>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
}
