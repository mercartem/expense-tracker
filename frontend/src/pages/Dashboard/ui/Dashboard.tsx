import { useEffect, useState } from 'react';
import getAllTransactions from '../../../entities/Transaction/api/getAllTransactions';
import amounts from '../../../entities/Transaction/model/amount';
import DatePick from '../../../features/DateRangePicker/ui/Date';
import { getAmountsOfTransactions, getToken } from '../../../shared/utils/utils';
import InfoCard from '../../../widgets/InfoCard/ui/InfoCard';
import '../style/Dashboard.scss';

function Dashboard() {
  const [amount, setAmount] = useState(amounts);

  async function fetchData() {
    const transactions = await getAllTransactions();
    setAmount(getAmountsOfTransactions(transactions));
    console.log('запрос');
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='dashboard'>
      <div className='dashboard__header'>
        <p>Dashboard</p>
        <div className='dashboard__calendar'>
          <DatePick fetchData={() => fetchData()} />
        </div>
      </div>
      <div className='dashboard__info'>
        <InfoCard title='Income' amount={amount.income} color='#4d80f3' />
        <InfoCard title='Expenses' amount={amount.expenses} color='#fb6d9d' />
        <InfoCard title='Balance' amount={amount.balance} color='#81c868' />
        <InfoCard title='Transactions' amount={amount.transactions} color='#34d3eb' />
      </div>
    </div>
  );
}

export default Dashboard;
