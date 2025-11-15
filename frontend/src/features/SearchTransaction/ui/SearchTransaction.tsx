import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import style from './SearchTransaction.module.scss';
import debounce from '../utils/utils';
import { removeQueryParams } from '../../../shared/utils/utils';

interface ISearchProps {
  searchFilter: () => void;
  resetSearch: () => void;
}

export default function SearchTransaction({ searchFilter, resetSearch }: ISearchProps) {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has('search')) {
      const value = searchParams.get('search');
      if (value) setSearchValue(value);
    }
  }, []);

  useEffect(() => {
     const debouncedUpdate = debounce(() => searchFilter(), 100);
     debouncedUpdate()
  }, [searchValue]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
   
    const debouncedReset = debounce(() => resetSearch(), 100);

    if (e.target.value) {
      searchParams.set('search', e.target.value);
      setSearchParams(searchParams);
    } else {
      removeQueryParams('search', searchParams, setSearchParams);
      debouncedReset();
    }
  };

  return (
    <div className={style.search}>
      <div className={style.iconWrapper}>
        <SearchIcon color='primary' />
      </div>
      <InputBase
        className={style.input}
        sx={{ fontFamily: 'Apple-System, Arial, Helvetica, STXihei, sans-serif' }}
        placeholder= {`${t('search')}`}
        type='search'
        inputProps={{ 'aria-label': 'search' }}
        value={searchValue}
        onChange={handleInput}
      />
    </div>
  );
}
