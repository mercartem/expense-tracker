import { useTranslation } from 'react-i18next';
import * as React from 'react';
import Box from '@mui/material/Box';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TransactionForm from '../../../features/TransactionForm/ui/TransactionForm';
import { addTransaction, nowTime } from '../utils/utils';
import { ITransactionFormState } from '../../../features/TransactionForm/lib/types';
import styles from './Add.module.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  '@media (max-width: 770px)': {
    transform: 'translate(10vw, 10%)',
    top: '0%',
    left: '0%',
    p: 3
  }
};

const defaultState: ITransactionFormState = {
  category: '',
  description: '',
  amount: '',
  paymentMode: 'cash',
  transactionType: 'expense',
  date: new Date(),
  time: nowTime(),
};

interface IAddTransactionFormProps {
  updateTransactions: () => Promise<void>;
}

export default function AddTransactionForm({ ...props }: IAddTransactionFormProps) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {window.innerWidth < 770 && (
        <AddBoxIcon sx={{ color: '#6890FB', width: 45, height: 45, ':hover': { cursor: 'pointer' } }} onClick={handleOpen} />
      )}
      {window.innerWidth >= 770 && (
        <Button
          variant='contained'
          sx={{ fontSize: 12, padding: 1, minWidth: 150 }}
          onClick={handleOpen}
        >
          {' '}
          {t('button.add')}
        </Button>
      )}
      <Modal open={open} onClose={handleClose} style={{ overflow: 'scroll' }}>
        <Box className={styles.modal} sx={style}>
          <Typography id='modal-modal-title' component='h2' className={styles.title}>
            {t('add.title')}
          </Typography>
          <CloseIcon
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              ':hover': { cursor: 'pointer' },
            }}
            onClick={handleClose}
          />
          <TransactionForm
            updateTransactions={props.updateTransactions}
            handleApi={addTransaction}
            initialValues={defaultState}
            handleClose={handleClose}
            buttonName='add'
          />
        </Box>
      </Modal>
    </div>
  );
}
