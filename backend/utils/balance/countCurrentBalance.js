import { increaseBalance } from './increaseBalance.js';
import { decreaseBalance } from './decreaseBalance.js';

export const countBalance = (item, id) => {
  if (item.transactionType === 'income') {
    increaseBalance(item, id);
  }

  if (item.transactionType === 'expense') {
    decreaseBalance(item, id);
  }
};

export const countBalanceReverse = (item, id) => {
  if (item.transactionType === 'income') {
    decreaseBalance(item, id);
  }

  if (item.transactionType === 'expense') {
    increaseBalance(item, id);
  }
};
