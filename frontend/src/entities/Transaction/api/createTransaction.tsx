import server from '../../../shared/constants/url';
import { Transaction } from '../lib/types/transaction';

async function createTransaction(transaction: Transaction): Promise<Response> {
  const res = await fetch(`${server}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });
  const result = await res.json();
  return result;
}

export default createTransaction;
