import { FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material';
import { useState } from 'react';
import { categories, categoriesTyped } from '../../constants/categories';
import { ISelectCategoryProps } from '../../lib/types';

const font = {
  fontFamily: 'Apple-System, Arial, Helvetica, STXihei, sans-serif', fontSize: '16px'}

function SelectCategory({ ...props }: ISelectCategoryProps) {
  const [selected, setSelected] = useState(props.initialValue);

  const handleSelect = (e: SelectChangeEvent) => {
    setSelected(e.target.value);
    props.updateState(e);
  };

  // проверяем значение, если меняется тип транзакции, так как категории разные для income и expense

  const checkValue = () => {
    let checkedValue = selected;
    if (props.type) {
      checkedValue = categoriesTyped[props.type].includes(selected) ? selected : '';
      return checkedValue;
    }
    return checkedValue;
  };

  return (
    <FormControl variant='standard' sx={{ m: 2, minWidth: 220, margin: 0}} error={props.error}>
      <InputLabel sx = {font}
>Select category</InputLabel>
      <Select
        value={checkValue()}
        onChange={(e: SelectChangeEvent) => handleSelect(e)}
        label='Select Category'
        required
        sx = {font}
      >
        {props.type &&
          categoriesTyped[props.type].map((category: string) => (
            <MenuItem value={category} key={category} sx = {font}>
              {category}
            </MenuItem>
          ))}
        {!props.type &&
          categories.map((category) => (
            <MenuItem value={category} key={category} sx = {font}>
              {category}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default SelectCategory;
