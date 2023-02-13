import removeTransaction from '../../../entities/Transaction/api/deleteTransaction';
import getAllUserTransactions from '../../../entities/Transaction/api/getAllUserTransactions';
import { Transaction } from '../../../entities/Transaction/lib/types/transaction';
import { ICallback } from '../../../shared/lib/types';
import { getToken } from '../../../shared/utils/utils';
import pageCount from '../utils/utils';

const fetchTransactions = async (updateData: ICallback<Transaction[]>, page = 1, limit = 0) => {
  const token = getToken();
  if (token) {
    const transactions = await getAllUserTransactions(token, page, limit);
    updateData(transactions);
  }
};

const getPageTotal = async (limit = 5 ) => {
  const token = getToken();
  let pageTotal = 1;
  if (token) {
    const transactions = await getAllUserTransactions(token, 1, 0);
    pageTotal = pageCount(transactions.length, limit)
  }
  return pageTotal;
}

const deleteTransactions = async (data: string[]) => {
  const token = getToken();
  if (token && data.length) {
    if (data.length === 1) {
      try {
        await removeTransaction(data[0], token);
      } catch (error) {
        console.log(error)
      }
    } else {
      const deleteAll = data.map((id) => removeTransaction(id, token))
      try {
        await Promise.all(deleteAll);
      } catch (error) {
        console.log(error)
      }
  }
}
};

export { fetchTransactions, deleteTransactions, getPageTotal };