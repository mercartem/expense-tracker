import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { Transaction } from '../../lib/types/transaction';
import { getIconCategory } from '../../model/categories';
import style from './TransactionRow.module.scss';

interface ITransactionRowProps {
  transaction: Transaction;
  onClick: (e: React.MouseEvent) => void;
  isSelected: boolean;
  checkboxComponent: boolean;
}

function TransactionRow({ ...props }: ITransactionRowProps) {
  const {
    _id: id,
    category,
    date,
    paymentMode,
    description,
    amount,
    transactionType,
  } = props.transaction;
  return (
    <TableRow
      hover
      onClick={props.onClick}
      role='checkbox'
      tabIndex={-1}
      key={id}
      selected={props.isSelected}
    >
      {props.checkboxComponent && (
        <TableCell padding='checkbox'>
          <Checkbox color='primary' checked={props.isSelected} />
        </TableCell>
      )}
      <TableCell align='left' style={{ textTransform: 'capitalize' }}>
        <img
          src={getIconCategory(category, transactionType)}
          className={style.icon}
          alt={category}
        />
        {category}
      </TableCell>
      {window.innerWidth >= 770 && <TableCell align='left'>{date}</TableCell>}
      <TableCell align='left' style={{ textTransform: 'capitalize' }}>
        {paymentMode}
      </TableCell>
      {window.innerWidth >= 770 && (
        <TableCell align='left' style={{ textTransform: 'capitalize' }}>
          {description}
        </TableCell>
      )}
      <TableCell align='left' style={{ color: transactionType === 'income' ? 'green' : 'red' }}>
        {amount}
      </TableCell>
    </TableRow>
  );
}

export default TransactionRow;
