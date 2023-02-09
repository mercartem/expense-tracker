/* eslint-disable react/no-array-index-key */
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ExpensesAnalysisProps, LabelProps } from '../lib/types';

const COLORS = [
  '#61EFCD',
  '#CDDE1F',
  '#FEC200',
  '#CA765A',
  '#2485FA',
  '#F57D7D',
  '#C152D2',
  '#8854D9',
  '#3D4EB8',
  '#00BCD7',
];

function PieChartExpenses({ categories }: ExpensesAnalysisProps) {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    fill,
    percent,
    name,
  }: LabelProps) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 0) * cos;
    const sy = cy + (outerRadius + 0) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 10;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        {window.innerWidth > 600 && (
          <>
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill='none' />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
            <text
              x={ex + (cos >= 0 ? 1 : -1) * 5}
              y={ey}
              textAnchor={textAnchor}
              fill='#333'
            >{`${name} (${(percent * 100).toFixed()}%)`}</text>
          </>
        )}
      </g>
    );
  };

  return (
    <div className='pie-chart-wrapper'>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={categories}
            label={renderCustomizedLabel}
            fill='#8884d8'
            dataKey='value'
            innerRadius={80}
            labelLine={window.innerWidth > 600}
          >
            {categories.map((entry, index) => (
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
