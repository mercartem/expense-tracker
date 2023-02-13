import { Transaction } from '../entities/Transaction/lib/types/transaction';
import {
  getAmountsOfTransactions,
  getCategoriesSummary,
  getMonthlyBalance,
  sortTransactionsByDate,
  validateBalance,
  validateMail,
} from '../shared/utils/utils';

describe('getAmountsOfTransactions', () => {
  it('calculates income, expenses, balance, and number of transactions correctly', () => {
    const transactions: Pick<Transaction, 'amount' | 'transactionType'>[] = [
      { transactionType: 'income', amount: 100 },
      { transactionType: 'expense', amount: 50 },
      { transactionType: 'income', amount: 200 },
      { transactionType: 'expense', amount: 100 },
    ];

    const amounts = getAmountsOfTransactions(transactions);
    expect(amounts).toEqual({
      income: '300 ₽',
      expenses: '150 ₽',
      balance: '150 ₽',
      transactions: '4',
    });
  });

  it('returns 0 for all values if transactions are empty', () => {
    const transactions: Transaction[] = [];
    const amounts = getAmountsOfTransactions(transactions);
    expect(amounts).toEqual({
      income: '0 ₽',
      expenses: '0 ₽',
      balance: '0 ₽',
      transactions: '0',
    });
  });
});

describe('getCategoriesSummary', () => {
  it('calculates the total expenses for each category correctly', () => {
    const transactions: Pick<Transaction, 'amount' | 'transactionType' | 'category'>[] = [
      { transactionType: 'income', amount: 1000, category: 'Salary' },
      { transactionType: 'expense', amount: 500, category: 'Food' },
      { transactionType: 'expense', amount: 200, category: 'Entertainment' },
      { transactionType: 'expense', amount: 300, category: 'Food' },
      { transactionType: 'income', amount: 2000, category: 'Bonus' },
    ];

    const summary = getCategoriesSummary(transactions);
    expect(summary).toEqual([
      { name: 'Food', value: 800 },
      { name: 'Entertainment', value: 200 },
    ]);
  });
});

describe('getMonthlyBalance', () => {
  it('calculates the monthly balance correctly', () => {
    const transactions: Pick<Transaction, 'amount' | 'transactionType' | 'date'>[] = [
      { date: '2022-01-01', transactionType: 'income', amount: 1000 },
      { date: '2022-02-01', transactionType: 'expense', amount: 500 },
      { date: '2022-03-01', transactionType: 'income', amount: 2000 },
      { date: '2022-03-01', transactionType: 'expense', amount: 1000 },
    ];

    const monthlyBalances = getMonthlyBalance(transactions);
    expect(monthlyBalances).toEqual([
      { month: 'Jan 2022', amount: 1000, income: 1000, expense: 0 },
      { month: 'Feb 2022', amount: -500, income: 0, expense: 500 },
      { month: 'Mar 2022', amount: 1000, income: 2000, expense: 1000 },
    ]);
  });

  it('returns an empty array if there are no transactions', () => {
    const transactions: Transaction[] = [];
    const monthlyBalances = getMonthlyBalance(transactions);
    expect(monthlyBalances).toEqual([]);
  });
});

describe('sortTransactionsByDate', () => {
  it('sorts the transactions by date in ascending order', () => {
    const transactions: Transaction[] = [
      {
        date: '2022-05-01',
        amount: 1000,
        category: 'Food',
        transactionType: 'expense',
        time: '12:00',
        _id: '1234',
        description: 'Молоко',
        paymentMode: 'cash',
      },
      {
        date: '2022-06-01',
        amount: 2000,
        category: 'Clothes',
        transactionType: 'expense',
        time: '13:00',
        _id: '1235',
        description: 'Одежда',
        paymentMode: 'debit card',
      },
      {
        date: '2022-04-01',
        amount: 3000,
        category: 'Entertainment',
        transactionType: 'expense',
        time: '14:00',
        _id: '1236',
        description: 'Кино',
        paymentMode: 'credit card',
      },
    ];

    const sortedTransactions = sortTransactionsByDate(transactions);
    expect(sortedTransactions).toEqual([
      {
        date: '2022-06-01',
        amount: 2000,
        category: 'Clothes',
        transactionType: 'expense',
        time: '13:00',
        _id: '1235',
        description: 'Одежда',
        paymentMode: 'debit card',
      },
      {
        date: '2022-05-01',
        amount: 1000,
        category: 'Food',
        transactionType: 'expense',
        time: '12:00',
        _id: '1234',
        description: 'Молоко',
        paymentMode: 'cash',
      },
      {
        date: '2022-04-01',
        amount: 3000,
        category: 'Entertainment',
        transactionType: 'expense',
        time: '14:00',
        _id: '1236',
        description: 'Кино',
        paymentMode: 'credit card',
      },
    ]);
  });
});

describe('validateMail', () => {
  it('should return true for a valid email address', () => {
    const email = 'user@example.com';
    expect(validateMail(email)).toBe(true);
  });

  it('should return false for an invalid email address', () => {
    const email = 'user@example';
    expect(validateMail(email)).toBe(false);
  });

  it('should return false for an empty string', () => {
    const email = '';
    expect(validateMail(email)).toBe(false);
  });
});

describe('validateBalance', () => {
  it('should return true for valid values', () => {
    expect(validateBalance('123')).toBe(true);
    expect(validateBalance('123.45')).toBe(true);
    expect(validateBalance('123,45')).toBe(true);
    expect(validateBalance('0.00')).toBe(true);
    expect(validateBalance('')).toBe(true);
  });

  it('should return false for invalid values', () => {
    expect(validateBalance('abc')).toBe(false);
    expect(validateBalance('12.3.45')).toBe(false);
    expect(validateBalance('12,3,45')).toBe(false);
  });
});
