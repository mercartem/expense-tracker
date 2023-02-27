import server from '../../../shared/constants/url';
import { Transaction } from '../lib/types/transaction';

async function getAllUserTransactions(
  token: string,
  page = 1,
  limit = 0,
  from?: string,
  to?: string,
) {
  const url =
    from && to
      ? `${server}/user/transactions?page=${page}&limit=${limit}&from=${from}&to=${to}`
      : `${server}/user/transactions?page=${page}&limit=${limit}`;

  const res = await fetch(url, {
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
