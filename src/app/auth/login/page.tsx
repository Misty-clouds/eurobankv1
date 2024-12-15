'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
    } else {
      alert('Login successful!');
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-900 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-blue-900 py-2 rounded-md hover:bg-yellow-500 transition duration-300 font-semibold"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          <a href="/auth/signup" className="text-blue-700 hover:underline mr-4">
            Don't have an account? Sign Up
          </a>
          <a href="/auth/forgot-password" className="text-blue-700 hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
