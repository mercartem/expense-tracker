import server from '../../../shared/constants/url';
import { Transaction } from '../lib/types/transaction';

async function updateTransaction(
  transaction: Partial<Transaction>,
  id: string,
  token: string,
): Promise<void> {
  await fetch(`${server}/user/transactions/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(transaction),
  });
}

export default updateTransaction;
