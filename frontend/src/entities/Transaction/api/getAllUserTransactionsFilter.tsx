import server from '../../../shared/constants/url';
import { Transaction } from '../lib/types/transaction';

async function getAllUserTransactionsParams(
    token: string,
    page = 1,
    limit = 0,
    restQueryParams?: string,
  ) {
    let url = `${server}/user/transactions?page=${page}&limit=${limit}`;
    url = restQueryParams ? `${url}&${restQueryParams}` : url;
  
      const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    if (res.status === 500) {
      const error = (await res.json()).message as string;
      throw new Error(error);
    }
    const transactions = (await res.json()) as Array<Transaction>;
    return transactions;
  }

  export default getAllUserTransactionsParams