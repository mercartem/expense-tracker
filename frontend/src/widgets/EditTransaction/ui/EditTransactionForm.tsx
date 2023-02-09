import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TransactionForm from '../../../features/TransactionForm/ui/TransactionForm';
import { editTransaction, getTransactionValues, nowTime } from '../utils/utils';
import { ITransactionFormState } from '../../../features/TransactionForm/lib/types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const defaultState: ITransactionFormState = {
  category: '',
  description: '',
  amount: '',
  paymentMode: 'cash',
  transactionType: 'expense',
  date: [ new Date(), new Date()],
  time: nowTime(),
}

interface IAddTransactionFormProps {
  id: string;
  updateTransactions: () => Promise<void>;
  active: boolean;
} 

export default function EditTransactionForm({...props}: IAddTransactionFormProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [transactionValues, setTransactionValues] = useState(defaultState);

  useEffect(() => {
     const fetchData = async () => {
      const data = await getTransactionValues(props.id);
      setTransactionValues(data)
     }
     fetchData();
  }, []);

      return (
        <div>
          <Button 
                variant='text' 
                startIcon={<EditIcon />} 
                size='medium' 
                disabled={props.active}
                onClick={async ()=> {
                  handleOpen();
                  const data = await getTransactionValues(props.id);
                  console.log(data)
                  setTransactionValues(data);
                  }}>
                Edit
              </Button>
          <Modal
            open={open}
            onClose={handleClose}
          >
            <Box sx={style}>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Edit Transaction
              </Typography>
              <CloseIcon
                sx={{ position: 'absolute', top: '10px', right: '10px' }}
                onClick={handleClose}
              />
              <TransactionForm 
                updateTransactions={props.updateTransactions}
                handleApi={editTransaction}
                initialValues={transactionValues}
                handleClose={handleClose}
                buttonName='add'/>
            </Box>
          </Modal>
        </div>
      );
    }
    