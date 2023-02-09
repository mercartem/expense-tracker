import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TransactionModal from '../../../shared/ui/Modal/TransactionModal';
import TransactionForm from './TransactionForm';

export default function AddTransactionForm() {
  return (
    <TransactionModal>
      <TransactionForm />
    </TransactionModal>
  );
}
