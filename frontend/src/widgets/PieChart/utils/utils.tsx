import { LabelProps } from '../lib/types';

const data = [
  { name: 'Category 1', value: 400 },
  { name: 'Category 2', value: 300 },
  { name: 'Category 3', value: 200 },
  { name: 'Category 5', value: 100 },
  { name: 'Category 5', value: 100 },
];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: LabelProps) => {
  const RADIAN = Math.PI / 180;
  const radius = 25 + innerRadius + (outerRadius - innerRadius);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const radius2 = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x2 = cx + radius2 * Math.cos(-midAngle * RADIAN);
  const y2 = cy + radius2 * Math.sin(-midAngle * RADIAN);

  return (
    <g>
      {window.innerWidth > 600 && (
        <text
          x={x}
          y={y}
          fill='black'
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline='central'
        >
          {data[index].name}
        </text>
      )}
      <text
        x={x2}
        y={y2}
        fill='white'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};

export default renderCustomizedLabel;
