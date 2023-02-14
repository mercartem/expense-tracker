import { useEffect, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { Transaction } from '../../lib/types/transaction';
import { getIconCategory } from '../../model/categories';
import style from './TransactionRow.module.scss';
import convertData from '../../utils/utils';

interface ITransactionRowProps {
  transaction: Transaction;
  onClick?: (e: React.MouseEvent) => void;
  isSelected?: boolean;
  checkboxComponent: boolean;
}

const font = {
  fontFamily: 'Apple-System, Arial, Helvetica, STXihei, sans-serif',
  fontSize: '16px',
};

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

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <TableRow
      hover
      onClick={props.onClick}
      role='checkbox'
      tabIndex={-1}
      key={id}
      selected={props.isSelected}
      sx={{...font, textOverflow: 'ellipsis'}}
      className={style.row}
    >
      {props.checkboxComponent && (
        <TableCell padding='checkbox'>
          <Checkbox color='primary' checked={props.isSelected} />
        </TableCell>
      )}
      <TableCell align='left' style={{ textTransform: 'capitalize',  whiteSpace: 'nowrap', ...font }}>
        <img
          src={getIconCategory(category, transactionType)}
          className={style.icon}
          alt={category}
        />
        {category}
      </TableCell>
      {width >= 770 && <TableCell align='left' style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow:'hidden', textOverflow: 'ellipsis', ...font }} >{convertData(date, 'us-US')}</TableCell>}
      <TableCell align='left' style={{textTransform: 'capitalize',...font }}>
        {paymentMode}
      </TableCell>
      {width >= 770 && (
        <TableCell align='left' style={{ maxWidth: '170px',textTransform: 'capitalize', whiteSpace: 'nowrap', overflow:'hidden', textOverflow: 'ellipsis', ...font }}>
          {description}
        </TableCell>
      )}
      <TableCell
        align='left'
        style={{ color: transactionType === 'income' ? 'green' : 'red', ...font }}
      >
        {`${amount}₽`}
      </TableCell>
    </TableRow>
  );
}

export default TransactionRow;
