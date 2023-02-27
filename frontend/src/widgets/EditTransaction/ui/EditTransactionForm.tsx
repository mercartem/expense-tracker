import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TransactionForm from '../../../features/TransactionForm/ui/TransactionForm';
import { editTransaction, getTransactionValues, nowTime } from '../utils/utils';
import { ITransactionFormState } from '../../../features/TransactionForm/lib/types';
import styles from './Edit.module.scss';

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
  id: string;
  updateTransactions: () => Promise<void>;
  active: boolean;
}

export default function EditTransactionForm({ ...props }: IAddTransactionFormProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [transactionValues, setTransactionValues] = useState(defaultState);

  const handleEditTransaction = (data: ITransactionFormState) => editTransaction(data, props.id);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTransactionValues(props.id);
      setTransactionValues(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Button
        variant='text'
        startIcon={<EditIcon />}
        size='medium'
        disabled={props.active}
        onClick={async () => {
          const data = await getTransactionValues(props.id);
          await setTransactionValues(data);
          handleOpen();
        }}
      >
        {t('button.edit')}
      </Button>
      <Modal open={open} onClose={handleClose} style={{ overflow: 'scroll' }}>
        <Box className={styles.modal} sx={style}>
          <Typography id='modal-modal-title' component='h2' className={styles.title}>
            {t('edit.title')}
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
            handleApi={handleEditTransaction}
            initialValues={transactionValues}
            handleClose={handleClose}
            buttonName='edit'
          />
        </Box>
      </Modal>
    </div>
  );
}
