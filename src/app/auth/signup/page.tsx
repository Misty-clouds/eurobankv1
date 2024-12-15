'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralId, setReferralId] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, referralId }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="referralId" className="block text-sm font-medium mb-2">
              Referral ID (optional)
            </label>
            <input
              id="referralId"
              type="text"
              placeholder="Enter referral ID"
              value={referralId}
              onChange={(e) => setReferralId(e.target.value)}
              className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-2 rounded-md hover:bg-yellow-500 transition duration-300 font-semibold"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          <Link href="/auth/login" className="text-[hsl(var(--foreground))] hover:underline mr-4">
            Already have an account? Sign In
          </Link>
          <Link href="/auth/forgot-password" className="text-[hsl(var(--foreground))] hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
