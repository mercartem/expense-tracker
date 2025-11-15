import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { validateBalance } from '../../shared/utils/utils';
import style from './Filter.module.scss';
import { defaultAmountValues, getRangeValues } from './utils/utils';

interface AmountRangeProps {
  initialRange?: { min: string; max: string };
  updateState?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function AmountRange() {
  const { t } = useTranslation();
  const [range, setRange] = useState(defaultAmountValues);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getRangeValues(searchParams).then((values) => setRange(values));
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id;
    setRange({ ...range, [field]: e.target.value.replace(/\D/g, '') });
    setError(!validateBalance(e.target.value));

    if (e.target.value) {
      const newQuery = { ...range, [field]: e.target.value };
      searchParams.set('min', newQuery.min);
      searchParams.set('max', newQuery.max);
      setSearchParams(searchParams);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <p className={style.filterTitle}>{t('filters.amount.title')}</p>
      <div className={style.filterItem}>
        <div className={style.rangeBox}>
          <span className={style.rangeLabel}>{t('filters.amount.min')}</span>
          <TextField
            className={style.rangeBox}
            value={range.min}
            type='text'
            size='small'
            id='min'
            variant='standard'
            error={error}
            onChange={handleChange}
          />
        </div>
        <div className={style.rangeBox}>
          <span className={style.rangeLabel} id='maxLabel'>
            {t('filters.amount.max')}
          </span>
          <TextField
            value={range.max}
            id='max'
            type='text'
            size='small'
            variant='standard'
            error={error}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
}

export default AmountRange;
