import { useTranslation } from 'react-i18next';
import { Box, Button, FormControl, FormControlLabel, FormLabel, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useState } from 'react';
import { Transaction } from '../../../entities/Transaction/lib/types/transaction';
import { DatePickOne } from '../../DateRangePicker/ui/Date';
import SelectCategory from '../../../shared/ui/SelectCategory/SelectCategory';
import { ITransactionFormState } from '../lib/types';
import style from './Transaction.module.scss';
import { getTime } from '../utils/utils';

const font = {
  fontFamily: 'Apple-System, Arial, Helvetica, STXihei, sans-serif',
  fontSize: '16px',
};

interface ITransactionFormProps {
  handleClose: () => void;
  initialValues: ITransactionFormState;
  handleApi: (formData: ITransactionFormState) => Promise<string | Partial<Transaction>>;
  buttonName: string;
  updateTransactions: () => Promise<void>;
}

export default function TransactionForm({ ...props }: ITransactionFormProps) {
  const { t } = useTranslation();
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
    const {description, category, amount} = formState;
    const formErrors = { description: '', amount: '', category: '' };
    let formIsValid = true;

    if (description.length < 3) {
      formIsValid = false;
      formErrors.description = (description.length === 0)?  `${t('error.emptyInput')}`:`${t('error.shortDescription')}`;
    }

    if (!amount.length) {
      formIsValid = false;
      formErrors.amount = `${t('error.emptyInput')}`;
    }

    if (!category.length) {
      formIsValid = false;
      formErrors.category = `${t('error.emptySelect')}`;
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
      <Box
        component='form'
        noValidate
        className={style.formWrapper}
        onSubmit={(e) => handleSubmit(e)}
      >
        <FormControl>
          <RadioGroup
            sx={{ input: font, span: font, color: 'rgba(0, 0, 0, 0.87)' }}
            row
            name='transactionType'
            value={formState.transactionType}
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value === 'income' || e.target.value === 'expense') {
                setFormState({ ...formState, transactionType: e.target.value});
                setTypeSelect(e.target.value);
              }
            }}
          >
            <FormControlLabel value='income' control={<Radio />} label={t('filters.type.income')} />
            <FormControlLabel value='expense' control={<Radio />} label={t('filters.type.expense')}/>
          </RadioGroup>
        </FormControl>
        <div className={style.block}>
          <div className={style.date}>
            <DatePickOne
              initialDate={formState.date}
              fetchData={(dates) =>
                setFormState({ ...formState, date: dates, time: getTime(dates) })
              }
            />
          </div>
        </div>
        <div className={style.block}>
          <SelectCategory
            error={Boolean(errors.formErrors.category)}
            type={typeSelect}
            handleQuery={false}
            initialValue={formState.category}
            updateState={(e) => setFormState({ ...formState, category: e.target.value })}
          />
          <FormControl variant='standard' sx={{ ...font, minWidth: '45%' }}>
            <TextField
              sx={{ input: font, label: font }}
              required
              error={Boolean(errors.formErrors.amount)}
              helperText={errors.formErrors.amount ?? ''}
              variant='standard'
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              label={t('filters.amount.title')}
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
            label={t('description')}
            variant='standard'
            value={formState.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'description')}
            sx={{ maxWidth: '95%', input: font, label: font }}
          />
        </FormControl>
        <FormControl>
          <FormLabel sx={{ fontWeight: '700', color: 'rgba(0, 0, 0, 0.87)', ...font }}>
            {t('paymentType.title')}
          </FormLabel>
          <RadioGroup
            sx={{ input: font, span: font, color: 'rgba(0, 0, 0, 0.87)' }}
            row
            name='paymentMode'
            value={formState.paymentMode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'paymentMode')}
          >
            <FormControlLabel value='cash' control={<Radio />} label={t('filters.mode.cash')}/>
            <FormControlLabel value='debit card' control={<Radio />} label={t('filters.mode.debit')} />
            <FormControlLabel value='credit card' control={<Radio />} label={t('filters.mode.credit')} />
          </RadioGroup>
        </FormControl>
        <div className={style.buttons}>
          <Button
            type='submit'
            variant='contained'
            sx={{ fontSize: 12, padding: 1, minWidth: 150, mr: 2 }}
          >
            {t(`button.${buttonName}`)}
          </Button>
          <Button
            variant='outlined'
            onClick={handleClose}
            sx={{ fontSize: 12, padding: 1, minWidth: 150, mr: 2 }}
          >
            {t('button.cancel')}
          </Button>
        </div>
      </Box>
  );
}
