import axios from 'axios';

export async function checkIncomingTransactions(targetAddress) {
  const url = `https://api.tronscan.org/api/transaction?address=${targetAddress}`;

  const response = await axios.get(url);
  return response.data.data; // List of transactions
}
