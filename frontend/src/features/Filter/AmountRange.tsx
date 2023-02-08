import { TextField } from '@mui/material';
import { useState } from 'react';
import { validateBalance } from '../../shared/utils/utils';
import style from './Filter.module.scss';

interface AmountRangeProps {
  initialRange: { min: string; max: string };
  updateState: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function AmountRange({ ...props }: AmountRangeProps) {
  const [range, setRange] = useState(props.initialRange);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id;
    setRange({ ...range, [field]: e.target.value.replace(/\D/g, '') });
    setError(!validateBalance(e.target.value));
    props.updateState(e);
  };

  return (
    <>
      <p className={style.filterTitle}>Amount</p>
      <div className={style.filterItem}>
        <div>
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
        <div>
          <span className={style.rangeLabel}> - Max:</span>
          <TextField
            className={style.rangeBox}
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
