import { FormControl, Checkbox } from '@mui/material';
import { useState } from 'react';
import { ICheckboxProps } from '../../lib/types';

function FilterCheckbox({ ...props }: ICheckboxProps) {
  const [checked, setChecked] = useState(props.checked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
  };

  return (
    <div>
      <FormControl sx={{ flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox
          checked={checked}
          onChange={(e) => {
            handleChange(e);
            props.updateState(e);
          }}
          value={props.value}
          name={props.name}
        />
        <label htmlFor={props.value}>{props.label}</label>
      </FormControl>
    </div>
  );
}

export default FilterCheckbox;
