'use client';

import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      {success ? (
        <p>A password reset email has been sent! Please check your inbox.</p>
      ) : (
        <form onSubmit={handleForgotPassword}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Send Reset Link</button>
        </form>
      )}
    </div>
  );
}
