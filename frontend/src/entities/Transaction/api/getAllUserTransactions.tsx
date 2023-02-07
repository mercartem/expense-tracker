import server from '../../../shared/constants/url';
import { Transaction } from '../lib/types/transaction';

async function getAllUserTransactions(
  token: string,
  page = 1,
  limit = 0,
  from?: string,
  to?: string,
) {
  const res = await fetch(
    `${server}/user/transactions?page=${page}&limit=${limit}&from=${from}&to=${to}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    },
  );
  const transactions = (await res.json()) as Array<Transaction>;
  return transactions;
}

export default getAllUserTransactions;
