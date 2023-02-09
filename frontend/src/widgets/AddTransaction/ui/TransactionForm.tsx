import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useState } from 'react';
import DatePick from '../../../features/DateRangePicker/ui/Date';
import SelectCategory from '../../../shared/ui/SelectCategory/SelectCategory';
import style from './AddTransaction.module.scss';

function nowTime() {
  const date = new Date();
  const h = date.getHours() > 9? date.getHours() : `0${date.getHours()}`;
  const m = date.getMinutes()> 9? date.getMinutes() : `0${date.getMinutes()}`;
  return `${h}:${m}`;
}

export default function TransactionForm() {
  const [formState, setFormState] = useState({
      category: '',
      description: '',
      amount: '0',
      paymentMode: 'cash',
      transactionType: 'expense',
      date: '',
      time: nowTime(),
    })

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(formState)
  }

  return (
    <Box component='form' noValidate className={style.formWrapper} 
      onSubmit={(e) => handleSubmit(e)}>
      <FormControl>
        <RadioGroup
          row
          name='transactionType'
          value={formState.transactionType}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormState({...formState, transactionType: e.target.value})}
        >
          <FormControlLabel value='income' control={<Radio />} label='Income' />
          <FormControlLabel value='expense' control={<Radio />} label='Expense' />
        </RadioGroup>
      </FormControl>
      <div className={style.block}>
<div className={style.date}>
          <DatePick/>

</div>
        <FormControl>
          <TextField
            id='time'
            label='Choose a Time'
            type='time'
            value = {formState.time}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormState({...formState, time: e.target.value})}
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
        <SelectCategory 
          updateState={(e) => setFormState({...formState, category: e.target.value})} />
        <FormControl variant='standard' sx={{ minWidth: '45%' }}>
          <TextField
            variant='standard'
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            label='Amount'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormState({...formState, amount: e.target.value})}
          />
        </FormControl>
      </div>

      <FormControl>
        <TextField
          id='standard-basic'
          label='Description'
          variant='standard'
          value={formState.description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormState({...formState, description: e.target.value})}
          sx={{ maxWidth: '95%' }}
        />
      </FormControl>
      <FormControl>
        <FormLabel sx={{ fontWeight: '700', color: 'rgba(0, 0, 0, 0.87)' }}>Payment Mode</FormLabel>
        <RadioGroup
          row
          name='paymentMode'
          value={formState.paymentMode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormState({...formState, paymentMode: e.target.value})}
        >
          <FormControlLabel value='cash' control={<Radio />} label='Cash' />
          <FormControlLabel value='debit' control={<Radio />} label='Debit Card' />
          <FormControlLabel value='credit' control={<Radio />} label='Credit Card' />
        </RadioGroup>
      </FormControl>
      <div>
        <Button 
          type='submit'
          variant='contained' 
          sx={{ fontSize: 12, padding: 1, minWidth: 150, mr: 2 }}>
        Add
      </Button>
      </div>
      
    </Box>
  );
}
