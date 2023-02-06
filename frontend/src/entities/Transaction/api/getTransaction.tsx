import server from '../../../shared/constants/url';
import { Transaction } from '../lib/types/transaction';

async function getTransaction(id: string, token: string) {
  const res = await fetch(`${server}/user/transactions/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  const transaction = (await res.json()) as Transaction;
  return transaction;
}

export default getTransaction;
