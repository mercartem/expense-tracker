import removeTransaction from '../../../entities/Transaction/api/deleteTransaction';
import getAllUserTransactionsParams from '../../../entities/Transaction/api/getAllUserTransactionsFilter';
import { Transaction } from '../../../entities/Transaction/lib/types/transaction';
import { ICallback } from '../../../shared/lib/types';
import { getToken } from '../../../shared/utils/utils';
import {pageCount} from '../utils/utils';

const fetchTransactions = async (
  updateData: ICallback<Transaction[]>,
  updateLoading: ICallback<boolean>,
  setError: ICallback<string>,
  page = 1,
  limit = 0,
  params = '',
) => {
  updateLoading(true)
  const token = getToken();
  if (token) {
    try {
      const transactions = await getAllUserTransactionsParams(token, page, limit, params);
      updateData(transactions);
  } catch (error) {
    if (error instanceof Error) setError(error.message);
  }
  finally {
    updateLoading(false)
  }
}
};

const getPageTotal = async (limit = 5, params = '') => {
  const token = getToken();
  let pageTotal = 1;
  if (token) {
    const transactions = await getAllUserTransactionsParams(token, 1, 0, params);
    pageTotal = pageCount(transactions.length, limit);
  }
  return pageTotal;
};

const deleteTransactions = async (data: string[], updateError: ICallback<string>) => {
  const token = getToken();
  if (token && data.length) {
    if (data.length === 1) {
      try {
        await removeTransaction(data[0], token);
      } catch (error) {
        if (error instanceof Error) updateError(error.message)
    }} else {
      const deleteAll = data.map((id) => removeTransaction(id, token));
      try {
        await Promise.all(deleteAll);
      } catch (error) {
        if (error instanceof Error) updateError(error.message)
      }
    }
  }
};

export { fetchTransactions, deleteTransactions, getPageTotal };
