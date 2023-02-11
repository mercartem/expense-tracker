import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
    InputBase,
} from '@mui/material';
import style from './SearchTransaction.module.scss';

interface ISearchPorps {
    updateFilter: (value: string) => void;
}

export default function SearchTransaction({ updateFilter }: ISearchPorps) {
  const [searchValue, setSearchValue] = useState('');

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      updateFilter(searchValue)
    }
}

    return (
        <div className={style.search}>
              <div className={style.iconWrapper}>
                <SearchIcon color='primary' />
              </div>
              <InputBase
                className={style.input}
                placeholder='Search…'
                type='search'
                inputProps={{ 'aria-label': 'search' }}
                value={searchValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                onKeyPress={handleKey}
              />
        </div>
    )
}