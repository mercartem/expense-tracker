import server from '../../../shared/constants/url';
import { Transaction } from '../lib/types/transaction';

async function getAllUserTransactions(token: string) {
  const res = await fetch(`${server}/user/transactions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  const transactions = (await res.json()) as Array<Transaction>;
  return transactions;
}

export default getAllUserTransactions;
