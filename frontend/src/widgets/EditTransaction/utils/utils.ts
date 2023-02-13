import createTransaction from '../../../entities/Transaction/api/createTransaction';
import { Transaction } from '../../../entities/Transaction/lib/types/transaction';
import { getToken } from '../../../shared/utils/utils';
import { ITransactionFormState } from '../../../features/TransactionForm/lib/types';
import getTransaction from '../../../entities/Transaction/api/getTransaction';
import { ICallback } from '../../../shared/lib/types';
import updateTransaction from '../../../entities/Transaction/api/updateTransaction';

export function transactionValuesAdapter(data: ITransactionFormState) {
  return {
    ...data,
    amount: Number(data.amount),
    date: data.date ? data.date.toISOString() : new Date().toISOString(),
  };
}

export function nowTime() {
  const date = new Date();
  const h = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
  const m = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
  return `${h}:${m}`;
}


export async function editTransaction(data: ITransactionFormState, id: string) {
  const token = getToken();
  const newTransaction = transactionValuesAdapter(data);
  if (token && id) {
    try {
      const response = await updateTransaction(newTransaction, id, token);
      if (typeof response === 'string') {
        throw new Error(response);
      }
    } catch (error) {
      if (error instanceof Error) return error.message;
    }
  }
  return newTransaction;
}

export const getTransactionValues = async (id: string) => {
  const token = getToken();
  let defaultValues: ITransactionFormState = {
    category: '',
    description: '',
    amount: '',
    paymentMode: 'cash',
    transactionType: 'expense',
    date: new Date(),
    time: nowTime(),
  };
  if (token && id) {
    try {
      const response = await getTransaction(id, token);
      defaultValues = {
        category: response.category,
        description: response.description,
        time: response.time,
        date: new Date(response.date),
        amount: response.amount.toString(),
        paymentMode: response.paymentMode,
        transactionType: response.transactionType,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
  return defaultValues;
};
