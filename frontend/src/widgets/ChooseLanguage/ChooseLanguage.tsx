import React from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import style from './ChooseLanguage.module.scss';

function ChooseLanguage() {
  return (
    <div className={style.settings__language}>
      <FormControl>
        <InputLabel id='demo-simple-select-label'>Language</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          label='Language'
        >
          <MenuItem>English</MenuItem>
          <MenuItem>Russian</MenuItem>
        </Select>
      </FormControl>
      <Button variant='contained' sx={{ fontSize: 12, padding: 1, width: 100 }}>
        Confirm
      </Button>
    </div>
  );
}

export default ChooseLanguage;
