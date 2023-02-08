import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { DatePicker } from 'rsuite';
import categories from '../../../shared/constants/categories';
import SelectCategory from '../../../shared/ui/SelectCategory/SelectCategory';
import style from './AddTransaction.module.scss';

function nowTime() {
  const date = new Date();
  const h = date.getHours();
  const m = date.getMinutes();
  return `${h}:${m}`;
}

export default function TransactionForm() {
  return (
    <Box component='form' noValidate className={style.formWrapper}>
      <FormControl>
        <RadioGroup
          row
          name='transactionType'
          // value={value}
          // onChange={handleChange}
        >
          <FormControlLabel value='income' control={<Radio />} label='Income' />
          <FormControlLabel value='outcome' control={<Radio />} label='Outcome' />
        </RadioGroup>
      </FormControl>
      <div className={style.block}>
        <div className={style.date}>
          <DatePicker />
        </div>
        <FormControl>
          <TextField
            id='time'
            label='Choose a Time'
            type='time'
            defaultValue={nowTime()}
            size='small'
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ minWidth: '45%' }}
          />
        </FormControl>
      </div>

      <div className={style.block}>
        <SelectCategory updateState={(e) => console.log(e.target.value)} />
        <FormControl variant='standard' sx={{ minWidth: '45%' }}>
          <TextField
            variant='standard'
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            label='Amount'
          />
        </FormControl>
      </div>

      <FormControl>
        <TextField
          id='standard-basic'
          label='Description'
          variant='standard'
          sx={{ maxWidth: '95%' }}
        />
      </FormControl>
      <FormControl>
        <FormLabel sx={{ fontWeight: '700', color: 'rgba(0, 0, 0, 0.87)' }}>Payment Mode</FormLabel>
        <RadioGroup
          row
          name='paymentMode'
          // value={value}
          // onChange={handleChange}
        >
          <FormControlLabel value='cash' control={<Radio />} label='Cash' />
          <FormControlLabel value='debit' control={<Radio />} label='Debit Card' />
          <FormControlLabel value='credit' control={<Radio />} label='Credit Card' />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
