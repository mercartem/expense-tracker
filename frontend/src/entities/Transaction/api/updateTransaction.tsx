import server from '../../../shared/constants/url';
import { Transaction } from '../lib/types/transaction';

async function updateTransaction(transaction: Partial<Transaction>, id: string): Promise<void> {
  await fetch(`${server}/transactions/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });
}

export default updateTransaction;
