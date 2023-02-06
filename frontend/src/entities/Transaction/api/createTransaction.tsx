import server from '../../../shared/constants/url';
import { Transaction } from '../lib/types/transaction';

async function createTransaction(transaction: Transaction, token: string): Promise<void> {
  await fetch(`${server}/user/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(transaction),
  });
}

export default createTransaction;
