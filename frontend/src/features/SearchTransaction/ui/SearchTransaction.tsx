import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
    InputBase,
} from '@mui/material';
import style from './SearchTransaction.module.scss';
import debounce from '../utils/utils';
import { removeQueryParams } from '../../../shared/utils/utils';

interface ISearchPorps {
    updateFilter: (value: string) => void;
}

export default function SearchTransaction({ updateFilter }: ISearchPorps) {
  const [searchValue, setSearchValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has('search')) {
      const value = searchParams.get('search');
      if(value) setSearchValue(value);
    }
  }, [])

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      updateFilter(searchValue)
    }
}

const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchValue(e.target.value);
  const debouncedUpdate = debounce(() => updateFilter(e.target.value), 300)
  debouncedUpdate();

  if (e.target.value) {
    searchParams.set('search', e.target.value)
    setSearchParams(searchParams);
  } else removeQueryParams('search', searchParams, setSearchParams);
}

    return (
        <div className={style.search}>
              <div className={style.iconWrapper}>
                <SearchIcon color='primary' />
              </div>
              <InputBase
                className={style.input}
                sx ={{fontFamily: 'Apple-System, Arial, Helvetica, STXihei, sans-serif'}}
                placeholder='Search…'
                type='search'
                inputProps={{ 'aria-label': 'search' }}
                value={searchValue}
                onChange={handleInput}
                onKeyPress={handleKey}
              />
        </div>
    )
}