import { DateRange } from 'rsuite/esm/DateRangePicker';
import getAllUserTransactions from '../../../entities/Transaction/api/getAllUserTransactions';
import { getToken } from '../../../shared/utils/utils';

const getRange = async () => {
  const token = getToken();
  const range = { min:'10', max:'10000'};
  if (token) {
    const transactions = await getAllUserTransactions(token);
    if (transactions.length) {
      const sortedTransactions = transactions.sort((a, b) => a.amount - b.amount)
      range.min = `${sortedTransactions[0].amount}`;
      range.max = `${sortedTransactions[sortedTransactions.length - 1].amount}`;
    }
  }
  return range;
};

const defaultAmountValues = { min:'10', max:'10000'};


const getRangeValues = async (params: URLSearchParams) => {
  const defaultValues = await getRange();

  if (params.has('min') && params.has('max')) {
    const min = params.get('min') as string;
    const max = params.get('max') as string;
    return { min, max }
  } 
  return defaultValues;
}

const defaultDates: DateRange = [new Date(new Date().getFullYear() - 1, 0, 1), new Date()];

const handleDateQuery = (params: URLSearchParams) => {
  const initialDates: DateRange = defaultDates;
  if (params.has('from')) {
    const fromDate = params.get('from') as string;
    const toDate = params.get('to') as string;
    const newDates: DateRange = [new Date(fromDate), new Date(toDate)];
    return newDates;
  }
  return initialDates;
};

export { getRange, handleDateQuery, defaultDates, getRangeValues, defaultAmountValues };
