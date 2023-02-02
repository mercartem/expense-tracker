export interface Transaction {
  category: string;
  description: string;
  amount: number;
  paymentMode: 'cash' | 'credit card' | 'debit card';
  transactionType: 'income' | 'outcome';
  date: string;
  time: string;
}
