import { useSearchParams } from 'react-router-dom';
import { FormControl, Checkbox } from '@mui/material';
import { useState, useEffect } from 'react';
import { ICheckboxProps } from '../../lib/types';


function FilterCheckbox({ ...props }: ICheckboxProps) {
  const [checked, setChecked] = useState(props.checked);
  const [searchParams, setSearchParams] = useSearchParams();

  const { name, value } = props;

  useEffect(() => {
    const key = props.name;
    if (searchParams.has(key)) {
      const searchValue = searchParams.getAll(key);
      if (searchValue.includes(value)) setChecked(true)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    if(!checked) {
      searchParams.append(name, value)
      setSearchParams(searchParams)
    } else {
      const searchQuery = Array.from(searchParams);
      const index = searchQuery.findIndex((item)=> item.includes(value));
      if (index !== -1) {
        searchQuery.splice(index, 1);
        const newQuery = new URLSearchParams(searchQuery);
        setSearchParams(newQuery);
      }
    }
  }

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
