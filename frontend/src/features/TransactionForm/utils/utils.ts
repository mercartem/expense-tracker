import { ITransactionFormState } from '../lib/types';

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

export function getTime(date: Date) {
  const h = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
  const m = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
  return `${h}:${m}`;
}