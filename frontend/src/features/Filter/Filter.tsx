import { useSearchParams } from 'react-router-dom';
import {  useState } from 'react';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { Button } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { DatePick } from '../DateRangePicker/ui/Date';
import style from './Filter.module.scss';
import FilterCheckbox from '../../shared/ui/FilterCheckbox/FilterCheckbox';
import SelectCategory from '../../shared/ui/SelectCategory/SelectCategory';
import AmountRange from './AmountRange';
import { defaultDates, handleDateQuery } from './utils/utils';

export interface IFilterProps {
  handleApply: () => void;
  handleReset: () => void;
}


export default function Filter({ handleApply, handleReset }: IFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [datesValue, setDatesValue] = useState<DateRange>(handleDateQuery(searchParams));

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
            period={datesValue}
            value={datesValue}
            fetchData={(dates) => {
              if (dates) {
                searchParams.set('from', dates[0].toISOString());
                searchParams.set('to', dates[1].toISOString());
                setSearchParams(searchParams);
                setDatesValue(dates);
              }
            }}
          />
        </div>
        <div className={style.filterBox}>
          <p className={style.filterTitle}>Category</p>
          <SelectCategory initialValue='' type='' handleQuery />
        </div>
        <div className={style.filterBox}>
          <p className={style.filterTitle}>Cashflow</p>
          <div className={style.filterItem}>
            <FilterCheckbox label='Income' value='income' name='transactionType' />
            <FilterCheckbox label='Expense' value='expense' name='transactionType' />
          </div>
        </div>
        <div className={style.filterBox}>
          <p className={style.filterTitle}>Payment Mode</p>
          <div className={style.filterItem}>
            <FilterCheckbox label='Cash' value='cash' name='paymentMode' />
            <FilterCheckbox label='Debit Card' value='debit card' name='paymentMode' />
            <FilterCheckbox label='Credit Card' value='credit card' name='paymentMode' />
          </div>
        </div>
        <div className={style.filterBox}>
          <AmountRange/>
        </div>
        <div className={style.buttons}>
          <Button type='button' variant='outlined' onClick={handleApply}>
            Apply
          </Button>
          <Button
            type='button'
            variant='outlined'
            onClick={() => {
              setDatesValue(defaultDates);
              setSearchParams({});
              handleReset();
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </>
  );
}
