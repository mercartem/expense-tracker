import { useEffect, useState } from 'react';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import getAllUserTransactions from '../../../entities/Transaction/api/getAllUserTransactions';
import amounts from '../../../entities/Transaction/model/amount';
import DatePick from '../../../features/DateRangePicker/ui/Date';
import { getAmountsOfTransactions, getToken } from '../../../shared/utils/utils';
import InfoCard from '../../../widgets/InfoCard/ui/InfoCard';
import ExpensesAnalysis from '../../../widgets/PieChart/ui/ExpensesAnalysis';
import '../style/Dashboard.scss';

function Dashboard() {
  const [amount, setAmount] = useState(amounts);

  async function fetchData(dates: DateRange | null) {
    const token = getToken();
    if (token && dates) {
      const from = dates[0].toISOString();
      const to = dates[1].toISOString();
      const transactions = await getAllUserTransactions(token, 1, 12, from, to);
      setAmount(getAmountsOfTransactions(transactions));
    }
  }

  useEffect(() => {
    const allTime: [Date, Date] = [new Date(new Date().getFullYear() - 1, 0, 1), new Date()];
    fetchData(allTime);
  }, []);

  return (
    <div className='dashboard'>
      <div className='dashboard__header'>
        <p>Dashboard</p>
        <div className='dashboard__calendar'>
          <DatePick fetchData={(dates) => fetchData(dates)} />
        </div>
      </div>
      <div className='dashboard__info'>
        <InfoCard title='Income' amount={amount.income} color='#4d80f3' />
        <InfoCard title='Expenses' amount={amount.expenses} color='#fb6d9d' />
        <InfoCard title='Balance' amount={amount.balance} color='#81c868' />
        <InfoCard title='Transactions' amount={amount.transactions} color='#34d3eb' />
      </div>
      <div className='dashboard__charts'>
        <ExpensesAnalysis />
        <div className='area-chart'>2</div>
        <div className='bar-chart'>3</div>
      </div>
    </div>
  );
}

export default Dashboard;
