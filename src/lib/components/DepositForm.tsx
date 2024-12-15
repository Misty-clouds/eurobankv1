'use client';

import { useState } from 'react';
import { useCurrentUser } from '../auth/useCurrentUser';

export default function InitiateDeposit() {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Deposit levels with daily profit calculations
  const depositLevels = [
    { label: 'Level 1: $60 (Daily Profit: $1.20)', value: 60, dailyProfit: 1.2 },
    { label: 'Level 2: $100 (Daily Profit: $2.00)', value: 100, dailyProfit: 2 },
    { label: 'Level 3: $200 (Daily Profit: $4.00)', value: 200, dailyProfit: 4 },
    { label: 'Level 4: $400 (Daily Profit: $8.00)', value: 400, dailyProfit: 8 },
    { label: 'Level 5: $500 (Daily Profit: $10.00)', value: 500, dailyProfit: 10 },
    { label: 'Level 6: $1,000 (Daily Profit: $20.00)', value: 1000, dailyProfit: 20 },
    { label: 'Level 7: $2,000 (Daily Profit: $40.00)', value: 2000, dailyProfit: 40 },
    { label: 'Level 8: $5,000 (Daily Profit: $100.00)', value: 5000, dailyProfit: 100 },
    { label: 'Level 9: $10,000 (Daily Profit: $200.00)', value: 10000, dailyProfit: 200 },
    { label: 'Level 10: $15,000 (Daily Profit: $300.00)', value: 15000, dailyProfit: 300 },
  ];

  const initiateDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const user = useCurrentUser();


    try {
      const response = await fetch('/api/deposit/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user?.id, // Replace with logged-in user ID
          amount: Number(selectedAmount),
          wallet_address: walletAddress,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(
          `Deposit initiated successfully! Please complete the payment within the next 30 minutes.`
        );
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <form
        onSubmit={initiateDeposit}
        className="w-full max-w-md bg-blue-800/50 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-blue-700/50"
      >
        <h1 className="text-2xl font-bold text-primary mb-6">Initiate Deposit</h1>

        {/* Dropdown for Deposit Levels */}
        <div className="mb-4">
          <label
            htmlFor="depositLevel"
            className="block text-sm text-muted-foreground mb-2"
          >
            Select Deposit Level:
          </label>
          <select
            id="depositLevel"
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(e.target.value)}
            required
            className="w-full px-4 py-2 bg-secondary text-primary rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="" disabled>
              Choose a level
            </option>
            {depositLevels.map((level, index) => (
              <option key={index} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        {/* Wallet Address Input */}
        <div className="mb-4">
          <label
            htmlFor="walletAddress"
            className="block text-sm text-muted-foreground mb-2"
          >
            Wallet Address:
          </label>
          <input
            id="walletAddress"
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            required
            className="w-full px-4 py-2 bg-secondary text-primary rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 rounded-lg text-primary-foreground font-semibold shadow-md ${
            loading ? 'bg-gray-500' : 'bg-primary hover:bg-primary-600'
          }`}
        >
          {loading ? 'Processing...' : 'Initiate Deposit'}
        </button>

        {/* Message */}
        {message && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              message.includes('successfully')
                ? 'bg-green-800/50 text-green-400'
                : 'bg-red-800/50 text-red-400'
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
