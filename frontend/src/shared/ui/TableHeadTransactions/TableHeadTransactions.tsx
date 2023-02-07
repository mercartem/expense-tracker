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

const headCells: readonly IHeadCell[] = [
  {
    id: 'category',
    numeric: false,
    disablePadding: true,
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

interface ITableHeadProps {
  checkboxComponent: boolean;
  checked?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TableHeadTransactions({ ...props }: ITableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        {props.checkboxComponent && (
          <TableCell padding='checkbox'>
            <Checkbox color='primary' checked={props.checked} onChange={props.handleChange} />
          </TableCell>
        )}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            style={{ fontWeight: 700 }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeadTransactions;
