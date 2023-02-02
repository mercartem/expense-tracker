import server from '../../../shared/constants/url';

async function getAllTransactions() {
  const res = await fetch(`${server}/transactions`);
  const transactions = await res.json();
  return transactions;
}

export default getAllTransactions;
