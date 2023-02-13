import { useSearchParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { removeQueryParams, validateBalance } from '../../shared/utils/utils';
import style from './Filter.module.scss';

interface AmountRangeProps {
  initialRange: { min: string; max: string };
  updateState: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function AmountRange({ ...props }: AmountRangeProps) {
  const [range, setRange] = useState(props.initialRange);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has('min') && searchParams.has('max')) {
      const min = searchParams.get('min');
      const max = searchParams.get('max');
      if(min && max) {
        setRange({min, max})
      }
    }
  }, [])

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id;
    setRange({ ...range, [field]: e.target.value.replace(/\D/g, '') });
    setError(!validateBalance(e.target.value));
    props.updateState(e);
    if (e.target.value) {
      searchParams.set(field, e.target.value)
      setSearchParams(searchParams);
    } else {
      removeQueryParams('min', searchParams, setSearchParams);
      removeQueryParams('max', searchParams, setSearchParams);
  }
}

  return (
    <>
      <p className={style.filterTitle}>Amount</p>
      <div className={style.filterItem}>
        <div className={style.rangeBox}>
          <span className={style.rangeLabel}>Min:</span>
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
          <span className={style.rangeLabel} id='maxLabel'>Max:</span>
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
