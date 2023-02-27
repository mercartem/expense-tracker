import { Table, TableBody, TableContainer } from '@mui/material';
import TableHeadTransactions from '../../../../shared/ui/TableHeadTransactions/TableHeadTransactions';
import { Transaction } from '../../lib/types/transaction';
import TransactionRow from '../TransactionRow/TransactionRow';

function TransactionsList({ transactions }: { transactions: Transaction[] }) {
  return (
    <TableContainer sx={{ backgroundColor: 'white', borderRadius: '5px' }}>
      <Table sx={{ width: '100%' }} aria-labelledby='tableTitle' size='small'>
        <TableHeadTransactions checkboxComponent={false} />
        <TableBody sx={{ minWidth: '100%'}}>
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
