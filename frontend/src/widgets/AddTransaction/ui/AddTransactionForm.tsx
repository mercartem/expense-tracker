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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {window.innerWidth < 770 && (
        <AddBoxIcon sx={{ color: '#6890FB', width: 45, height: 45 }} onClick={handleOpen} />
      )}
      {window.innerWidth >= 770 && (
        <Button
          variant='contained'
          sx={{ fontSize: 12, padding: 1, minWidth: 150 }}
          onClick={handleOpen}
        >
          {' '}
          Add Transaction
        </Button>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box className={styles.modal} sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2' className={styles.title}>
            Add Transaction
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
