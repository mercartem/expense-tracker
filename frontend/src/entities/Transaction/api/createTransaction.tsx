import server from '../../../shared/constants/url';
import { getToken } from '../../../shared/utils/utils';
import { Transaction } from '../lib/types/transaction';

async function createTransaction(transaction: Transaction, token: string): Promise<void> {
  await fetch(`${server}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(transaction),
  });
}

// createTransaction({
//   category: 'Food',
//   description: '',
//   amount: 100,
//   paymentMode: 'cash',
//   transactionType: 'expense',
//   date: '',
//   time: '',
// }, getToken() as string)

export default createTransaction;
