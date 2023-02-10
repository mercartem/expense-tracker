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

const deleteTransactions = async (data: string[]) => {
  const token = getToken();
  if (token) {
    data.forEach(async (id) => {
      await removeTransaction(id, token);
    });
  }
};

export { fetchTransactions, deleteTransactions };