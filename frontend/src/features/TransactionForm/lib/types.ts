export interface ITransactionFormState {
  category: string;
  description: string;
  amount: string;
  paymentMode: 'cash' | 'credit card' | 'debit card';
  transactionType: 'income' | 'expense';
  date: Date;
  time: string;
}
