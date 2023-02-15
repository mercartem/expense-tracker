/* eslint-disable react/no-array-index-key */
import { useTranslation } from 'react-i18next';
import PieChartExpenses from './PieChart';
import '../style/ExpensesAnalysis.scss';
import { ExpensesAnalysisProps } from '../lib/types';
import SummaryCategory from './Category';
import COLORS from '../../../shared/constants/color';

function ExpensesAnalysis({ categories, period }: ExpensesAnalysisProps) {
  const { t } = useTranslation();
  const total: number = categories.reduce((sum, { value }) => sum + value, 0);
  const startMonth = period && period[0].toLocaleString('en-US', { month: 'short' });
  const endMonth = period && period[1].toLocaleString('en-US', { month: 'short' });
  return (
    <div className='expenses-analysis'>
      <p className='expenses-analysis__title'>{t('dashboardPage.sectionTitle.exp')}</p>
      <p className='expenses-analysis__period'>
        {period && `${startMonth} ${period[0].getDate()} - ${endMonth} ${period[1].getDate()}`}
      </p>
      <div className='expenses-analysis__chart'>
        <PieChartExpenses categories={categories} />
        <table className='pie-chart-legend'>
          <tbody>
            {categories
              .map(({ name, value }, i) => (
                <SummaryCategory
                  key={i}
                  category={t(`categoriesNames.${name}`)} 
                  amount={value}
                  percent={(value / total) * 100}
                  color={COLORS[i % COLORS.length]}
                />
              ))
              .sort((a, b) => b.props.amount - a.props.amount)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpensesAnalysis;
