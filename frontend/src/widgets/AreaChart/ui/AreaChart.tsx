import '../style/AreaChart.scss';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { MonthlyBalance } from '../lib/types';

function BalanceAnalysis({ monthlyBalance }: { monthlyBalance: MonthlyBalance[] }) {
  return (
    <div className='area-chart'>
      <p className='area-chart__title'>Account - Balance</p>
      <div style={{ width: '100%', height: 350, fontSize: '12px' }}>
        <ResponsiveContainer>
          <AreaChart
            data={monthlyBalance}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' />
            <YAxis tickFormatter={(number) => `${number}₽`} tickCount={7} />
            <Tooltip formatter={(number) => `${number}₽`} />
            <Area type='monotone' dataKey='amount' stroke='#8884d8' fill='#8884d8' />
            <Legend />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BalanceAnalysis;
