import { Box, Button, FormControl, FormControlLabel, FormLabel, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useState } from 'react';
import { Transaction } from '../../../entities/Transaction/lib/types/transaction';
import DatePick from '../../DateRangePicker/ui/Date';
import SelectCategory from '../../../shared/ui/SelectCategory/SelectCategory';
import { ITransactionFormState } from '../lib/types';
import style from './Transaction.module.scss';

interface ITransactionFormProps {
  handleClose: () => void;
  initialValues: ITransactionFormState;
  handleApi: (formData: ITransactionFormState) => Promise<string | Partial<Transaction>>;
  buttonName: string;
  updateTransactions: () => Promise<void>;
}

export default function TransactionForm({ ...props }: ITransactionFormProps) {
  const { initialValues, handleClose, handleApi, buttonName, updateTransactions } = props;
  const [formState, setFormState] = useState<ITransactionFormState>(initialValues);
  const [typeSelect, setTypeSelect] = useState(initialValues.transactionType);
  const [errors, setErrors] = useState({
    isValid: false,
    globalError: '',
    formErrors: {
      category: '',
      description: '',
      amount: '',
    },
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, field: string) {
    setFormState({ ...formState, [field]: e.target.value });
  }

  function handleValidation() {
    const fields = formState;
    const formErrors = { description: '', amount: '', category: '' };
    let formIsValid = true;

    if (!fields.description.length) {
      formIsValid = false;
      formErrors.description = 'Cannot be empty';
    }
    if (!fields.amount.length) {
      formIsValid = false;
      formErrors.amount = 'Cannot be empty';
    }

    if (!fields.category.length) {
      formIsValid = false;
      formErrors.category = 'Select any category';
    }
    setErrors({ ...errors, isValid: formIsValid, formErrors });
    return formIsValid;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (handleValidation()) {
      const response = await handleApi(formState);
      if (typeof response === 'string') {
        setErrors({ ...errors, globalError: response });
      } else {
        handleClose();
        updateTransactions();
        setFormState(initialValues);
      }
    }
  }

  return (
    <>
      {errors.globalError && <p>{errors.globalError}</p>}
      <Box
        component='form'
        noValidate
        className={style.formWrapper}
        onSubmit={(e) => handleSubmit(e)}
      >
        <FormControl>
          <RadioGroup
            row
            name='transactionType'
            value={formState.transactionType}
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value === 'income' || e.target.value === 'expense') {
                setFormState({ ...formState, transactionType: e.target.value, category: '' });
                setTypeSelect(e.target.value);
              }
            }}
          >
            <FormControlLabel value='income' control={<Radio />} label='Income' />
            <FormControlLabel value='expense' control={<Radio />} label='Expense' />
          </RadioGroup>
        </FormControl>
        <div className={style.block}>
          <div className={style.date}>
            <DatePick
              period={formState.date}
              fetchData={(dates) => setFormState({ ...formState, date: dates })}
            />
          </div>
          <FormControl>
            <TextField
              id='time'
              type='time'
              value={formState.time}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'time')}
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              sx={{ minWidth: '45%', width: '205px', height: '35px' }}
            />
          </FormControl>
        </div>
        <div className={style.block}>
          <SelectCategory
            error={Boolean(errors.formErrors.category)}
            type={typeSelect}
            initialValue={formState.category}
            updateState={(e) => setFormState({ ...formState, category: e.target.value })}
          />
          <FormControl variant='standard' sx={{ minWidth: '45%' }}>
            <TextField
              required
              error={Boolean(errors.formErrors.amount)}
              helperText={errors.formErrors.amount ?? ''}
              variant='standard'
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              label='Amount'
              value={formState.amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormState({ ...formState, amount: e.target.value.replace(/\D/g, '') })
              }
            />
          </FormControl>
        </div>
        <FormControl>
          <TextField
            required
            error={Boolean(errors.formErrors.description)}
            helperText={errors.formErrors.description ?? ''}
            id='standard-basic'
            label='Description'
            variant='standard'
            value={formState.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'description')}
            sx={{ maxWidth: '95%' }}
          />
        </FormControl>
        <FormControl>
          <FormLabel sx={{ fontWeight: '700', color: 'rgba(0, 0, 0, 0.87)' }}>
            Payment Mode
          </FormLabel>
          <RadioGroup
            row
            name='paymentMode'
            value={formState.paymentMode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'paymentMode')}
          >
            <FormControlLabel value='cash' control={<Radio />} label='Cash' />
            <FormControlLabel value='debit card' control={<Radio />} label='Debit Card' />
            <FormControlLabel value='credit card' control={<Radio />} label='Credit Card' />
          </RadioGroup>
        </FormControl>
        <div className={style.buttons}>
          <Button
            type='submit'
            variant='contained'
            sx={{ fontSize: 12, padding: 1, minWidth: 150, mr: 2 }}
          >
            {buttonName.toUpperCase()}
          </Button>
          <Button
            variant='outlined'
            onClick={handleClose}
            sx={{ fontSize: 12, padding: 1, minWidth: 150, mr: 2 }}
          >
            Cancel
          </Button>
        </div>
      </Box>
    </>
  );
}
