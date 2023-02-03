import server from '../../../shared/constants/url';
import { Transaction } from '../lib/types/transaction';

async function getAllTransactions(): Promise<Array<Transaction>> {
  const res = await fetch(`${server}/transactions`);
  const transactions = (await res.json()) as Array<Transaction>;
  return transactions;
}

export default getAllTransactions;
