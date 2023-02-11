import { Table, TableBody, TableContainer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../../../../pages/Transactions/model/model';
import TableHeadTransactions from '../../../../shared/ui/TableHeadTransactions/TableHeadTransactions';
import { Transaction } from '../../lib/types/transaction';
import TransactionRow from '../TransactionRow/TransactionRow';

function TransactionsList({ transactions }: { transactions: Transaction[] }) {
  // const [transactions, setTransactions] = useState<Transaction[]>([]);

  // // тут временно вставила эту функцию из другого компонента,
  // // переопредели себе с правильной сортировкой по дате и кол-м позиций

  // useEffect(() => {
  //   fetchTransactions(setTransactions, 1, 5);
  // }, []);

  return (
    <TableContainer sx={{ backgroundColor: 'white', borderRadius: '5px' }}>
      <Table sx={{ width: '100%' }} aria-labelledby='tableTitle' size='small'>
        <TableHeadTransactions checkboxComponent={false} />
        <TableBody sx={{ minWidth: '100%' }}>
          {transactions.map((transaction) => {
            const { _id: id } = transaction;
            return <TransactionRow key={id} transaction={transaction} checkboxComponent={false} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionsList;
