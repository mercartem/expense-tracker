import { Checkbox, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import DatePick from '../DateRangePicker/ui/Date';
import style from './Filter.module.scss'

const categories = [
  'Food',
  'Transportation',
  'Rent',
  'Bills',
  'Utilities',
  'Shopping',
  'Entertainment',
  'Health Care',
  'Housing',
  'Taxes',
  'Clothing',
  'Education',
  'Miscellaneous',
  'Personal Care',
  'Salary',
  'Interests',
  'Business',
  'Extra income',
];

interface ICheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  id: string;
}

function CheckboxFilter({...props}: ICheckboxProps) {
  return (
    <div className={style.filterBox}>
      <FormControl sx={{flexDirection: 'row', alignItems: 'center'}}>
        <Checkbox
          checked={props.checked}
          onChange={props.onChange}
          id={props.id}
        />
        <label htmlFor={props.id}>{props.label}
        </label>
      </FormControl>
    </div>
  )
}

export default function Filter() {
  const [checked, setChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <h4>Filters</h4>
      <p>Select a range</p>
      <DatePick />
      <p>Category</p>
      <FormControl variant='standard' sx={{ m: 2, minWidth: 220 }}>
        <InputLabel id='demo-simple-select-standard-label'>Select category</InputLabel>
        <Select
          labelId='demo-simple-select-standard-label'
          id='demo-simple-select-standard'
          value=''
          onChange={(e: SelectChangeEvent) => console.log(e.target.value)}
          label='Select Category'
        >
        {categories.map((category) => (<MenuItem value={category} key={category}>{category}</MenuItem>))}
        </Select>
      </FormControl>
      <p>Cashflow</p>
      <div className={style.filterItem}>
        <CheckboxFilter
          checked
          onChange={(e) => console.log(e.target.value)}
          label='Income'
          id='Income'/>
        <CheckboxFilter
          checked
          onChange={(e) => console.log(e.target.value)}
          label='Expense'
          id='Expense'/>
      </div>
      
      <p>Payment Mode</p>
      <div className={style.filterItem}>
        <CheckboxFilter
          checked
          onChange={(e) => console.log(e.target.value)}
          label='Cash'
          id='Cash'/>
        <CheckboxFilter
          checked
          onChange={(e) => console.log(e.target.value)}
          label='Debit Card'
          id='Debit'/>
        <CheckboxFilter
          checked
          onChange={(e) => console.log(e.target.value)}
          label='Credit Card'
          id='Credit'/>
      </div>
      <p>Amount</p>
    </div>
    
  );
}