import server from '../../../shared/constants/url';
import { Transaction } from '../lib/types/transaction';

async function createTransaction(transaction: Transaction): Promise<void> {
  await fetch(`${server}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });
}

export default createTransaction;
