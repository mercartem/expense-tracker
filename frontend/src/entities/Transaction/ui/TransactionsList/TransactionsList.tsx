import { TableBody } from '@mui/material';
import { Transaction } from '../../lib/types/transaction';
import TransactionRow from '../TransactionRow/TransactionRow';

interface ITransactionsListProps {
  transactions: Transaction[];
  onClick: (e: React.MouseEvent) => void;
  selectedItems: string[];
  checkboxComponent: boolean;
}

function TransactionsList({ ...props }: ITransactionsListProps) {
  const { transactions, selectedItems } = props;
  const isSelected = (id: string) => selectedItems.indexOf(id) !== -1;
  return (
    <TableBody>
      {transactions.map((transaction) => {
        const { _id: id } = transaction;
        return (
          <TransactionRow
            key={id}
            transaction={transaction}
            isSelected={isSelected(id)}
            {...props}
          />
        );
      })}
    </TableBody>
  );
}

export default TransactionsList;
