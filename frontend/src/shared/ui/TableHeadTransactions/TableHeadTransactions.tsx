import { useEffect, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Checkbox from '@mui/material/Checkbox';
import { Transaction } from '../../../entities/Transaction/lib/types/transaction';

interface IHeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: IHeadCell[] = [
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'paymentMode',
    numeric: true,
    disablePadding: false,
    label: 'Payment Mode',
  },
  {
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
  },
];

const font = {
  fontFamily: 'Apple-System, Arial, Helvetica, STXihei, sans-serif',
  fontSize: '16px',
  fontWeight: 700,
};

interface ITableHeadProps {
  checkboxComponent: boolean;
  checked?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TableHeadTransactions({ ...props }: ITableHeadProps) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <TableHead>
      <TableRow>
        {props.checkboxComponent && (
          <TableCell padding='checkbox'>
            <Checkbox color='primary' checked={props.checked} onChange={props.handleChange} />
          </TableCell>
        )}
        {width > 770 &&
          headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align='left'
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sx={font}
            >
              {headCell.label}
            </TableCell>
          ))}
        {width <= 770 &&
          headCells
            .filter((headCell) => !['description', 'date'].includes(headCell.id))
            .map((headCell) => (
              <TableCell
                key={headCell.id}
                align='left'
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sx={font}
              >
                {headCell.label}
              </TableCell>
            ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeadTransactions;
