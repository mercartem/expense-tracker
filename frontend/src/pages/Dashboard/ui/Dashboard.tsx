import { useEffect, useState } from 'react';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import getAllUserTransactions from '../../../entities/Transaction/api/getAllUserTransactions';
import amounts from '../../../entities/Transaction/model/amount';
import DatePick from '../../../features/DateRangePicker/ui/Date';
import {
  getAmountsOfTransactions,
  getCategoriesSummary,
  getMonthlyBalance,
  getToken,
} from '../../../shared/utils/utils';
import { MonthlyBalance } from '../../../widgets/AreaChart/lib/types';
import BalanceAnalysis from '../../../widgets/AreaChart/ui/AreaChart';
import BarChart from '../../../widgets/BarChart/ui/BarChart';
import InfoCard from '../../../widgets/InfoCard/ui/InfoCard';
import { Category } from '../../../widgets/PieChart/lib/types';
import ExpensesAnalysis from '../../../widgets/PieChart/ui/ExpensesAnalysis';
import '../style/Dashboard.scss';

function Dashboard() {
  const allTime: [Date, Date] = [new Date(new Date().getFullYear() - 1, 0, 1), new Date()];
  const [amount, setAmount] = useState(amounts);
  const [categories, setCategories] = useState<Category[]>([]);
  const [period, setPeriod] = useState(allTime);
  const [monthlyBalance, setMonthlyBalance] = useState<MonthlyBalance[]>([]);

  async function fetchData(dates: DateRange | null) {
    const token = getToken();
    if (token && dates) {
      const from = dates[0].toISOString();
      const to = dates[1].toISOString();
      const transactions = await getAllUserTransactions(token, 1, 0, from, to);
      setAmount(getAmountsOfTransactions(transactions));
      setCategories(getCategoriesSummary(transactions));
      setPeriod(dates);
      setMonthlyBalance(getMonthlyBalance(transactions));
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
          <DatePick fetchData={(dates) => fetchData(dates)} period={period} />
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
          <BarChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
