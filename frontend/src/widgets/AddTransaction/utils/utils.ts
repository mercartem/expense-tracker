import createTransaction from '../../../entities/Transaction/api/createTransaction';
import { Transaction } from '../../../entities/Transaction/lib/types/transaction';
import { getToken } from '../../../shared/utils/utils';
import { ITransactionFormState } from '../../../features/TransactionForm/lib/types';

export function transactionValuesAdapter (data: ITransactionFormState) {
  return {
    ...data, 
    amount: Number(data.amount),
    date: data.date? data.date[0].toISOString() : new Date().toISOString(),
  }
}

export function nowTime() {
  const date = new Date();
  const h = date.getHours() > 9? date.getHours() : `0${date.getHours()}`;
  const m = date.getMinutes()> 9? date.getMinutes() : `0${date.getMinutes()}`;
  return `${h}:${m}`;
}


export async function addTransaction (data: ITransactionFormState) {
  const token = getToken();
  const newTransaction = transactionValuesAdapter(data)
  if (token && newTransaction) {
    try {
      const response = await createTransaction(newTransaction, token);
      if(typeof response === 'string') {
        throw new Error(response)
      } 
    return response;
    } catch (error) {
      if (error instanceof Error)
      return error.message;
    }
  }
  return newTransaction;
}