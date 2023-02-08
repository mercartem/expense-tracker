import PieChartExpenses from './PieChart';
import '../style/ExpensesAnalysis.scss';

function ExpensesAnalysis() {
  return (
    <div className='expenses-analysis'>
      <p className='expenses-analysis__title'>Total Expenses</p>
      <p className='expenses-analysis__period'>Sep 1 - Nov 30</p>
      <div className='expenses-analysis__chart'>
        <PieChartExpenses />
        <ul>
          <li>11111111111111111111111</li>
          <li>2</li>
        </ul>
      </div>
    </div>
  );
}

export default ExpensesAnalysis;
