import { FormControl, Checkbox } from '@mui/material';
import { useState } from 'react';

// function parseQuery(searchParams: URLSearchParams) {
//   const paramObj: { [x: string]: string[] } = {};
//   const array = Array.from(searchParams.entries());
//   array.forEach(([key, value]) => {
//     paramObj[key] = value.split('&')
//   })
//   return paramObj;
// }

// function updateSearchParams(
//   name: string,
//   value: string,
//   searchParams: URLSearchParams,
//   cb: (obj: URLSearchParams)=> void) {
//     const paramsObj = parseQuery(searchParams);
//     if (name in paramsObj) {
//     paramsObj[name].push(value)
//     console.log(paramsObj)
//     const newValue = Array.from(new Set(paramsObj[name])).join('&')
//     const updatedObj = {...paramsObj, [name]: newValue }

//     const newQuery = createSearchParams(updatedObj)
//     cb(newQuery);
//   } else {
//     const updatedObj = {...paramsObj, [name]: value }
//     const newQuery = createSearchParams(updatedObj)
//     cb(newQuery);
//   }
// }
interface ICheckboxProps {
  label: string;
  value: string;
  name: string;
  checked: boolean;
  updateState: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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
