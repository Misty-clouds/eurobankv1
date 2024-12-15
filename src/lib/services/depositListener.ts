import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import { checkIncomingTransactions } from '@/lib/blockchain';
import fetch from 'node-fetch';

interface Deposit {
  id: number;
  wallet_address: string;
  amount: number;
  status: string;
}

// Define a type for the payload from Supabase
interface SupabasePayload {
  new: Deposit; 
}

// Initialize Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

let blockchainListenerActive = false;

// Start listening to Supabase for new pending deposits
async function startSupabaseListener() {
  const channel: RealtimeChannel = supabase.channel('deposits-status-pending');

  // Subscribe to INSERT events for deposits with status 'pending'
  channel
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'deposits', filter: 'status=eq.pending' }, (payload: SupabasePayload) => {
      const deposit = payload.new;

      console.log('New pending deposit detected:', deposit);
      if (!blockchainListenerActive) {
        blockchainListenerActive = true;
        startBlockchainListener(); // No need to await, just start
      }
    })
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('Supabase listener for pending deposits is active.');
      }
    });
}

// Listen for blockchain transactions when there are pending deposits
async function startBlockchainListener() {
  console.log('Blockchain listener started.');

  const interval = setInterval(async () => {
    const { data: pendingDeposits } = await supabase
      .from('deposits')
      .select('*')
      .eq('status', 'pending');

    if (!pendingDeposits || pendingDeposits.length === 0) {
      console.log('No pending deposits. Stopping blockchain listener.');
      blockchainListenerActive = false;
      clearInterval(interval); // Stop the blockchain listener
      return;
    }

    for (const deposit of pendingDeposits) {
      await listenToBlockchainTransaction(deposit as Deposit); // Cast deposit to the Deposit type
    }
  }, 5000); // Poll every 5 seconds
}

// Check blockchain transactions for a specific deposit
async function listenToBlockchainTransaction(deposit: Deposit) {
  const { wallet_address, amount } = deposit;

  // Fetch transactions from the blockchain
  const transactions = await checkIncomingTransactions(wallet_address);

  for (const tx of transactions) {
    const { from, value, hash } = tx;

    if (value === amount) {
      // If transaction matches, validate the deposit
      const response = await fetch('http://localhost:3000/api/deposit/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transaction_hash: hash, from_wallet: from, amount: value }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Deposit validated successfully:', result);
      } else {
        console.error('Error validating deposit:', result);
      }
    }
  }
}

// Start the Supabase listener when the service is initialized
startSupabaseListener();
