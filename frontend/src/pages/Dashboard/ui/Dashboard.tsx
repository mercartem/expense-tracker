import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import getAllUserTransactions from '../../../entities/Transaction/api/getAllUserTransactions';
import { Transaction } from '../../../entities/Transaction/lib/types/transaction';
import amounts from '../../../entities/Transaction/model/amount';
import TransactionsList from '../../../entities/Transaction/ui/TransactionsList/TransactionsList';
import { DatePick } from '../../../features/DateRangePicker/ui/Date';
import {
  getAmountsOfTransactions,
  getCategoriesSummary,
  getMonthlyBalance,
  getToken,
  sortTransactionsByDate,
} from '../../../shared/utils/utils';
import { MonthlyBalance } from '../../../widgets/AreaChart/lib/types';
import BalanceAnalysis from '../../../widgets/AreaChart/ui/AreaChart';
import ExpensesIncomeAnalysis from '../../../widgets/BarChart/ui/BarChart';
import InfoCard from '../../../widgets/InfoCard/ui/InfoCard';
import { Category } from '../../../widgets/PieChart/lib/types';
import ExpensesAnalysis from '../../../widgets/PieChart/ui/ExpensesAnalysis';
import '../style/Dashboard.scss';

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const allTime: [Date, Date] = [new Date(new Date().getFullYear() - 5, 0, 1), new Date()];
  const dateParams: [Date, Date] | false = queryParams.has('from') && [
    new Date(queryParams.get('from') as string),
    new Date(queryParams.get('to') as string),
  ];

  const [amount, setAmount] = useState(amounts);
  const [categories, setCategories] = useState<Category[]>([]);
  const [period, setPeriod] = useState(dateParams || allTime);
  const [monthlyBalance, setMonthlyBalance] = useState<MonthlyBalance[]>([]);
  const [fiveTransactions, setFiveTransactions] = useState<Transaction[]>([]);

  function handleDate(dates: DateRange | null) {
    if (dates) {
      const [startDate, endDate] = [
        dates[0].toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        dates[1].toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      ];
      navigate(`/user/dashboard?from=${startDate}&to=${endDate}`);
      setPeriod(dates);
    }
  }

  async function fetchData(dates: DateRange | null) {
    const token = getToken();
    if (token && dates) {
      const [from, to] = [dates[0].toISOString(), dates[1].toISOString()];
      const transactions = await getAllUserTransactions(token, 1, 0, from, to);

      setAmount(getAmountsOfTransactions(transactions));
      setCategories(getCategoriesSummary(transactions));
      setMonthlyBalance(getMonthlyBalance(transactions));
      setFiveTransactions(sortTransactionsByDate(transactions).slice(0, 5));
    }
  }

  useEffect(() => {
    fetchData(period);
  }, []);

  return (
    <div className='dashboard'>
      <div className='dashboard__header'>
        <p>Dashboard</p>
        <div className='dashboard__calendar'>
          <DatePick
            fetchData={(dates) => fetchData(dates)}
            handleDate={(dates) => handleDate(dates)}
            period={period}
          />
        </div>
      </div>
      <div className='dashboard__info'>
        <InfoCard title='Income' amount={amount.income} color='#4d80f3' />
        <InfoCard title='Expenses' amount={amount.expenses} color='#fb6d9d' />
        <InfoCard title='Balance' amount={amount.balance} color='#81c868' />
        <InfoCard title='Transactions' amount={amount.transactions} color='#34d3eb' />
      </div>
      <div className='dashboard__charts'>
        <ExpensesAnalysis categories={categories} period={period} />
        <div className='two-charts-wrapper'>
          <BalanceAnalysis monthlyBalance={monthlyBalance} />
          <ExpensesIncomeAnalysis monthlyBalance={monthlyBalance} />
        </div>
      </div>
      <div className='dashboard__transactions'>
        <p className='dashboard__title'>Recent Transactions</p>
        <TransactionsList transactions={fiveTransactions} />
      </div>
    </div>
  );
}

export default Dashboard;
