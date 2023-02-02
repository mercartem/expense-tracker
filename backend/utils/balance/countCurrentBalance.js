import { increaseBalance } from './increaseBalance.js';
import { decreaseBalance } from './decreaseBalance.js';

export const countBalance = async (item, id) => {
  if (item.transactionType === 'income') {
    await increaseBalance(item, id);
  }

  if (item.transactionType === 'expense') {
    await decreaseBalance(item, id);
  }
};

export const countBalanceReverse = async (item, id) => {
  if (item.transactionType === 'income') {
    await decreaseBalance(item, id);
  }

  if (item.transactionType === 'expense') {
    await increaseBalance(item, id);
  }
};
