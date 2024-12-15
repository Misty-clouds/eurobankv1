'use client';

import { useState, useEffect } from 'react';
import { useCurrentUser } from '@/lib/auth/useCurrentUser';

export default function WithdrawalForm() {
  const user = useCurrentUser();
  const [amount, setAmount] = useState<number>(0);
  const [totalProfit, setTotalProfit] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchUserProfit = async () => {
    if (!user?.id) return;

    const response = await fetch(`/api/user/${user.id}`);
    const data = await response.json();

    if (data.error) {
      setError(data.error);
    } else {
      setTotalProfit(data.total_profit);
    }
  };

  useEffect(() => {
    if (user?.id) fetchUserProfit();
  }, [user]);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || amount <= 0) {
      setError('Invalid input');
      return;
    }

    const res = await fetch('/api/withdraw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, amount }),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
      setSuccess(null);
    } else {
      setSuccess('Withdrawal request placed successfully!');
      setError(null);
      fetchUserProfit(); // Refresh the profit balance
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <form
        onSubmit={handleWithdraw}
        className="w-full max-w-md bg-blue-800/50 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-blue-700/50"
      >
        <h1 className="text-2xl font-bold text-primary mb-6">Make a Withdrawal</h1>

        {totalProfit !== null && (
          <p className="text-sm text-muted-foreground mb-4">
            Total Profit: <span className="text-primary font-semibold">${totalProfit}</span>
          </p>
        )}

        {error && (
          <div className="mb-4 p-4 rounded-lg bg-red-800/50 text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 rounded-lg bg-green-800/50 text-green-400">
            {success}
          </div>
        )}

        {/* Input Field */}
        <div className="mb-4">
          <label
            htmlFor="withdrawAmount"
            className="block text-sm text-muted-foreground mb-2"
          >
            Enter Withdrawal Amount:
          </label>
          <input
            id="withdrawAmount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            min="0"
            className="w-full px-4 py-2 bg-secondary text-primary rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!user || totalProfit === null}
          className={`w-full px-4 py-2 rounded-lg text-primary-foreground font-semibold shadow-md ${
            totalProfit === null ? 'bg-gray-500' : 'bg-primary hover:bg-primary-600'
          }`}
        >
          {totalProfit === null ? 'Loading...' : 'Withdraw'}
        </button>
      </form>
    </div>
  );
}
