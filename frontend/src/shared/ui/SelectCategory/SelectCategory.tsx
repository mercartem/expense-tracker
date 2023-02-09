import { FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material';
import { useState } from 'react';
import {categories, categoriesTyped} from '../../constants/categories';

interface ISelectCategoryProps {
  updateState: (e: SelectChangeEvent) => void;
  error?: boolean;
  type: string;
}

function SelectCategory({ ...props }: ISelectCategoryProps) {
  const [selected, setSelected] = useState('');

  const handleSelect = (e: SelectChangeEvent) => {
    setSelected(e.target.value);
    props.updateState(e);
  };

  return (
    <FormControl variant='standard' sx={{ m: 2, minWidth: 220, margin: 0 }} error={props.error}>
      <InputLabel>Select category</InputLabel>
      <Select
        value={selected}
        onChange={(e: SelectChangeEvent) => handleSelect(e)}
        label='Select Category'
        required
      >
        {props.type && categoriesTyped[props.type].map((category: string) => (
            <MenuItem value={category} key={category}>
              {category}
            </MenuItem>
          ))
        }
         {!props.type && categories.map((category) => (
          <MenuItem value={category} key={category}>
            {category}
          </MenuItem>
        ))
        }
        
      </Select>
    </FormControl>
  );
}

export default SelectCategory;
