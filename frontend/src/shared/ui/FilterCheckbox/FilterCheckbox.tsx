import { useSearchParams } from 'react-router-dom';
import { FormControl, Checkbox } from '@mui/material';
import { ICheckboxProps } from '../../lib/types';

function FilterCheckbox({ ...props }: ICheckboxProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { name, value } = props;

  const isChecked = (params: URLSearchParams) => {
    const key = props.name;
    let isCheckedValue = false;
    if (params.has(key)) {
      const searchValue = params.getAll(key);
      isCheckedValue = searchValue.includes(value);
    }
    return isCheckedValue;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isChecked(searchParams)) {
      searchParams.append(name, value);
      setSearchParams(searchParams);
    } else {
      const searchQuery = Array.from(searchParams);
      const index = searchQuery.findIndex((item) => item.includes(value));
      if (index !== -1) {
        searchQuery.splice(index, 1);
        const newQuery = new URLSearchParams(searchQuery);
        setSearchParams(newQuery);
      }
    }
  };

  return (
    <div>
      <FormControl sx={{ flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox
          checked={isChecked(searchParams)}
          onChange={handleChange}
          value={props.value}
          name={props.name}
        />
        <label htmlFor={props.value}>{props.label}</label>
      </FormControl>
    </div>
  );
}

export default FilterCheckbox;
