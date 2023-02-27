import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [datesValue, setDatesValue] = useState<DateRange>(handleDateQuery(searchParams));

  return (
    <>
      <div className={style.headerWrapper}>
        <TuneIcon />
        <h4 className={style.filterHeader}>{t('filters.title')}</h4>
      </div>
      <div className={style.filterWrapper}>
        <div className={style.filterBox}>
          <p className={style.filterTitle}>{t('filters.date')}</p>
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
          <p className={style.filterTitle}>{t('filters.category.title')}</p>
          <SelectCategory initialValue='' type='' handleQuery />
        </div>
        <div className={style.filterBox}>
          <p className={style.filterTitle}>{t('filters.type.title')}</p>
          <div className={style.filterItem}>
            <FilterCheckbox label={t('filters.type.income')} value='income' name='transactionType' />
            <FilterCheckbox label={t('filters.type.expense')}value='expense' name='transactionType' />
          </div>
        </div>
        <div className={style.filterBox}>
          <p className={style.filterTitle}>{t('filters.mode.title')}</p>
          <div className={style.filterItem}>
            <FilterCheckbox label={t('filters.mode.cash')} value='cash' name='paymentMode' />
            <FilterCheckbox label={t('filters.mode.debit')} value='debit card' name='paymentMode' />
            <FilterCheckbox label={t('filters.mode.credit')} value='credit card' name='paymentMode' />
          </div>
        </div>
        <div className={style.filterBox}>
          <AmountRange/>
        </div>
        <div className={style.buttons}>
          <Button type='button' variant='outlined' onClick={handleApply}>
          {t('button.apply')}
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
            {t('button.reset')}
          </Button>
        </div>
      </div>
    </>
  );
}
