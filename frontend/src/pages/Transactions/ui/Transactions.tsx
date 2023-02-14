import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Table,
  TableBody,
  TableContainer,
  Box,
  Toolbar,
  Button,
  Pagination,
  Stack,
} from '@mui/material';
import { Transaction } from '../../../entities/Transaction/lib/types/transaction';
import TransactionRow from '../../../entities/Transaction/ui/TransactionRow/TransactionRow';
import Filter from '../../../features/Filter/Filter';
import TableHeadTransactions from '../../../shared/ui/TableHeadTransactions/TableHeadTransactions';
import FilterModal from '../../../features/FilterModal/ui/FilterModal';
import AddTransactionForm from '../../../widgets/AddTransaction/ui/AddTransactionForm';
import { fetchTransactions, deleteTransactions, getPageTotal } from '../model/model';
import EditTransactionForm from '../../../widgets/EditTransaction/ui/EditTransactionForm';
import style from './Transactions.module.scss';
import BalanceContext from '../../../app/context/BalanceContext';
import SearchTransaction from '../../../features/SearchTransaction/ui/SearchTransaction';
import { getNewSelectedItems } from '../utils/utils';

const ITEMS_PER_PAGE = 10;

function Transactions() {
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [width, setWidth] = useState(window.innerWidth);
  const [pageCount, setPageCount] = useState(5);
  const { updateBalance } = useContext(BalanceContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(''); // TODO: обработка ошибок
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const queryString = searchParams.toString();
    fetchTransactions(setTransactionsData, setIsLoading, page, ITEMS_PER_PAGE, queryString);
    getPageTotal(ITEMS_PER_PAGE, queryString).then((pageTotal) => setPageCount(pageTotal));
  }, []);

  const handleApplyFilter = () => {
    fetchTransactions(setTransactionsData, setIsLoading, 1, ITEMS_PER_PAGE, searchParams.toString());
    getPageTotal(ITEMS_PER_PAGE, searchParams.toString()).then((pageTotal) =>
      setPageCount(pageTotal),
    );
  };

  const handleResetFilter = () => {
    fetchTransactions(setTransactionsData, setIsLoading, page, ITEMS_PER_PAGE);
    getPageTotal(ITEMS_PER_PAGE).then((pageTotal) => setPageCount(pageTotal));
  };

  const handleItemClick = (event: React.MouseEvent<unknown>, id: string) => {
    const newSelected = getNewSelectedItems(id, selectedItems);
    setSelectedItems(newSelected);
  };
  
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = transactionsData.map((cost) => cost._id);
      setSelectedItems(newSelected);
      return;
    }
    setSelectedItems([]);
  };

  const isSelected = (id: string) => selectedItems.indexOf(id) !== -1;
  const allSelected = () => selectedItems.length === transactionsData.length;

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    const queryString = searchParams.toString();
    setPage(value);
    fetchTransactions(setTransactionsData, setIsLoading, value, ITEMS_PER_PAGE, queryString);
  };

  const handleDeleteClick = async () => {
    await deleteTransactions(selectedItems);
    updateBalance();
    getPageTotal(ITEMS_PER_PAGE).then((pageTotal) => {
      setPageCount(pageTotal);
      if (page > pageTotal) {
        setPage(pageTotal);
        fetchTransactions(setTransactionsData, setIsLoading, pageTotal, ITEMS_PER_PAGE, searchParams.toString());
      } else {
        fetchTransactions(setTransactionsData, setIsLoading, page, ITEMS_PER_PAGE, searchParams.toString());
      }
    });
    setSelectedItems([]);
  };

  const handleAddClick = async () => {
    getPageTotal(ITEMS_PER_PAGE).then((pageTotal) => {
      setPageCount(pageTotal);
      if (page < pageTotal) {
        setPage(pageTotal);
        fetchTransactions(setTransactionsData, setIsLoading, pageTotal, ITEMS_PER_PAGE, searchParams.toString());
        updateBalance();
      } else {
        fetchTransactions(setTransactionsData, setIsLoading, page, ITEMS_PER_PAGE, searchParams.toString());
        updateBalance();
      }
    });
    setSelectedItems([]);
  };

  const handleEditClick = async () => {
    await fetchTransactions(setTransactionsData, setIsLoading, page, ITEMS_PER_PAGE, searchParams.toString());
    updateBalance();
    setSelectedItems([]);
  };


  return (
    <>
      <div className={style.transactions}>
        <h2 className={style.title}>All transactions</h2>
        <div className={style.container}>
          <div className={style.transactionsList}>
            <div className={style.toolbar}>
              <SearchTransaction
                searchFilter={handleApplyFilter}
                resetSearch={handleResetFilter}
              />
              <AddTransactionForm updateTransactions={handleAddClick} />
              {width <= 1100 && width >= 770 && (
                <FilterModal handleApply={handleApplyFilter} handleReset={handleResetFilter} />
              )}
            </div>
            <Box sx={{ width: '100%' }}>
              <Toolbar sx={{ justifyContent: 'flex-end' }}>
                <EditTransactionForm
                  active={!(selectedItems.length === 1)}
                  id={selectedItems[0]}
                  updateTransactions={handleEditClick}
                />
                <Button
                  variant='text'
                  size='medium'
                  startIcon={<DeleteIcon />}
                  disabled={!(selectedItems.length >= 1)}
                  onClick={handleDeleteClick}
                >
                  Delete
                </Button>
              </Toolbar>
              {/* <p style={{height: '1rem', marginBottom: '1rem'}}> {isLoading? 'Loading data...' : ''} </p> */}
              { transactionsData.length > 0 && <>
               <TableContainer className={style.table}>
                <Table sx={{ width: '100%' }} aria-labelledby='tableTitle' size='small'>
                  <TableHeadTransactions
                    checkboxComponent
                    checked={allSelected()}
                    handleChange={(e) => handleSelectAllClick(e)}
                  />
                  <TableBody sx={{ minWidth: '100%' }}>
                    {transactionsData.map((transaction) => {
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
              <Stack spacing={2}>
                <Pagination count={pageCount} page={page} onChange={handleChangePage} />
              </Stack>
              </>}
              {(transactionsData.length <= 0) && <p>Transactions not found!</p>}
            </Box>
          </div>
        </div>
      </div>
      {width < 770 && (
        <FilterModal handleApply={handleApplyFilter} handleReset={handleResetFilter} />
      )}
      {width >= 1100 && (
        <div className={style.filterContainer}>
          <Filter handleApply={handleApplyFilter} handleReset={handleResetFilter} />
        </div>
      )}
    </>
  );
}

export default Transactions;
