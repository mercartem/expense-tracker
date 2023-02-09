import PieChartExpenses from './PieChart';
import '../style/ExpensesAnalysis.scss';
import { ExpensesAnalysisProps } from '../lib/types';

function ExpensesAnalysis({ categories }: ExpensesAnalysisProps) {
  return (
    <div className='expenses-analysis'>
      <p className='expenses-analysis__title'>Total Expenses</p>
      <p className='expenses-analysis__period'>Sep 1 - Nov 30</p>
      <div className='expenses-analysis__chart'>
        <PieChartExpenses categories={categories} />
        <table>
          <tr>
            <td>0</td>
            <td>Shopping</td>
            <td>2000Р</td>
            <td>50%</td>
          </tr>
          <tr>
            <td>0</td>
            <td>Shopping</td>
            <td>2000Р</td>
            <td>50%</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default ExpensesAnalysis;
