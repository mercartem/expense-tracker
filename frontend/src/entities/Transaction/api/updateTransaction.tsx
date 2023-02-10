import server from '../../../shared/constants/url';
import { Transaction } from '../lib/types/transaction';

async function updateTransaction(
  transaction: Partial<Transaction>,
  id: string,
  token: string,
): Promise<string | { success: boolean }> {
  const res = await fetch(`${server}/transactions/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(transaction),
  });
  if (res.status === 500) {
    return (await res.json()).message;
  }
  const result = (await res.json()) as { success: boolean };
  return result;
}

export default updateTransaction;
