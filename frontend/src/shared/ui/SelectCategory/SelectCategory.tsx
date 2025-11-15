import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { categories, categoriesTyped } from '../../constants/categories';
import { ISelectCategoryProps } from '../../lib/types';

const font = {
  fontFamily: 'Apple-System, Arial, Helvetica, STXihei, sans-serif',
  fontSize: '16px',
};

function SelectCategory({ ...props }: ISelectCategoryProps) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(props.initialValue);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (props.handleQuery) {
      if (searchParams.has('category')) {
        const value = searchParams.get('category');
        if (value) setSelected(value);
      }
    }
  }, []);

  const isSelected = () => {
    const key = 'category';
    let selectedItem = '';
    if (searchParams.has(key)) {
      const searchValue = searchParams.get(key) || '';
      selectedItem = searchValue;
    }
    return selectedItem;
  };

  const handleSelect = (e: SelectChangeEvent) => {
    setSelected(e.target.value);
    if (e.target.value && props.handleQuery) {
      searchParams.set('category', e.target.value);
      setSearchParams(searchParams);
    }
  };

  const checkValue = () => {
    let checkedValue = selected;
    if (props.type) {
      checkedValue = categoriesTyped[props.type].includes(selected) ? selected : '';
      return checkedValue;
    }
    if (props.handleQuery) {
      checkedValue = isSelected();
      return checkedValue;
    }
    return checkedValue;
  };

  return (
    <FormControl variant='standard' sx={{ m: 2, minWidth: 220, margin: 0 }} error={props.error}>
      <InputLabel sx={font}>{t('filters.category.label')}</InputLabel>
      <Select
        value={checkValue()}
        onChange={(e) => {
          handleSelect(e);
          if (props.updateState) {
            props.updateState(e);
          }
        }}
        label={t('filters.category.label')}
        required
        sx={font}
      >
        {props.type &&
          categoriesTyped[props.type].map((category: string) => (
            <MenuItem value={category} key={category} sx={font}>
              {t(`categoriesNames.${category}`)}
            </MenuItem>
          ))}
        {!props.type &&
          categories.map((category) => (
            <MenuItem value={category} key={category} sx={font}>
              {t(`categoriesNames.${category}`)}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default SelectCategory;
