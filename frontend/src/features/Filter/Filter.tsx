import { Checkbox, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
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
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setChecked(!checked);
    props.onChange(e);    
  }; 

  return (
    <div className={style.filterBox}>
      <FormControl sx={{flexDirection: 'row', alignItems: 'center'}}>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          id={props.id}
        />
        <label htmlFor={props.id}>{props.label}
        </label>
      </FormControl>
    </div>
  )
}

export default function Filter() {
  const [selected, setSelected] = useState('');

  const handleSelect = (e: SelectChangeEvent) => { 
    setSelected(e.target.value); 
    console.log(e.target.value)
  }; 

  return (
    <>
    <div className={style.headerWrapper}>
        <TuneIcon/>
        <h4 className={style.filterHeader}>Filters</h4>
    </div>
    
    <div className={style.filterWrapper}>
      
      <div className={style.filterBox}>
        <p className={style.filterTitle}>Select a range</p>
        <DatePick />
      </div>
      <div className={style.filterBox}>
        <p className={style.filterTitle}>Category</p>
      <FormControl variant='standard' sx={{ m: 2, minWidth: 220, margin: 0 }}>
        <InputLabel>Select category</InputLabel>
        <Select
          value={selected}
          onChange={(e: SelectChangeEvent) => handleSelect(e)}
          label='Select Category'
        >
        {categories.map((category) => (<MenuItem value={category} key={category}>{category}</MenuItem>))}
        </Select>
      </FormControl>
      </div>
      <div className={style.filterBox}>
        <p className={style.filterTitle}>Cashflow</p>
      <div className={style.filterItem}>
        <CheckboxFilter
          checked
          onChange={(e) => console.log(e.target.id)}
          label='Income'
          id='Income'/>
        <CheckboxFilter
          checked
          onChange={(e) => console.log(e.target.id)}
          label='Expense'
          id='Expense'/>
      </div>
      
      </div>
      <div className={style.filterBox}>

        <p className={style.filterTitle}>Payment Mode</p>
      <div className={style.filterItem}>
        <CheckboxFilter
          checked
          onChange={(e) => console.log(e.target.id)}
          label='Cash'
          id='Cash'/>
        <CheckboxFilter
          checked
          onChange={(e) => console.log(e.target.id)}
          label='Debit Card'
          id='Debit'/>
        <CheckboxFilter
          checked
          onChange={(e) => console.log(e.target.id)}
          label='Credit Card'
          id='Credit'/>
      </div>
      </div>
      <div className={style.filterBox}>
         <p className={style.filterTitle}>Amount</p>
      <div className={style.filterItem}>
        <div>
           <span className={style.rangeLabel}>Min:</span>
        <TextField
          className={style.rangeBox}
          value='10'
          type='text'
          size="small"
          variant="standard"
          />
          </div>
    <div>
       <span className={style.rangeLabel}> - Max:</span>
      <TextField
        className={style.rangeBox}
        value='10000'
        type='text'
        size="small"
        variant="standard"
      />
    </div>
      </div>
      </div>
  </div>
    
    </>
    
  );
}