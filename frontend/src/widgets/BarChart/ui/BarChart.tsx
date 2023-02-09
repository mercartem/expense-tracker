import '../style/BarChart.scss';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { MonthlyBalance } from '../../AreaChart/lib/types';

function ExpensesIncomeAnalysis({ monthlyBalance }: { monthlyBalance: MonthlyBalance[] }) {
  return (
    <div className='bar-chart'>
      <p className='bar-chart__title'>Income - Expense</p>
      <div style={{ width: '100%', height: 350, fontSize: '12px' }}>
        <ResponsiveContainer>
          <BarChart
            width={500}
            height={300}
            data={monthlyBalance}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' />
            <YAxis tickFormatter={(number) => `${number}₽`} tickCount={7} />
            <Tooltip formatter={(number) => `${number}₽`} />
            <Legend />
            <Bar dataKey='income' fill='#8884d8' />
            <Bar dataKey='expense' fill='#82ca9d' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ExpensesIncomeAnalysis;
