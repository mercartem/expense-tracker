import server from '../../../shared/constants/url';
import { Transaction } from '../lib/types/transaction';

async function createTransaction(transaction: Partial<Transaction>, token: string) {
  const res = await fetch(`${server}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(transaction),
  });
  if (res.status === 400) {
    return (await res.json())[0].msg as string;
  }
  const result = (await res.json()) as Transaction;
  return result;
}

export default createTransaction;
