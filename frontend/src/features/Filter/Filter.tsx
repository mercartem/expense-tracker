import { useState } from 'react';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import TuneIcon from '@mui/icons-material/Tune';
import DatePick from '../DateRangePicker/ui/Date';
import style from './Filter.module.scss';
import FilterCheckbox from '../../shared/ui/FilterCheckbox/FilterCheckbox';
import SelectCategory from '../../shared/ui/SelectCategory/SelectCategory';
import AmountRange from './AmountRange';

interface IFilterActiveProps {
  date: DateRange | null;
  category: string;
  transactionType: {
    income: boolean;
    expense: boolean;
  };
  paymentMode: {
    cash: boolean;
    debit: boolean;
    credit: boolean;
  };
  amount: {
    min: string;
    max: string;
  };
}
const defaultFilterState: IFilterActiveProps = {
  date: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
  category: '',
  transactionType: {
    income: false,
    expense: false,
  },
  paymentMode: {
    cash: false,
    debit: false,
    credit: false,
  },
  amount: {
    min: '10',
    max: '10000',
  },
};

export default function Filter() {
  const [filterActive, setActiveFilters] = useState<IFilterActiveProps>(defaultFilterState);
  const { transactionType, paymentMode } = filterActive;

  return (
    <>
      <div className={style.headerWrapper}>
        <TuneIcon />
        <h4 className={style.filterHeader}>Filters</h4>
      </div>
      <div className={style.filterWrapper}>
        <div className={style.filterBox}>
          <p className={style.filterTitle}>Select a range</p>
          <DatePick 
            period = {filterActive.date}
            fetchData={(dates) => setActiveFilters({...filterActive, date: dates})}/>
        </div>
        <div className={style.filterBox}>
          <p className={style.filterTitle}>Category</p>
          <SelectCategory
            type = ''
            updateState={(e) => {
              const cleanValue = e.target.value.replace(' ', '');
              setActiveFilters({ ...filterActive, category: cleanValue });
            }}
          />
        </div>
        <div className={style.filterBox}>
          <p className={style.filterTitle}>Cashflow</p>
          <div className={style.filterItem}>
            <FilterCheckbox
              label='Income'
              value='income'
              name='transactionType'
              checked={transactionType.income}
              updateState={(e) => {
                setActiveFilters({
                  ...filterActive,
                  transactionType: { ...transactionType, income: e.target.checked },
                });
              }}
            />
            <FilterCheckbox
              label='Expense'
              value='expense'
              name='cashflow'
              checked={transactionType.expense}
              updateState={(e) => {
                setActiveFilters({
                  ...filterActive,
                  transactionType: { ...transactionType, expense: e.target.checked },
                });
              }}
            />
          </div>
        </div>
        <div className={style.filterBox}>
          <p className={style.filterTitle}>Payment Mode</p>
          <div className={style.filterItem}>
            <FilterCheckbox
              label='Cash'
              value='cash'
              name='paymentMode'
              checked={paymentMode.cash}
              updateState={(e) => {
                setActiveFilters({
                  ...filterActive,
                  paymentMode: { ...paymentMode, cash: e.target.checked },
                });
              }}
            />
            <FilterCheckbox
              label='Debit Card'
              value='debit'
              name='paymentMode'
              checked={paymentMode.debit}
              updateState={(e) => {
                setActiveFilters({
                  ...filterActive,
                  paymentMode: { ...paymentMode, debit: e.target.checked },
                });
              }}
            />
            <FilterCheckbox
              label='Credit Card'
              value='credit'
              name='paymentMode'
              checked={paymentMode.credit}
              updateState={(e) => {
                setActiveFilters({
                  ...filterActive,
                  paymentMode: { ...paymentMode, credit: e.target.checked },
                });
              }}
            />
          </div>
        </div>
        <div className={style.filterBox}>
          <AmountRange
            initialRange={filterActive.amount}
            updateState={(e) => {
              const field = e.target.id;
              const newAmount = { ...filterActive.amount, [field]: e.target.value };
              setActiveFilters({ ...filterActive, amount: newAmount });
            }}
          />
        </div>
      </div>
    </>
  );
}
