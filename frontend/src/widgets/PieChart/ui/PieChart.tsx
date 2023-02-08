/* eslint-disable react/no-array-index-key */
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import renderCustomizedLabel from '../utils/utils';

const data = [
  { name: 'Category 1', value: 400 },
  { name: 'Category 2', value: 300 },
  { name: 'Category 3', value: 200 },
  { name: 'Category 5', value: 100 },
  { name: 'Category 5', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function PieChartExpenses() {
  return (
    <div className='pie-chart-wrapper'>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            label={renderCustomizedLabel}
            fill='#8884d8'
            dataKey='value'
            labelLine={window.innerWidth > 600}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartExpenses;
