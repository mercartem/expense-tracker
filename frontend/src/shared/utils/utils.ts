import { Amounts } from '../../entities/Transaction/lib/types/amount';
import { Transaction } from '../../entities/Transaction/lib/types/transaction';

function setToken(token: string) {
  if (token) {
    localStorage.setItem('token', JSON.stringify(token));
  }
}

function getToken(): string | null {
  const tokenString = localStorage.getItem('token');
  if (tokenString) {
    return JSON.parse(tokenString);
  }
  return tokenString;
}

function tokenExist() {
  if (getToken()) {
    return true;
  }
  return false;
}

function setId(id: string) {
  if (id) {
    localStorage.setItem('id', JSON.stringify(id));
  }
}

function getId(): string | null {
  const idString = localStorage.getItem('id');
  if (idString) {
    return JSON.parse(idString);
  }
  return idString;
}

function setName(name: string) {
  if (name) {
    localStorage.setItem('name', JSON.stringify(name));
  }
}

function getName() {
  const name = localStorage.getItem('name');
  if (name) {
    return JSON.parse(name);
  }
  return name;
}

function removeUserFromStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('name');
}

function validateMail(mail: string) {
  const regexp =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  return regexp.test(mail);
}

function validatePassword(password: string) {
  return password.length > 4;
}

function validateName(name: string) {
  return name.length >= 4;
}

function validateBalance(value: string) {
  const pattern = /^(\d+(?:[.,]\d+)?|)$/;
  return pattern.test(value.trim());
}

function getAmountsOfTransactions(transactions: Transaction[]): Amounts {
  const income = transactions
    .filter((transaction) => transaction.transactionType === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const expense = transactions
    .filter((transaction) => transaction.transactionType === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const balance = income - expense;
  const numberOfTransactions = transactions.length;
  return {
    income: `${income.toLocaleString()} ₽`,
    expenses: `${expense.toLocaleString()} ₽`,
    balance: `${balance.toLocaleString()} ₽`,
    transactions: numberOfTransactions.toLocaleString(),
  };
}

function getCategoriesSummary(transactions: Transaction[]) {
  const result: { [key: string]: number } = {};
  const expensesTransactions = transactions.filter(
    (transaction) => transaction.transactionType === 'expense',
  );

  expensesTransactions.forEach((trans) => {
    const { category, amount } = trans;
    if (!result[category]) {
      result[category] = 0;
    }
    result[category] += amount;
  });

  return Object.entries(result).map(([name, value]) => ({ name, value }));
}

function getMonthlyBalance(transactions: Transaction[]) {
  const monthlyBalances: { [key: string]: { month: string; income: number; expense: number } } = {};

  transactions.forEach((transaction) => {
    const month = new Date(transaction.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
    if (!monthlyBalances[month]) {
      monthlyBalances[month] = {
        month,
        income: 0,
        expense: 0,
      };
    }
    if (transaction.transactionType === 'income') {
      monthlyBalances[month].income += transaction.amount;
    } else if (transaction.transactionType === 'expense') {
      monthlyBalances[month].expense += transaction.amount;
    }
  });

  return Object.values(monthlyBalances)
    .map((balance) => ({
      month: balance.month,
      amount: balance.income - balance.expense,
      expense: balance.expense,
      income: balance.income,
    }))
    .sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      if (dateA > dateB) {
        return 1;
      }
      if (dateA < dateB) {
        return -1;
      }
      return 0;
    });
}

function sortTransactionsByDate(transactions: Transaction[]) {
  return transactions.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA < dateB) {
      return 1;
    }
    if (dateA > dateB) {
      return -1;
    }
    return 0;
  });
}

const removeQueryParams = (key: string, searchParams: URLSearchParams, setParams: (data: URLSearchParams) => void) => {
  const param = searchParams.get(key);
  if (param) {
    searchParams.delete(key);
    setParams(searchParams);
  }
};

export {
  setToken,
  getToken,
  setId,
  getId,
  setName,
  getName,
  removeUserFromStorage,
  validateName,
  validatePassword,
  validateMail,
  validateBalance,
  tokenExist,
  getAmountsOfTransactions,
  getCategoriesSummary,
  getMonthlyBalance,
  sortTransactionsByDate,
  removeQueryParams
};
