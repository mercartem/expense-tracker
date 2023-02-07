import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { Table, TableBody, TableContainer, TablePagination, Box, IconButton, Toolbar, Typography, Button, InputBase } from '@mui/material';
import { useState } from 'react';
import { Transaction } from '../../../entities/Transaction/lib/types/transaction';
import TransactionRow from '../../../entities/Transaction/ui/TransactionRow/TransactionRow';
import Filter from '../../../features/Filter/Filter';
import TableHeadTransactions from '../../../shared/ui/TableHeadTransactions/TableHeadTransactions';
import style from './Transactions.module.scss'

const transactions: Transaction[] = [
  {
    _id: '63dc164d940499648d1bc344',
    category: 'Utilities',
    description: 'купил ботинки',
    amount: 800,
    paymentMode: 'credit card',
    transactionType: 'expense',
    date: '31.01.2023',
    time: '21:03',
  },
  {
    _id: '63de5779a88861369ce35e2c',
    category: 'Clothing',
    description: 'купил ботинки',
    amount: 800,
    paymentMode: 'credit card',
    transactionType: 'expense',
    date: '31.01.2023',
    time: '21:03',
  },
  {
    _id: '63de57a80d3307d471c384aa',
    category: 'Clothing',
    description: 'купил ботинки',
    amount: 800,
    paymentMode: 'credit card',
    transactionType: 'expense',
    date: '31.01.2023',
    time: '21:03',
  },
  {
    _id: '63de57aa0d3307d471c384ad',
    category: 'Clothing',
    description: 'купил ботинки',
    amount: 800,
    paymentMode: 'credit card',
    transactionType: 'expense',
    date: '31.01.2023',
    time: '21:03',
  },
  {
    _id: '63de58aa0d3307d471c384b9',
    category: 'Clothing',
    description: 'купил штаны',
    amount: 500,
    paymentMode: 'credit card',
    transactionType: 'expense',
    date: '31.01.2023',
    time: '21:03',
  },
  {
    _id: '63de5f21740d120e613410cf',
    category: 'Shopping',
    description: 'купил велик',
    amount: 5000,
    paymentMode: 'credit card',
    transactionType: 'expense',
    date: '31.01.2023',
    time: '21:03',
  },
  {
    _id: '63de5f3b740d120e613410d2',
    category: 'Entertainment',
    description: 'сходил на концерт паши техника',
    amount: 0,
    paymentMode: 'credit card',
    transactionType: 'expense',
    date: '31.01.2023',
    time: '21:03',
  },
  {
    _id: '63de6033740d120e613410d5',
    category: 'Extra income',
    description: 'продал машину',
    amount: 750000,
    paymentMode: 'credit card',
    transactionType: 'income',
    date: '31.01.2023',
    time: '21:03',
  },
  {
    _id: '63e125f536dd6dbaf2a4ae7d',
    category: 'Transportation',
    description: 'buy skateboard',
    amount: 2000,
    paymentMode: 'cash',
    transactionType: 'expense',
    date: '2022-02-06',
    time: '12-00',
  },
  {
    _id: '63e1ec8a327034f65f3ba21b',
    category: 'food',
    description: 'молоко',
    amount: 100,
    paymentMode: 'cash',
    transactionType: 'expense',
    date: '2022-02-07',
    time: '09-00',
  },
  {
    _id: '634c164d940499648d1bc344',
    category: 'Taxes',
    description: 'купил ботинки',
    amount: 800,
    paymentMode: 'credit card',
    transactionType: 'expense',
    date: '31.01.2023',
    time: '21:03',
  },
  {
    _id: '63de5779a85861369ce35e2c',
    category: 'Personal Care',
    description: 'купил ботинки',
    amount: 800,
    paymentMode: 'credit card',
    transactionType: 'expense',
    date: '31.01.2023',
    time: '21:03',
  },
  {
    _id: '63de57a80d3y07d471c384aa',
    category: 'Education',
    description: 'купил ботинки',
    amount: 800,
    paymentMode: 'credit card',
    transactionType: 'expense',
    date: '31.01.2023',
    time: '21:03',
  },
  {
    _id: '63de57aa0d3k07d471c384ad',
    category: 'Health Care',
    description: 'купил ботинки',
    amount: 800,
    paymentMode: 'credit card',
    transactionType: 'expense',
    date: '31.01.2023',
    time: '21:03',
  },
  {
    _id: '63de58aa0d3317d471c384b9',
    category: 'Bills',
    description: 'купил штаны',
    amount: 500,
    paymentMode: 'credit card',
    transactionType: 'expense',
    date: '31.01.2023',
    time: '21:03',
  },
  {
    _id: '63de5f21740d20e613410cf',
    category: 'Personal Care',
    description: 'купил велик',
    amount: 5000,
    paymentMode: 'credit card',
    transactionType: 'expense',
    date: '31.01.2023',
    time: '21:03',
  },
  {
    _id: '63de5f3b740dt0e613410d2',
    category: 'Rent',
    description: 'сходил на концерт паши техника',
    amount: 0,
    paymentMode: 'credit card',
    transactionType: 'expense',
    date: '31.01.2023',
    time: '21:03',
  },
  {
    _id: '63de6033740d120etee613410d5',
    category: 'Interests',
    description: 'продал шубу',
    amount: 750000,
    paymentMode: 'credit card',
    transactionType: 'income',
    date: '31.01.2023',
    time: '21:03',
  },
  {
    _id: '63e125f536dderer6dbaf2a4ae7d',
    category: 'Utilities',
    description: 'buy skateboard',
    amount: 2000,
    paymentMode: 'cash',
    transactionType: 'expense',
    date: '2022-02-06',
    time: '12-00',
  },
  {
    _id: '63e1ec8a327tet034f65f3ba21b',
    category: 'food',
    description: 'Кефир',
    amount: 100,
    paymentMode: 'cash',
    transactionType: 'expense',
    date: '2022-02-07',
    time: '09-00',
  },
];

function Transactions() {
  const [transactionsData, setTransactionsData] = useState<Transaction[]>(transactions);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = transactionsData.map((cost) => cost._id);
      setSelectedItems(newSelected);
      return;
    }
    setSelectedItems([]);
  };

  const handleItemClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelectedItems: string[] = [];

    if (selectedIndex === -1) {
      newSelectedItems = [...selectedItems, id];
    } else {
      newSelectedItems = selectedItems.filter((item) => item !== id);
    }
    setSelectedItems(newSelectedItems);
    console.log(selectedItems);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selectedItems.indexOf(id) !== -1;

  return (
    <>
      <div className={style.container}>
      <h2 className={style.title}>All transactions</h2>
        <div className={style.transactionsList}>
          <div className={style.toolbar}>
            <div className={style.search}>
                <div className={style.iconWrapper}>
                  <SearchIcon color='primary'/>
                </div>
                <InputBase
                  className={style.input}
                  placeholder="Search…"
                  type ='search'
                  inputProps={{ 'aria-label': 'search' }}
                />
                </div>
              <Button variant='contained' className={style.button} sx={{fontSize: 12}}>Add Transaction</Button>
          </div>
          <Box sx={{ width: '100%'}}>
          <Toolbar
          sx={{justifyContent: 'flex-end'}}>
            <Button 
              variant="text" 
              startIcon={<EditIcon />}
              size="medium"
              disabled>
              Edit
            </Button>
            <Button 
              variant="text" 
              size="medium"
              startIcon={<DeleteIcon />}
              disabled>
              Delete
            </Button>
          </Toolbar>
          <TableContainer className={style.table}>
            <Table sx={{ width: '100%' }} aria-labelledby='tableTitle' size='medium'>
              <TableHeadTransactions checkboxComponent handleChange={(e) => handleSelectAllClick(e)} />
              <TableBody  sx={{ minWidth: '100%' }}>
                {transactionsData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((transaction) => {
                    const { _id: id } = transaction;
                    return (
                      <TransactionRow
                        key={id}
                        transaction={transaction}
                        isSelected={isSelected(id)}
                        checkboxComponent
                        onClick={(e) => handleItemClick(e, id)}
                      />
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={transactionsData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          </Box>
        </div>
      </div>
      <div className={style.filterContainer}>
        <Filter/>
      </div>
    </>
    
  );
}

export default Transactions;
