import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { Transaction } from '../../lib/types/transaction';
import { getIconCategory } from '../../model/categories';
import style from './TransactionRow.module.scss';
import convertData, { capitalizeDescription } from '../../utils/utils';

interface ITransactionRowProps {
  transaction: Transaction;
  onClick?: (e: React.MouseEvent) => void;
  isSelected?: boolean;
  checkboxComponent: boolean;
}

const font = {
  fontFamily: 'Apple-System, Arial, Helvetica, STXihei, sans-serif',
  fontSize: '14px',
};

function TransactionRow({ ...props }: ITransactionRowProps) {
  const { t, i18n } = useTranslation();
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
  const locale = i18n.language
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
        <TableCell padding='checkbox' style={{padding: '5px', width:'15px'}} >
          <Checkbox color='primary' checked={props.isSelected}/>
        </TableCell>
      )}
      <TableCell align='left' style={{paddingRight: 1, maxWidth: '180px', whiteSpace: 'nowrap', overflow:'hidden', textOverflow: 'ellipsis', ...font }}>
        <img
          src={getIconCategory(category, transactionType)}
          className={style.icon}
          alt={category}
        />
        {t(`categoriesNames.${category}`)}
      </TableCell>
      {width >= 770 && <TableCell align='left' style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow:'hidden', textOverflow: 'ellipsis', ...font }} >{convertData(date, locale)}</TableCell>}
      {width > 500 && <TableCell align='left' style={{...font }}>
        {t(`paymentType.${paymentMode}`)}
      </TableCell>}
      {width >= 770 && (
        <TableCell align='left' style={{ maxWidth: '170px', whiteSpace: 'nowrap', overflow:'hidden', textOverflow: 'ellipsis', ...font }}>
          {capitalizeDescription(description)}
        </TableCell>
      )}
      <TableCell
        align='left'
        style={{  maxWidth: '100px', color: transactionType === 'income' ? 'green' : 'red', whiteSpace: 'nowrap', overflow:'hidden', textOverflow: 'ellipsis', paddingRight: 2,...font }}
      >
        {`${amount.toLocaleString()} ₽`}
      </TableCell>  
    </TableRow>
  );
}

export default TransactionRow;
