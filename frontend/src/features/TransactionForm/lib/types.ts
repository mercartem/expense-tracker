import { DateRange } from 'rsuite/esm/DateRangePicker';

export interface ITransactionFormState {
  category: string;
  description: string;
  amount: string;
  paymentMode: 'cash' | 'credit card' | 'debit card';
  transactionType: 'income' | 'expense';
  date: DateRange | null;
  time: string;
}
